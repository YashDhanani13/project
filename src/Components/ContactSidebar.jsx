// import React from 'react'
import React , { useState } from "react";
import axios from "axios";  // ✅ uncommented



const ContactSidebar = ({
  selectedContact,
  setSelectedContact,
  fetchContacts
}) => {
  const [error, setError] = useState("");


  if (!selectedContact) return null;

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/contacts/${id}`
      );
      setSelectedContact(null);  // ✅ close sidebar
      fetchContacts();           // ✅ refresh list
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete");
    }
  }

  const handleEdit = async (data) => {
    try {
   
// ✅ CORRECT
const updatedContact = {
  name: data.name,
  email: data.email,
  age: Number(data.age),
  phoneNumber: data.phoneNumber,  // ✅
  tag: data.tag,
  address: data.address,
};
      await axios.put(
        `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/contacts/${data.id}`, // ✅ fixed URL
        updatedContact  // ✅ fixed variable
      );
      setSelectedContact(null);  // ✅ close sidebar
      fetchContacts();         // ✅ refresh list
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update");
    }
  };

  return (

    <div className="space-y-4">

      <div
        onClick={() => setSelectedContact(null)}
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
      />
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 p-6 overflow-y-auto transition-transform duration-300">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-extralight text-gray-800">
            Contact Details
            <p className="text-2xl font-bold">{selectedContact.name}</p>
          </h2>
          <button
            onClick={() => setSelectedContact(null)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold"
          >✕</button>
        </div>

        {/* ✅ Error Message */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}


        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-xs text-gray-500 uppercase">Name</p>
          <p className="font-semibold text-gray-800">{selectedContact.name}</p>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-xs text-gray-500 uppercase">Email</p>
          <p className="font-semibold text-gray-800">{selectedContact.email}</p>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-xs text-gray-500 uppercase">Age</p>
          <p className="font-semibold text-gray-800">{selectedContact.age}</p>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-xs text-gray-500 uppercase">Tag</p>
          <p className="font-semibold text-gray-800">{selectedContact.tag}</p>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-xs text-gray-500 uppercase">Address</p>


          <span className=  "mt-1 px-3 py-1 text-xs font-semibold rounded-full m-2 " >{selectedContact.address}
        
          </span>
        </div>

        <div className="flex gap-2">
          {/* ✅ Edit button calls handleEdit */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(selectedContact);  // ✅ fixed
            }}
            className="p-2 m-2 bg-blue-700 rounded-lg text-white w-32"
          >✏️ Edit</button>

          {/* ✅ Delete button calls handleDelete */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(selectedContact.id);  // ✅ fixed
            }}
            className="p-2 m-2 bg-red-100 text-red-500 rounded-lg w-32"
          >🗑️ Delete</button>
        </div>
      </div>
    </div>
  )
}

export default ContactSidebar