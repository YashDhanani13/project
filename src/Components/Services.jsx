import React, { useState, useEffect } from "react";
import axios from "axios";
import Contact from "./Contact";
import ContactFilter from "./ContactFilter";
import ContactSidebar from "./ContactSidebar";

const PAGE_SIZE = 10;

const Services = () => {
  const [open, setOpen] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterField, setFilterField] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => { fetchContacts(); }, [search, filterField, filterValue]);

  const fetchContacts = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/contacts`,
        { params: { search: search || undefined, field: filterField || undefined, value: filterValue || undefined } }
      );
      const data = response.data;
      setContacts(Array.isArray(data) ? data : data.data || data.contacts || []);
    } catch {
      setError("Failed to fetch contacts");
    } finally {
      setLoading(false);
    }
  };

  const handleContactAdded = () => { setOpen(false); fetchContacts(); };

  const handleSort = (field) => {
    if (sortField === field) setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortOrder("asc"); }
    setCurrentPage(0);
  };

  const sortIcon = (field) => {
    if (sortField !== field) return " ↕";
    return sortOrder === "asc" ? " ↑" : " ↓";
  };

  const sorted = [...contacts].sort((a, b) => {
    const valA = (a[sortField] ?? "").toString().toLowerCase();
    const valB = (b[sortField] ?? "").toString().toLowerCase();
    if (sortOrder === "asc") return valA > valB ? 1 : -1;
    if (sortOrder === "desc") return valA < valB ? 1 : -1;
    return 0;
  });

  const totalContacts = sorted.length;
  const noOfPages = Math.ceil(totalContacts / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const paginatedContacts = sorted.slice(start, end);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setFilterField("");
    setFilterValue("");
    setCurrentPage(0);
  };

  const tagColors = {
    VIP: { bg: "#FFF3CD", color: "#856404" },
    VVIP: { bg: "#F3E8FF", color: "#6B21A8" },
    regular: { bg: "#D1FAE5", color: "#065F46" },
  };

  const SortTh = ({ field, label }) => (
    <th
      onClick={() => handleSort(field)}
      className="p-3 text-left cursor-pointer select-none hover:text-blue-600 transition-colors"
    >
      {label}
      <span className={sortField === field ? "text-blue-600 font-bold" : "text-gray-400"}>
        {sortIcon(field)}
      </span>
    </th>
  );

  return (
    <div className="min-h-screen bg-orange-50 text-slate-900 p-6">

      <h1 className="text-3xl font-bold">Contact Management</h1>
      <br /> <br />
      <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">


        <button
          onClick={() => setShowFilter(true)}
          className="border border-black text-black bg-white hover:bg-black hover:text-white px-5 py-2 rounded-lg font-semibold text-sm transition"
        >
          Filter
        </button>

        {/* Center: Search bar */}
        <input
          className="flex-1 min-w-[200px] max-w-sm bg-white border border-gray-300 px-4 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-300"
          type="search"
          placeholder="Search Contact"
          value={search}
          onChange={handleSearchChange}
        />

        {/* Right: Add Contact */}
        <button
          onClick={() => setOpen(true)}
          className="bg-zinc-600 hover:bg-orange-500 text-white font-semibold px-5 py-2 rounded-lg transition text-sm"
        >
          + Add Contact
        </button>
      </div>


      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg mb-4">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="text-center py-8 text-gray-500">Loading contacts...</div>
      )}

      {/* Table */}
      {!loading && (
        <>
          <div className="bg-white rounded-xl sh  adow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-purple-500 text-white">
                  <tr>
                    <th className="p-3"><input type="checkbox" /></th>
                    <SortTh field="name" label="Name" />
                    <SortTh field="email" label="Email" />
                    <SortTh field="age" label="Age" />
                    <SortTh field="tag" label="Tags" />
                    <SortTh field="phoneNumber" label="Mobile" />
                    <SortTh field="address" label="Address" />
                  </tr>
                </thead>
                <tbody>
                  {paginatedContacts.length > 0 ? (
                    paginatedContacts.map((contact) => (
                      <tr
                        key={contact.id}
                        className="border-t hover:bg-orange-50 cursor-pointer transition-colors"
                        onClick={() => setSelectedContact(contact)}
                      >
                        <td className="p-3">
                          <input type="checkbox" onClick={(e) => e.stopPropagation()} />
                        </td>
                        <td className="p-3 font-medium">{contact.name}</td>
                        <td className="p-3 text-blue-600">{contact.email}</td>
                        <td className="p-3">{contact.age}</td>
                        <td className="p-3">
                          {contact.tag ? (
                            <span style={{
                              background: tagColors[contact.tag]?.bg || "#E5E7EB",
                              color: tagColors[contact.tag]?.color || "#374151",
                              padding: "3px 10px",
                              borderRadius: 20,
                              fontSize: 12,
                              fontWeight: 700,
                            }}>
                              {contact.tag}
                            </span>
                          ) : (
                            <span className="text-gray-300 text-xs">—</span>
                          )}
                        </td>
                        <td className="p-3">{contact.phoneNumber || "—"}</td>
                        <td className="p-3 text-gray-500 max-w-xs truncate">{contact.address || "—"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-gray-400">
                        {search ? "No contacts match your search" : "No contacts found — click + Add Contact"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t text-xs text-gray-400 flex items-center justify-between">
              <span>
                Showing {totalContacts === 0 ? 0 : start + 1}–{Math.min(end, totalContacts)} of {totalContacts} contacts
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

      {/* Filter Modal */}
      {showFilter && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl p-6 w-96 relative">
            <button
              onClick={() => setShowFilter(false)}
              className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-500 hover:text-white text-gray-500 font-bold text-xs transition"
            >
              ✕
            </button>
            <ContactFilter
              setFilterField={setFilterField}
              setFilterValue={setFilterValue}
              close={() => setShowFilter(false)}
            />
          </div>
        </div>
      )}

      {/* Add Contact Modal */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold text-sm transition"
            >
              ✕
            </button>


            <div className="overflow-y-auto flex-1">
              <Contact
                onSuccess={handleContactAdded}
                close={() => setOpen(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Contact Sidebar */}
      <ContactSidebar
        selectedContact={selectedContact}
        setSelectedContact={setSelectedContact}
        fetchContacts={fetchContacts}
      />
    </div>
  );
};

export default Services;