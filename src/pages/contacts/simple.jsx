import React, { useState, useEffect } from "react";
import { Save, Pencil, Trash2, X } from "lucide-react";
import api from "../../api/api";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const contactValidation = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  age: z.coerce.number().min(18, "Must be at least 18"),
  tag: z.string().min(1, "Tag is required"),
  phoneNumber: z.string().min(10, "Phone must be at least 10 digits"),
  address: z.string().min(5, "Address is required"),
});

const ContactSidebar = ({
  selectedContact,
  setSelectedContact,
  fetchContacts,
}) => {
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactValidation),
  });

  // 🔥 Fill form when sidebar opens
  useEffect(() => {
    if (selectedContact) {
      reset({
        name: selectedContact.name,
        email: selectedContact.email,
        age: selectedContact.age,
        tag: selectedContact.tag,
        phoneNumber: selectedContact.phoneNumber,
        address: selectedContact.address,
      });
    }
  }, [selectedContact, reset]);

  if (!selectedContact) return null;

  // 🔥 Submit handler (validation runs automatically)
  const onSubmit = async (data) => {
    try {
      await api.put(`/contacts/${selectedContact.id}`, data);

      setIsEditing(false);
      setSelectedContact(null);
      fetchContacts();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update");
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

  return (
    <div>
      {/* Backdrop */}
      <div
        onClick={closePanel}
        className="fixed inset-0 bg-black/30 z-40"
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-slate-800 z-50 p-6 overflow-y-auto">
        <div className="flex justify-between mb-6">
          <h2 className="text-white text-xl">
            {isEditing ? "Edit Contact" : "Contact Details"}
          </h2>
          <button onClick={closePanel}>
            <X />
          </button>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            <div>
              <input {...register("name")} placeholder="Name" />
              {errors.name && <p>{errors.name.message}</p>}
            </div>

            <div>
              <input {...register("email")} placeholder="Email" />
              {errors.email && <p>{errors.email.message}</p>}
            </div>

            <div>
              <input {...register("age")} placeholder="Age" />
              {errors.age && <p>{errors.age.message}</p>}
            </div>

            <div>
              <input {...register("phoneNumber")} placeholder="Phone" />
              {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
            </div>

            <div>
              <input {...register("tag")} placeholder="Tag" />
              {errors.tag && <p>{errors.tag.message}</p>}
            </div>

            <div>
              <input {...register("address")} placeholder="Address" />
              {errors.address && <p>{errors.address.message}</p>}
            </div>

            <div className="flex gap-2">
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save"}
              </button>

              <button type="button" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-3 text-white">
            <p>Name: {selectedContact.name}</p>
            <p>Email: {selectedContact.email}</p>
            <p>Age: {selectedContact.age}</p>
            <p>Tag: {selectedContact.tag}</p>
            <p>Phone: {selectedContact.phoneNumber}</p>
            <p>Address: {selectedContact.address}</p>

            <div className="flex gap-2 mt-4">
              <button onClick={() => setIsEditing(true)}>
                <Pencil /> Edit
              </button>

              <button onClick={handleDelete}>
                <Trash2 /> Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactSidebar;


import React, { useState } from "react";
import { Save, Pencil, Trash2, X } from "lucide-react";
import api from "../../api/api";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// ─── ContactSidebar ────────────────────────────────────────────────────────────
const ContactSidebar = ({
  selectedContact,
  setSelectedContact,
  fetchContacts,
}) => {
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  if (!selectedContact) return null;

  const contactValidation2 = z.object({
    name: z
      .string({ required_error: "Name is required" })
      .trim()
      .min(1, "Name is required")
      .max(100, "Name must be under 100 characters")
      .regex(
        /^[a-zA-Z\s'-]+$/,
        "Name can only contain letters, spaces, hyphens, and apostrophes",
      ),
    email: z
      .string({ required_error: "Email is required" })
      .trim()
      .toLowerCase()
      .min(1, "Email is required")
      .email("Invalid email address")
      .max(255, "Email must be under 255 characters"),
    age: z
      .string({ required_error: "Age is required" })
      .min(18, "Must be at least 18 years old")
      .max(120, "Age seems invalid"),
    tag: z
      .string({ required_error: "Tag is required" })
      .trim()
      .min(1, "Tag is required")
      .max(50, "Tag must be under 50 characters"),
    phoneNumber: z
      .string({ required_error: "Phone number is required" })
      .trim()
      .min(10, "Phone must be at least 10 digits")
      .max(11, "Phone number is too long")
      .regex(/^\+?[0-9\s\-().]+$/, "Invalid phone number format"),
    address: z
      .string({ required_error: "Address is required" })
      .trim()
      .min(10, "Address must be at least 10 characters")
      .max(255, "Address must be under 255 characters"),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactValidation2),
  });

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
      const updatedContact = {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        tag: formData.tag,
        status: formData.status,
        address: formData.address,
      };

      await api.put(`/contacts/${selectedContact.id}`, updatedEmployee);
      setIsEditing(false);
      setSelectedContact(null);
      fetchContacts();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update");
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
            <p className="text-2xl text-white font-bold">
              {selectedContact.name}
            </p>
          </h2>
          <button
            onClick={closePanel}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
          >
            <X size={16} />
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* -[---------------------------------------------------------------------------------------------] */}

        {isEditing ? (
<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">


            <div>
              <input
                value={formData.name}
                onChange={(e) => handleFieldChange("name", e.target.value)}
                placeholder="Name"
              />
              
              {selectedContact.name}
                 {errors.name && <p className="text-rose-500 text-xs font-bold ml-1">{errors.name.message}</p>}
            </div>

            <div>
              <input
                value={formData.email}
                onChange={(e) => handleFieldChange("email", e.target.value)}
                placeholder="Email"
              />
              {selectedContact.email}

                 {errors.email && <p className="text-rose-500 text-xs font-bold ml-1">{errors.mail.message}</p>}
            </div>
            <div>
              {" "}
              <input
                value={formData.age}
                onChange={(e) => handleFieldChange("name", e.target.value)}
                placeholder="age"
              />
              {selectedContact.age}
              {errors.age && <p className="text-rose-500 text-xs font-bold ml-1">{errors.age.message}</p>}
            </div>



            <div>
              <input
                value={formData.tag}
                onChange={(e) => handleFieldChange("name", e.target.value)}
                placeholder="tag"
              />
              {selectedContact.tag}
                 {errors.tag && <p className="text-rose-500 text-xs font-bold ml-1">{errors.tag.message}</p>}
            </div>

            <div>
              {" "}
              <input
                value={formData.phoneNumber}
                onChange={(e) => handleFieldChange("name", e.target.value)}
                placeholder="phonenumber"
              />
              {selectedContact.phoneNumber}
                 {errors.phoneNumber && <p className="text-rose-500 text-xs font-bold ml-1">{errors.phoneNumber.message}</p>}
            </div>
            <div>
              {" "}
              <input
                value={formData.address}
                onChange={(e) => handleFieldChange("name", e.target.value)}
                placeholder="address"
              />
              {selectedContact.address}
                 {errors.address && <p className="text-rose-500 text-xs font-bold ml-1">{errors.address.message}</p>}
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={handleSave}
                className="flex items-center justify-center gap-2 p-2 bg-white  rounded-lg text-blue-400 w-40 border  border-blue-400 cursor-pointer hover:bg-black hover:text-white hover:border-orange-400"
              >
                <Save size={16} /> Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center justify-center gap-2 h-12 bg-white  rounded-lg text-red-600 w-40 border  border-red-600 cursor-pointer hover:bg-red-600  hover:text-white hover:border-gray-600"
              >
                <X size={14} />
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <p>Name: {selectedContact.name}</p>
            <p>Email: {selectedContact.email}</p>

            <p>age: {selectedContact.age} </p>
            <p>tag: {selectedContact.tag}</p>
            <p>PhoneNumber: {selectedContact.phoneNumber}</p>
            <p> address : {selectedContact.address} </p>
            <div className="flex gap-2">
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 p-3 bg-white- hover:bg-black hover:text-white hover:border-gray-600 hover:border-2  text-blue-600 rounded-lg w-42 h-12 border border-blue-400  text-sm font-semibold transition-all cursor-pointer"
              >
                <Pencil size={16} /> Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(selectedEmployee.id);
                }}
                className="flex items-center gap-3 px-4 py-2 bg-slate-800  hover:bg-red-600  hover:text-white  hover:border-2  text-red-600  rounded-lg w-42 h-12 border border-red-600  hover:border-gray-400  text-sm font-semibold transition-all cursor-pointer"
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
