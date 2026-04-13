import React, { useState, useEffect } from "react";
import api from "../../api/api";

import Employee from "./EmployeeForm";
import EmpSidebar from "./EmpSidebar"
import { UserPlus} from "lucide-react";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  //search bar  here   
  const [search, setSearch] = useState("");

  // dropdown  row per page  adn  pagination here
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  //sorting   
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetchEmployees();
  },
    [search]);

  const fetchEmployees = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/employee",
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

  const handleEmployeeAdded = () => {
    setOpen(false);
    fetchEmployees();
  };

  const handleSort = (field) => {
    if (sortField === field) setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    else {
      setSortField(field);
      setSortOrder("asc");
    }
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


  const totalEmployees = sorted.length;
  const noOfPages = Math.ceil(totalEmployees / rowsPerPage);
  const start = currentPage * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedEmployees = sorted.slice(start, end);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setFilterField("");
    setFilterValue("");
    setCurrentPage(0);
  };


  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value)); // update rows per page
    setCurrentPage(0);                      // always reset to page 1
  };

  const SortTh = ({ field, label }) => (
    <th
      onClick={() => handleSort(field)}
      className="p-3 text-left cursor-pointer select-none hover:text-black  transition-colors"
    >
      {label}
      <span className={sortField === field ? "text-blue-600 font-bold" : "text-black"}>
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
          className="flex-1  font-bold  h-13 text-1xl text-black  max-w-2xl bg-white border border-gray-300 px-4 py-2 rounded-lg  outline-none focus:ring-2 focus:ring-black"
          type="search"
          placeholder="Search employees..."
          value={search}
          onChange={handleSearchChange}
        />


        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white cursor-pointer  hover:bg-black hover:text-white hover:border-indigo-500 hover:border-2  text-orange-500 rounded-lg w-38 h-12 border border-orange-400  text-sm font-semibold transition-all"
        >
          <UserPlus size={16} />
           Add Employee
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
            <div className="overflow-x-auto  ">
              <table className="min-w-full text-sm">
                <thead className="bg-orange-200  text-black  p-">
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
                        className="border-t hover:bg-blue-100 cursor-pointer transition-colors"
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
            {/* Footer */}

            <div className="px-4 py-3 border-t text-xs text-gray-500 flex items-center justify-between flex-wrap gap-3">

              {/* Left: showing count */}
              <span>
                Showing{" "}
                <strong className="text-gray-700">
                  {totalEmployees === 0 ? 0 : start + 1}–{Math.min(end, totalEmployees)}
                </strong>{" "}
                of <strong className="text-gray-700">{totalEmployees}</strong> employees
              </span>

              {/* here  drop down  manu throguh  */}
              <div className="flex items-center gap-2">
                <span className="text-gray-400">Rows per page:</span>
                <select
                  className="border border-gray-300 rounded-lg px-2 py-1 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-purple-300"
                  value={rowsPerPage}              // ✅ controlled value
                  onChange={handleRowsPerPageChange} // ✅ wired handler
                >
                  <option value={3}>3</option>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>
              </div>

              {/*  here  prev and  next button  */}

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => p - 1)}
                    disabled={currentPage === 0}
                    className="p-3  w-25  rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition disabled:bg-white disabled:border-red-300 disabled:text-red-500"
                >
                  ← Prev
                </button>

                <span className="text-gray-500 font-bold">
                  Page <strong className="text-gray-700">{currentPage + 1}</strong> of{" "}
                  <strong className="text-gray-700">{Math.max(noOfPages, 1)}</strong>
                </span>

                <button
                onClick={() => setCurrentPage((p) => p + 1)}
                    disabled={currentPage >= noOfPages - 1}
                    className="p-3 w-25  border-2  rounded-lg   text-blue-400 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition disabled:bg-white broder  disabled:broder-red-400 disabled:text-red-500"
                >
                  Next →
                </button>
              </div>

            </div>
          </div>

          {/* Sidebar for selected employee */}
          {selectedEmployee && (

            <EmpSidebar
              employee={selectedEmployee}
              onClose={() => setSelectedEmployee(null)}
              onUpdated={fetchEmployees}
            />
          )}

          {/* Add employee modal */}

          {open && (
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setOpen(false)}
            >
              <div
                className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl h-170 flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold text-sm transition"
                >
                  ✕
                </button>
                <div className="overflow-y-auto flex-1">
                  <Employee onSuccess={handleEmployeeAdded} close={() => setOpen(false)} />
                </div>
              </div>
            </div>

          )}


          <EmpSidebar
            selectedEmployee={selectedEmployee}
            setSelectedEmployee={setSelectedEmployee}
            fetchEmployees={fetchEmployees}
          />

        </>
      )}
    </div>
  );
};

export default Employees;