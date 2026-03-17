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
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

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

  const filtered = employees;
  const sorted = [...filtered].sort((a, b) => {
    const valA = (a[sortField] ?? "").toString().toLowerCase();
    const valB = (b[sortField] ?? "").toString().toLowerCase();
    if (sortOrder === "asc") return valA.localeCompare(valB);
    return valB.localeCompare(valA);
  });

  const totalEmployees = sorted.length;
  const noOfPages = Math.ceil(totalEmployees / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const paginatedEmployees = sorted.slice(start, end);

  const handlePageChange = (n) => setCurrentPage(n);

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
    <div className="min-h-screen text-slate-900 pt-24 px-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">User Management</h1>
        <input
          className="border w-84 p-2 rounded-lg"
          type="search"
          placeholder="Search employee..."
          value={search}
          onChange={handleSearchChange}
        />
        <button
          onClick={() => setOpen(true)}
          className="bg-orange-600 text-cyan-200 px-4 py-2 rounded-lg"
        >+ Add Employee</button>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table className="min-w-full shadow-lg">
            <thead>
              <tr className="bg-violet-700 rounded-lg">
                <SortTh field="name" label="Name" />
                <SortTh field="email" label="Email" />
                <SortTh field="role" label="Role" />
                <SortTh field="phoneNumber" label="Phone" />
                <SortTh field="status" label="Status" />
              </tr>
            </thead>
            <tbody>
              {paginatedEmployees.map((employee) => (
                <tr key={employee.id} className="border-t hover:bg-gray-50" onClick={() => setSelectedEmployee(employee)}                 >
                  <td className="p-3">{employee.name}</td>
                  <td className="p-3">{employee.email}</td>
                  <td className="p-3">{employee.role}</td>
                  <td className="p-3">{employee.phoneNumber}</td>
                  <td className="p-3">{employee.status}</td>

                </tr>
              ))}
            </tbody>
          </table>

          {noOfPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {[...Array(noOfPages).keys()].map((n) => (
                <button
                  key={n}
                  onClick={() => handlePageChange(n)}
                  className={`px-3 py-1 rounded ${currentPage === n ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                >{n + 1}</button>
              ))}
            </div>
          )}
        </>
      )}

      {open && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-md bg-white rounded-2xl shadow-xl max-h-[90vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 transition-colors text-sm font-bold"
            >
              ✕
            </button>

            {/* Scrollable content */}
            <div className="overflow-y-auto flex-1">
         {/* // ✅ CORRECT — pass close prop */}
              <Employee
                onSuccess={handleEmployeeAdded}
                inModal
                close={() => setOpen(false)}   // ✅ ADD THIS
              />
            </div>
          </div>
        </div>
      )}

      {/* ✅ EmpSidebar with all required props */}
      <EmpSidebar
        selectedEmployee={selectedEmployee}
        setSelectedEmployee={setSelectedEmployee}
        fetchEmployees={fetchEmployees}  // ✅ added
      />
    </div>
  );
};

export default User;