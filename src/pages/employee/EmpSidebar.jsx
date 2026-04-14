import React, { useState } from "react";
import { Save, Pencil, Trash2, X } from "lucide-react";
import axios from "axios";
// Add this at the top of ContactSidebar.jsx
import api from "../../api/api";


const EmpSidebar = ({
  selectedEmployee,
  setSelectedEmployee,
  fetchEmployees,
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
      await api.put(`/employee/${selectedEmployee.id}`, updatedEmployee);
      setIsEditing(false);
      setSelectedEmployee(null);
      fetchEmployees();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/employee/${id}`);
      setSelectedEmployee(null);
      fetchEmployees();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete");
    }
  };


  return (
    <>
      <div
        onClick={() => {
          setSelectedEmployee(null);
          setIsEditing(false);
        }}
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
      />
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-extralight text-gray-800">
            {isEditing ? "Edit Employee" : "Employee Details"}
            <p className="text-2xl font-bold">{selectedEmployee.name}</p>
          </h2>
          <button
            onClick={() => {
              setSelectedEmployee(null);
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
              { label: "Role", field: "role" },
              { label: "Phone Number", field: "phoneNumber" },
              { label: "Status", field: "status" },
            ].map(({ label, field }) => (
              <div key={field} className="bg-gray-100 p-3 rounded-lg  border border-mist-500">


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
                className="flex items-center justify-center gap-2 h-12 bg-white  rounded-lg text-red-300 w-40 border  border-red-600 cursor-pointer hover:bg-red-400  hover:text-white hover:border-b-fuchsia-800"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className=" grid grid-rows-5 gap-y-3.5  ">
            <div className="bg-gray-100  p-3 border border-mist-500 rounded-lg ">
              <p className="text-xs text-gray-500 uppercase">Name</p>
              <p className="font-semibold text-gray-800">
                {selectedEmployee.name}
              </p>
            </div>


            <div className="bg-gray-100 p-3 rounded-lg  border border-mist-500">
              <p className="text-xs text-gray-500 uppercase">Email</p>
              <p className="font-semibold text-gray-800">
                {selectedEmployee.email}
              </p>
            </div>


            <div className="bg-gray-100 p-3 rounded-lg  border border-mist-500">
              <p className="text-xs text-gray-500 uppercase">Role</p>
              <p className="font-semibold text-gray-800">
                {selectedEmployee.role}
              </p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg  border border-mist-500">
              <p className="text-xs text-gray-500 uppercase">Phone</p>
              <p className="font-semibold text-gray-800">
                {selectedEmployee.phoneNumber}
              </p>
            </div>

            <div className="bg-gray-100 p-3 rounded-lg  border border-mist-500">
              <p className="text-xs text-gray-500 uppercase">Status</p>
              <span
                className={`inline-block mt-1 px-3 py-1 text-xs font-semibold rounded-full ${selectedEmployee.status === "ACTIVE"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
                  }`}
              >
                {selectedEmployee.status}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 p-3 bg-white- hover:bg-black hover:text-white hover:border-indigo-500 hover:border-2  text-blue-500 rounded-lg w-42 h-12 border border-blue-300  text-sm font-semibold transition-all cursor-pointer"
              >
                <Pencil size={16} /> Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(selectedEmployee.id);
                }}
                className="flex items-center gap-3 px-4 py-2 bg-white- hover:bg-red-500  hover:text-white  hover:border-2  text-black rounded-lg w-42 h-12 border border-gray-400  text-sm font-semibold transition-all cursor-pointer"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EmpSidebar;
