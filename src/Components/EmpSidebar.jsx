import React, { useState } from "react";
import axios from "axios";

const EmpSidebar = ({
  selectedEmployee,
  setSelectedEmployee,
  fetchEmployees
}) => {
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  if (!selectedEmployee) return null;


  const handleEdit = () => {
    setFormData({
      name: selectedEmployee.name,
      email: selectedEmployee.email,
      phoneNumber: selectedEmployee.phoneNumber,
      role: selectedEmployee.role,
      status: selectedEmployee.status,
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {

      const updatedEmployee = {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        role: formData.role,
        status: formData.status,
      };
      await axios.put(
        `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/employee/${selectedEmployee.id}`,
        updatedEmployee
      );
      setIsEditing(false);
      setSelectedEmployee(null);

      fetchEmployees();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/employee/${id}`
      );
      setSelectedEmployee(null);
      fetchEmployees();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete");
    }
  };

  return (
    <>

      <div
        onClick={() => { setSelectedEmployee(null); setIsEditing(false); }}
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
      />
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 p-6 overflow-y-auto">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-extralight text-gray-800">
            {isEditing ? "Edit Employee" : "Employee Details"}
            <p className="text-2xl font-bold">{selectedEmployee.name}</p>
          </h2>
          <button
            onClick={() => { setSelectedEmployee(null); setIsEditing(false); }}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold"
          >✕</button>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {isEditing ? (
          <div className="space-y-3">
            {[
              { label: "Name", field: "name" },
              { label: "Email", field: "email" },
              { label: "Role", field: "role" },
              { label: "Phone Number", field: "phoneNumber" },
              { label: "Status", field: "status" },
            ].map(({ label, field }) => (
              <div key={field} className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500 uppercase">{label}</p>
                <input
                  className="w-full font-semibold text-gray-800 bg-transparent border-b border-blue-400 outline-none pt-1"
                  value={formData[field] || ""}
                  onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                />
              </div>
            ))}

            <div className="flex gap-2 mt-4">
              <button onClick={handleSave}
                className="p-2 m-2 bg-green-600 rounded-lg text-white w-32 cursor-pointer"
              >💾 Save</button>
              <button onClick={() => setIsEditing(false)}
                className="p-2 m-2 bg-gray-200 text-gray-700 rounded-lg w-32 cursor-pointer"
              >Cancel</button>
            </div>
          </div>

        ) : (
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
              <span className={`inline-block mt-1 px-3 py-1 text-xs font-semibold rounded-full ${selectedEmployee.status === "ACTIVE"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
                }`}>
                {selectedEmployee.status}
              </span>
            </div>

            <div className="flex gap-2">
              <button onClick={handleEdit}
                className="p-2 m-2 bg-blue-700 rounded-lg text-white w-32 cursor-pointer"
              >✏️ Edit</button>
              <button
                onClick={(e) => { e.stopPropagation(); handleDelete(selectedEmployee.id); }}
                className="p-2 m-2 bg-red-100 text-red-500 rounded-lg w-32 cursor-pointer"
              >🗑️ Delete</button>
            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default EmpSidebar;