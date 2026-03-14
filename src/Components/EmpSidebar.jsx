import React, { useState } from "react";
import axios from "axios";  // ✅ uncommented

const EmpSidebar = ({
  selectedEmployee,
  setSelectedEmployee,
  fetchEmployees  // ✅ added prop
}) => {

  // ✅ useState BEFORE early return
  const [error, setError] = useState("");

  if (!selectedEmployee) return null;

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/employee/${id}`
      );
      setSelectedEmployee(null);  // ✅ close sidebar
      fetchEmployees();           // ✅ refresh list
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete");
    }
  };

  const handleEdit = async (data) => {
    try {
      const updatedEmployee = {
        name: data.name,
        email: data.email,
        age: Number(data.age),
        phoneNumber: data.phoneNumber,
        address: data.address,
        tag: data.tag
      };
      await axios.put(
        `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/employee/${data.id}`, // ✅ fixed URL
        updatedEmployee  // ✅ fixed variable
      );
      setSelectedEmployee(null);  // ✅ close sidebar
      fetchEmployees();           // ✅ refresh list
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update");
    }
  };

  return (
    <>
      <div
        onClick={() => setSelectedEmployee(null)}
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
      />
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 p-6 overflow-y-auto transition-transform duration-300">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-extralight text-gray-800">
            Employee Details
            <p className="text-2xl font-bold">{selectedEmployee.name}</p>
          </h2>
          <button
            onClick={() => setSelectedEmployee(null)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold"
          >✕</button>
        </div>

        {/* ✅ Error Message */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="space-y-4">

          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500 uppercase">Name</p>
            <p className="font-semibold text-gray-800">{selectedEmployee.name}</p>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500 uppercase">Email</p>
            <p className="font-semibold text-gray-800">{selectedEmployee.email}</p>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500 uppercase">Role</p>
            <p className="font-semibold text-gray-800">{selectedEmployee.role}</p>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500 uppercase">Phone</p>
            <p className="font-semibold text-gray-800">{selectedEmployee.phoneNumber}</p>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500 uppercase">Status</p>
            <span className={`inline-block mt-1 px-3 py-1 text-xs font-semibold rounded-full ${
              selectedEmployee.status === "ACTIVE"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}>
              {selectedEmployee.status}
            </span>
          </div>

          <div className="flex gap-2">
            {/* ✅ Edit button calls handleEdit */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEdit(selectedEmployee);  // ✅ fixed
              }}
              className="p-2 m-2 bg-blue-700 rounded-lg text-white w-32"
            >✏️ Edit</button>

            {/* ✅ Delete button calls handleDelete */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(selectedEmployee.id);  // ✅ fixed
              }}
              className="p-2 m-2 bg-red-100 text-red-500 rounded-lg w-32"
            >🗑️ Delete</button>
          </div>

        </div>
      </div>
    </>
  );
};

export default EmpSidebar;