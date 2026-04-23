import React, { useState } from "react";
import { Save, Pencil, Trash2, X } from "lucide-react";

const ContactSidebar = ({
  selectedContact,
  setSelectedContact,
  fetchContacts,
}) => {
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  if (!selectedContact) return null;

  const handleEdit = () => {
    setFormData({
      name: selectedContact.name,
      email: selectedContact.email,
      age: selectedContact.age,
      phoneNumber: selectedContact.phoneNumber,
      tag: selectedContact.tag,
      address: selectedContact.address,
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await api.put(`/contacts/${selectedContact.id}`, validatedData);

      setIsEditing(false);
      setSelectedContact(null);
      fetchContacts();
    } catch (err) {
      if (err.errors) {
        setError(err.errors[0].message);
      } else {
        setError(err.response?.data?.message || "Failed to update");
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/contacts/${selectedContact.id}`);
      setSelectedContact(null);
      fetchContacts();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete");
    }
  };

  return (
    <div className="space-y-4">
      <div
        onClick={() => {
          setSelectedContact(null);
          setIsEditing(false);
        }}
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
      />
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-40 p-6 overflow-y-auto transition-transform duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-extralight text-gray-800">
            {isEditing ? "Edit Contact" : "Contact Details"}
            <p className="text-2xl font-bold">{selectedContact.name}</p>
          </h2>
          <button
            onClick={() => {
              setSelectedContact(null);
              setIsEditing(false);
            }}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold"
          >
            <X size={16} />
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {isEditing ? (
          <div className="space-y-3">
            {[
              { label: "Name", field: "name" },
              { label: "Email", field: "email" },
              { label: "Age", field: "age" },
              { label: "PhoneNumber", field: "phoneNumber" },
              { label: "Tag", field: "tag" },
              { label: "Address", field: "address" },
            ].map(({ label, field }) => (
              <div
                key={field}
                className="bg-gray-100 p-3 rounded-lg  border border-mist-500"
              >

                <p className="text-xs text-gray-500 uppercase">{label}</p>
                
                <input
                  className="w-full font-semibold text-gray-800 bg-transparent  outline-none pt-1"
                  value={formData[field] || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, [field]: e.target.value })
                  }
                />
              </div>
            ))}

            <div className="flex gap-2 mt-4">
              <button
                onClick={handleSave}
                className="flex items-center justify-center gap-2 p-2 bg-white  rounded-lg text-blue-400 w-40 border  border-blue-400 cursor-pointer hover:bg-black hover:text-white hover:border-orange-400"
              >
                <Save size={16} /> Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-3 px-4 py-2 bg-white  hover:bg-red-500  hover:text-white  hover:border-2  text-black rounded-lg w-42 h-12 border border-gray-400  text-sm font-semibold transition-all cursor-pointer "
              >
                <X size={14} />
                Cancel
              </button>
            </div>
          </div>
        ) : (
          // ——— VIEW MODE: p tags ———
          <div className=" grid grid-rows-5 gap-y-3.5  ">
            <div className="bg-gray-100  p-3 border border-mist-500 rounded-lg ">
              <p className="text-xs text-gray-500 uppercase">Name</p>
              <p className="font-semibold text-gray-800">
                {selectedContact.name}
              </p>
            </div>

            <div className="bg-gray-100 p-3 rounded-lg  border border-mist-500">
              <p className="text-xs text-gray-500 uppercase">Email</p>
              <p className="font-semibold text-gray-800">
                {selectedContact.email}
              </p>
            </div>

            <div className="bg-gray-100 p-3 border border-mist-500 rounded-lg">
              <p className="text-xs text-gray-500 uppercase">Age</p>
              <p className="font-semibold text-gray-800">
                {selectedContact.age}
              </p>
            </div>

            <div className="bg-gray-100 p-3 border border-mist-500  rounded-lg">
              <p className="text-xs text-gray-500 uppercase">Phone Number</p>
              <p className="font-semibold text-gray-800">
                {selectedContact.phoneNumber}
              </p>
            </div>

            <div className="bg-gray-100 p-3 border border-mist-500 rounded-lg">
              <p className="text-xs text-gray-500 uppercase">Tag</p>
              <p className="font-semibold text-gray-800">
                {selectedContact.tag}
              </p>
            </div>

            <div className="bg-gray-100 p-3 border border-mist-500  rounded-lg">
              <p className="text-xs text-gray-500 uppercase">Address</p>
              <p className="font-semibold text-gray-800">
                {selectedContact.address}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 p-3 bg-white- hover:bg-black hover:text-white hover:border-blue-600 hover:border-2  text-blue-600 rounded-lg w-42 h-12 border border-blue-400  text-sm font-semibold transition-all cursor-pointer"
              >
                <Pencil size={16} /> Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(selectedContact.id);
                }}
                className="flex items-center gap-3 px-4 py-2 bg-white- hover:bg-red-500  hover:text-white hover:border-black hover:border-2  text-red-600  rounded-lg w-42 h-12 border border-red-400  text-sm font-semibold transition-all cursor-pointer"
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
