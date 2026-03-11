import React from "react";
// import axios  from "axios";
const EmpSidebar = ({ selectedEmployee, setSelectedEmployee }) => {
// import React, { useState } from "react";

  if (!selectedEmployee) return null;

  // const [error, setError] = useState("");

  // const handleDelete = async (id) => {

  //   if (!window.confirm("Are you sure you want to delete this employee?")) return;

  //   try {

  //     await axios.delete(
  //       `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/employee/${id}`
  //     );

  //     fetchEmployees();

  //   } catch (err) {
  //     setError(err.response?.data?.message || "Failed to delete employee");
  //   }
  // };


  // const handleEdit = async (data) => {
  //   try {
  //     const updatedEmployee = {
  //       name: data.name,
  //       email: data.email,
  //       age: Number(data.age),
  //       phoneNumber: data.phoneNumber,
  //       address: data.address,
  //       tag: data.tag
  //     };
  //     await axios.put(
  //       `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api//${data.id}`,
  //       updatedContact);
  //     fetchContacts();
  //   } catch (err) {
  //     setError(err.response?.data?.message || "Failed to update contact");
  //   }
  // };

  return (
    <>
      <div
        onClick={() => setSelectedEmployee(null)}
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
      />

      {/* sidebar */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 p-6 overflow-y-auto transition-transform duration-300">

        {/* header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-extralight text-gray-800">

            Employee Details
            <p className="text-2xl font-bold">{selectedEmployee.name}</p>
          </h2>

          <button
            onClick={() => setSelectedEmployee(null)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold"
          >
            ✕
          </button>
        </div>

        {/* employee info */}

        <p> </p>
        <div className="space-y-4">
          <div>

            <p className=" flex p-2  font-bold justify-center">{selectedEmployee.name}</p>
            <div className="flex justify-center">

              <p className=" mt-1 px-3 py-1 text-xs font-semibold rounded-full text-black bg-gray-400 ">{selectedEmployee.role}</p>
              <span
                className={`inline-block mt-1 px-3 py-1 text-xs font-bold rounded-full ${selectedEmployee.status === "ACTIVE"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
                  }`} >
                {selectedEmployee.status}
              </span>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            {/* <p className="text-xs text-gray-500 uppercase">Name</p> */}
          </div>

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
            <span
              className={`inline-block mt-1 px-3 py-1 text-xs font-semibold rounded-full ${selectedEmployee.status === "ACTIVE"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
                }`}
            >
              {selectedEmployee.status}
            </span>
          </div>

          <div>
            <button 
            
            // onClick={(e) => {
            //   e.stopPropagation();
            //   handleDelete(employee.id);
            // }}

              className="p-2 m-2 bg-blue-700 rounded-lg text-white w-32 ">✏️ Edit </button>


            <button
            
            // onClick={(e) => {
            //   e.stopPropagation();
            //   handleDelete(employee.id)
            // }}
              className="p-2 m-2  bg-red-100  text-red-500 rounded-lg w-32  ">🗑️ Delete

            </button>



  
          </div>

        </div>

      </div>
    </>
  );
};

export default EmpSidebar;