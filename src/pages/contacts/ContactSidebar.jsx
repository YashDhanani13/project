import React, { useState } from "react";
import { Save, Pencil, Trash2, X } from "lucide-react";
import { useJsApiLoader } from "@react-google-maps/api";

import api from "../../api/api";

// ✅ FIX 3: Stable constant reference — prevents useJsApiLoader re-render loop
import AddressInput from "./PlacesAutocomplete";
import ContactMap from "./map";

const LIBRARIES = ["places"];

// ─── ContactSidebar ────────────────────────────────────────────────────────────
const ContactSidebar = ({ selectedContact, setSelectedContact, fetchContacts }) => {
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  // ✅ FIX 3: Use stable LIBRARIES constant instead of inline array literal
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES,
  });

  // ✅ FIX 2: Check selectedContact BEFORE isLoaded so a closed sidebar
  //           never shows the "Loading Google API..." banner
  if (!selectedContact) return null;
  if (!isLoaded) return <div className="p-4">Loading Google API...</div>;

  const handleEdit = () => {
    setFormData({
      name: selectedContact.name,
      email: selectedContact.email,
      age: selectedContact.age,
      phoneNumber: selectedContact.phoneNumber,
      tag: selectedContact.tag,
      address: selectedContact.address,
      lat: selectedContact.lat ?? null,
      lng: selectedContact.lng ?? null,
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await api.put(`/contacts/${selectedContact.id}`, formData);
      setIsEditing(false);
      setSelectedContact(null);
      fetchContacts();
    } catch (err) {
      setError(
        err.errors?.[0]?.message ??
          err.response?.data?.message ??
          "Failed to update"
      );
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/contacts/${selectedContact.id}`);
      setSelectedContact(null);
      fetchContacts();
    } catch (err) {
      setError(err.response?.data?.message ?? "Failed to delete");
    }
  };

  const closePanel = () => {
    setSelectedContact(null);
    setIsEditing(false);
  };

  const handleFieldChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleAddressChange = ({ address, lat, lng }) =>
    setFormData((prev) => ({ ...prev, address, lat, lng }));

  const textFields = [
    { label: "Name", field: "name" },
    { label: "Email", field: "email" },
    { label: "Age", field: "age" },
    { label: "Phone number", field: "phoneNumber" },
    { label: "Tag", field: "tag" },
  ];

  return (
    <div className="space-y-4">
      {/* Backdrop */}
      <div
        onClick={closePanel}
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
      />

      {/* Slide-in panel */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-slate-800  shadow-2xl z-50 p-6 overflow-y-auto transition-transform duration-300">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-extralight text-whit">
            {isEditing ? "Edit contact" : "Contact details :"}
            <p className="text-2xl text-white font-bold">{selectedContact.name}</p>
          </h2>
          <button
            onClick={closePanel}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
          >
            <X size={16} />
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* ── EDIT MODE ── */}
        {isEditing ? (
          <div className="space-y-3">
            {textFields.map(({ label, field }) => (
              <div
                key={field}
                className="bg-gray-100 p-3 rounded-lg border border-gray-200"
              >
                <p className="text-xs text-gray-500 uppercase">{label}</p>
                <input
                  className="w-full font-semibold text-gray-800 bg-transparent outline-none pt-1"
                  value={formData[field] || ""}
                  onChange={(e) => handleFieldChange(field, e.target.value)}
                />
              </div>
            ))}

            {/* Address field — uses PlacesAutocomplete via AddressInput */}
            <div className="bg-gray-100 p-3 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-500 uppercase">Address</p>
              {/* ✅ FIX 4: Imported from its own file instead of duplicating */}
              <AddressInput
                value={formData.address || ""}
                onChange={handleAddressChange}
              />
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={handleSave}
                className="flex items-center justify-center gap-2 p-2 h-11 bg-white rounded-lg text-blue-400 w-40 border border-blue-400 cursor-pointer hover:bg-black hover:text-white hover:border-orange-400"
              >
                <Save size={16} /> Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-4 p-2  h-11 bg-white hover:bg-red-500 hover:text-white text-black rounded-lg h border border-gray-400 w-40  text-sm font-semibold transition-all cursor-pointer"
              >
                <X size={14} /> Cancel
              </button>
            </div>
          </div>
        ) : (
          /* ── VIEW MODE ── */
          <div className="grid    grid-rows-5 gap-y-3.5">
            {[
              { label: "Name", value: selectedContact.name },
              { label: "Email", value: selectedContact.email },
              { label: "Age", value: selectedContact.age },
              { label: "Phone number", value: selectedContact.phoneNumber },
              { label: "Tag", value: selectedContact.tag },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="bg-gray-100 p-3 rounded-lg border border-gray-200"
              >
                <p className="text-xs text-gray-500 uppercase">{label}</p>
                <p className="font-semibold text-gray-800">{value}</p>
              </div>
            ))}

            {/* Address + Map */}
            <div className="bg-gray-100 p-3 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-500 uppercase">Address</p>
              <p className="font-semibold text-gray-800">
                {selectedContact.address}
              </p>
              {/* ✅ FIX 4: Imported from its own file instead of duplicating */}
              <ContactMap
                isLoaded={isLoaded}
                address={selectedContact.address}
                lat={selectedContact.lat}
                lng={selectedContact.lng}
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 p-3 hover:bg-black hover:text-white hover:border-blue-600 hover:border-2 text-blue-600 rounded-lg w-40  h-12 border border-gray-600 border-2 text-sm font-semibold transition-all cursor-pointer"
              >
                <Pencil size={16} /> Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
                className="flex items-center gap-3 px-4 py-2 hover:bg-red-500 hover:text-white hover:border-gray-800 hover:border-2 text-gray-300 rounded-lg h-12 border w-40 border-2  border-gray-600 text-sm font-semibold transition-all cursor-pointer"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactSidebar;