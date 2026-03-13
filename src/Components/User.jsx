import React, { useState, useEffect } from "react";
import axios from "axios";
import Employee from "./Employee";
import EmpSidebar from "./EmpSidebar";

const PAGE_SIZE = 10;

const User = () => {

  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");     // searching
  const [currentPage, setCurrentPage] = useState(0);  // pagination

  const [sortField, setSortField] = useState("name"); // sorting
  const [sortOrder, setSortOrder] = useState("asc"); // sorting 

  useEffect(() => {

    fetchEmployees();
  }, [search]);

  const fetchEmployees = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/employee?search=${encodeURIComponent(search)}`
      );

      const data = res.data;
      const list = Array.isArray(data) ? data : data.data || data.employees || [];

      setEmployees(list);

    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch employees");
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEmployeeAdded = () => {
    setOpen(false);
    fetchEmployees();
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
        `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api//${data.id}`,
        updatedContact);
      fetchContacts();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update contact");
    }
  };

  const handleDelete = async (id) => {

    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {

      await axios.delete(
        `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/employee/${id}`
      );

      fetchEmployees();

    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete employee");
    }
  };

  const handleSort = (field) => {

    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }

    setCurrentPage(0);
  };

  const sortIcon = (field) => {

    if (sortField !== field) return " ↕";

    return sortOrder === "asc" ? " ↑" : " ↓";
  };

  // FILTER

  const filtered = employees;
  // SORT
  const sorted = [...filtered].sort((a, b) => {

    const valA = (a[sortField] ?? "").toString().toLowerCase();
    const valB = (b[sortField] ?? "").toString().toLowerCase();

    if (sortOrder === "asc") return valA.localeCompare(valB);
    return valB.localeCompare(valA);
  });

  // PAGINATION
  const totalEmployees = sorted.length;
  const noOfPages = Math.ceil(totalEmployees / PAGE_SIZE);

  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const paginatedEmployees = sorted.slice(start, end);

  const handlePageChange = (n) => {
    setCurrentPage(n);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(0);
  };
  const SortTh = ({ field, label }) => (

    <th
      onClick={() => handleSort(field)}
      className="p-3 text-left cursor-pointer hover:text-black-600"
    >
      {label}
      <span className={sortField === field ? "text-blue-600 font-bold" : "text-gray-400"}>
        {sortIcon(field)}
      </span>
    </th>
  );

  return (
    <div className="min-h-screen  text-slate-900 pt-24 px-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">User Management</h1>

        <input
          className="border  w-84 p-2 rounded-lg"
          type="search"
          placeholder="Search employee..."
          value={search}
          onChange={handleSearchChange}
        />

        <button
          onClick={() => setOpen(true)}
          className="bg-orange-600 text-cyan-200 px-4 py-2 rounded-lg"
        >
          + Add Employee
        </button>
      </div>

      {error && (
        <div className="text-red-500  mb-4">{error}</div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table className="min-w-full  shadow-lg">
            <thead className=" rounded-4xl">
              <tr className="bg-violet-700 rounded-lg">
                <SortTh field="name" label="Name" />
                <SortTh field="email" label="Email" />
                <SortTh field="role" label="Role" />
                <SortTh field="phoneNumber" label="Phone" />
                <SortTh field="status" label="Status" />
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedEmployees.map((employee) => (

<tr className="border-t hover:bg-gray-50">
  <td className="p-3">{employee.name}</td>
  <td className="p-3">{employee.email}</td>
  <td className="p-3">{employee.role}</td>
  <td className="p-3">{employee.phoneNumber}</td>
  <td className="p-3">{employee.status}</td>

  <td className="p-3">
    <div className="flex justify-center gap-2">
      <button className="bg-blue-500 text-white px-3 py-1 rounded">
        Edit
      </button>

      <button className="bg-red-500 text-white px-3 py-1 rounded">
        Delete
      </button>
    </div>
  </td>
</tr>  
              ))}
            </tbody>

          </table>

          {/* Pagination */}

          {noOfPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {[...Array(noOfPages).keys()].map((n) => (
                <button key={n} onClick={() => handlePageChange(n)} className={`px-3 py-1 rounded ${currentPage === n ? "bg-blue-600 text-white" : "bg-gray-200"}`}>      {n + 1} </button>
              ))}
            </div>
          )}        </>
      )}

      {/* ADD EMPLOYEE MODAL */}

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center overflow-y-auto p-6">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setOpen(false)}
              className="float-right text-xl font-bold"
            >
              ✕
            </button>

            <Employee onSuccess={handleEmployeeAdded} inModal />
          </div>
        </div>
      )}
      {/* SIDEBAR */}
      <EmpSidebar selectedEmployee={selectedEmployee} setSelectedEmployee={setSelectedEmployee} />
    </div>
  );
};

export default User;