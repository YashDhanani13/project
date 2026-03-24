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

  useEffect(() => { fetchEmployees(); }, [search]);

  const fetchEmployees = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/employee`,
        { params: { search: search || undefined } }
      );
      const data = res.data;
      setEmployees(Array.isArray(data) ? data : data.data || data.employees || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch employees");
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEmployeeAdded = () => { setOpen(false); fetchEmployees(); };

  const handleSort = (field) => {
    if (sortField === field) setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortOrder("asc"); }
    setCurrentPage(0);
  };

  const sortIcon = (field) => {
    if (sortField !== field) return " ↕";
    return sortOrder === "asc" ? " ↑" : " ↓";
  };

  const sorted = [...employees].sort((a, b) => {
    const valA = (a[sortField] ?? "").toString().toLowerCase();
    const valB = (b[sortField] ?? "").toString().toLowerCase();
    if (sortOrder === "asc") return valA.localeCompare(valB);
    return valB.localeCompare(valA);
  });

  //  use totalEmployees — NOT totalContacts
  const totalEmployees = sorted.length;
  const noOfPages = Math.ceil(totalEmployees / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const paginatedEmployees = sorted.slice(start, end);

  const handleSearchChange = (e) => { setSearch(e.target.value); setCurrentPage(0); };

  const SortTh = ({ field, label }) => (
    <th
      onClick={() => handleSort(field)}
      className="p-3 text-left cursor-pointer select-none hover:text-yellow-300 transition-colors"
    >
      {label}
      <span className={sortField === field ? "text-yellow-300 font-bold" : "text-purple-200"}>
        {sortIcon(field)}
      </span>
    </th>
  );

  const statusColors = {
    active: { bg: "#D1FAE5", color: "#065F46" },
    inactive: { bg: "#FEE2E2", color: "#991B1B" },
    pending: { bg: "#FFF3CD", color: "#856404" },
  };

  return (
    <div className="min-h-screen bg-orange-50 text-slate-900 p-6">

      {/* Page Title */}
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Employee Management</h1>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
        <input
          className="flex-1 min-w-[200px] max-w-sm bg-white border border-gray-300 px-4 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-300"
          type="search"
          placeholder="Search employees..."
          value={search}
          onChange={handleSearchChange}
        />
        <button
          onClick={() => setOpen(true)}
          className="bg-zinc-600 hover:bg-orange-500 text-white font-semibold px-5 py-2 rounded-lg transition text-sm"
        >
          + Add Employee
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg mb-4">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="text-center py-10 text-gray-400">Loading employees...</div>
      ) : (
        <>
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-purple-500 text-white">
                  <tr>
                    <th className="p-3">
                      <input type="checkbox" />
                    </th>
                    <SortTh field="name" label="Name" />
                    <SortTh field="email" label="Email" />
                    <SortTh field="role" label="Role" />
                    <SortTh field="phoneNumber" label="Phone" />
                    <SortTh field="status" label="Status" />
                  </tr>
                </thead>
                <tbody>
                  {paginatedEmployees.length > 0 ? (
                    paginatedEmployees.map((employee) => (
                      <tr
                        key={employee.id}
                        className="border-t hover:bg-orange-50 cursor-pointer transition-colors"
                        onClick={() => setSelectedEmployee(employee)}
                      >
                       
                        <td className="p-3">
                          <input type="checkbox" onClick={(e) => e.stopPropagation()} />
                        </td>
                        <td className="p-3 font-medium">{employee.name}</td>
                        <td className="p-3 text-blue-600">{employee.email}</td>
                        <td className="p-3">{employee.role}</td>
                        <td className="p-3">{employee.phoneNumber || "—"}</td>
                        <td className="p-3">
                          {employee.status ? (
                            <span style={{
                              background: statusColors[employee.status?.toLowerCase()]?.bg || "#E5E7EB",
                              color: statusColors[employee.status?.toLowerCase()]?.color || "#374151",
                              padding: "3px 10px",
                              borderRadius: 20,
                              fontSize: 12,
                              fontWeight: 700,
                            }}>
                              {employee.status}
                            </span>
                          ) : "—"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-gray-400">
                        {search ? "No employees match your search" : "No employees found — click + Add Employee"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="px-4 py-3 border-t text-xs text-gray-400 flex items-center justify-between">
              <span>
                Showing {totalEmployees === 0 ? 0 : start + 1}–{Math.min(end, totalEmployees)} of {totalEmployees} employees
              </span>
              <span>
                Sorted by: <strong className="text-gray-600">{sortField}</strong> ({sortOrder})
              </span>
            </div>
          </div>

          {/* Pagination */}
          {noOfPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-5 flex-wrap">
              {[...Array(noOfPages).keys()].map((n) => (
                <button
                  key={n}
                  onClick={() => setCurrentPage(n)}
                  className={`w-9 h-9 rounded-lg text-sm font-semibold transition
                    ${currentPage === n
                      ? "bg-blue-600 text-white shadow"
                      : "bg-white border border-gray-300 text-gray-600 hover:bg-blue-50"
                    }`}
                >
                  {n + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {/* Add Employee Modal */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-md bg-white rounded-2xl shadow-xl max-h-[90vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 font-bold text-sm transition"
            >
              ✕
            </button>
            <div className="overflow-y-auto flex-1">
              <Employee
                onSuccess={handleEmployeeAdded}
                inModal
                close={() => setOpen(false)}
              />
            </div>
          </div>
        </div>
      )}

      <EmpSidebar
        selectedEmployee={selectedEmployee}
        setSelectedEmployee={setSelectedEmployee}
        fetchEmployees={fetchEmployees}
      />
    </div>
  );
};

export default User;