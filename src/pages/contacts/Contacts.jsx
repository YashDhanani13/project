import { useState, useEffect } from "react";
import ContactFilter from "./ContactFilter";
import ContactSidebar from "./ContactSidebar";
import api from "../../api/api";
import { UserPlus, SlidersHorizontal, Search } from "lucide-react";
import ContactSkeleton from "./ContactSkeleton";
import ContactForm from "./ContactForm";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filterField, setFilterField] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => { fetchContacts(); }, [search, filterField, filterValue]);

  const fetchContacts = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await api.get("/contacts", {
        params: {
          search: search || undefined,
          field: filterField || undefined,
          value: filterValue || undefined,
        },
      });
      const data = response.data;
      setContacts(Array.isArray(data) ? data : data.data || data.contacts || []);
    } catch {
      setError("Failed to fetch contacts");
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    }
  };

  const handleContactAdded = () => { setIsFormOpen(false); fetchContacts(); };
  const handlesearchChange = (e) => { setSearch(e.target.value); setCurrentPage(0); };

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
  const noOfPages = Math.ceil(totalContacts / rowsPerPage);
  const start = currentPage * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedContacts = sorted.slice(start, end);

  const handleRowsPerPageChange = (e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(0); };

  const TAG_STYLES = {
    VIP: "bg-amber-100 text-amber-700 border border-amber-200",
    VVIP: "bg-purple-100 text-purple-700 border border-purple-200",
    regular: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  };

  const SortTh = ({ field, label }) => (
    <th
      onClick={() => handleSort(field)}
      className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider cursor-pointer select-none hover:text-blue-400 transition-colors"
    >
      {label}
      <span className={sortField === field ? "text-blue-400 ml-1" : "text-slate-600 ml-1"}>
        {sortIcon(field)}
      </span>
    </th>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white tracking-tight">Contact Management</h1>
        <p className="text-slate-400 text-sm mt-1">Manage and organise your contacts</p>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <button
          onClick={() => setShowFilter(true)}
          className="flex items-center gap-2  px-4 py-3 rounded-xl border border-slate-700 bg-slate-800 text-slate-300 text-sm font-bold hover:bg-slate-700 hover:border-slate-600 hover:text-white transition-all cursor-pointer  w-38"
        >
          <SlidersHorizontal size={15} />
          Filter
        </button>

        <div className="flex flex-1 max-w-2xl items-center gap-2.5 rounded-xl border border-slate-700 bg-slate-800 font-bold px-3 py-2.5 focus-within:ring-2 focus-within:ring-blue-500/40 focus-within:border-blue-500/70 hover:border-slate-600 transition-colors">
          <Search size={15} className="text-slate-500 shrink-0" />
          <input
            type="search"
            placeholder="Search contacts..."
            value={search}
            onChange={handlesearchChange}
            className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 outline-none"
          />
        </div>

        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 p-3  border border-zinc-700 border-2 w-40 rounded-lg bg-linear-to-r from-blue-500 to-orange-200 text-white text-sm font-semibold hover:from-mist-600 hover:to-indigo-400 hover:text-black border hover:border-black active:scale-[0.98] transition-all shadow-lg shadow-blue-500/20 cursor-pointer"
        >
          <UserPlus size={15} />
          Add Contact
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 text-sm mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
          {error}
        </div>
      )}

      {loading && <ContactSkeleton />}

      {!loading && (
        <>
          {/* Table Card */}
          <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-900/60 border-b border-slate-700">
                  <tr>
                    <th className="px-4 py-3">
                      <input type="checkbox" className="accent-blue-500 w-4 h-4" />
                    </th>
                    <SortTh field="name" label="Name" />
                    <SortTh field="email" label="Email" />
                    <SortTh field="age" label="Age" />
                    <SortTh field="tag" label="Tag" />
                    <SortTh field="phoneNumber" label="Mobile" />
                    <SortTh field="address" label="Address" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {paginatedContacts.length > 0 ? (
                    paginatedContacts.map((contact) => (
                      <tr
                        key={contact.id}
                        onClick={() => setSelectedContact(contact)}
                        className="hover:bg-slate-700/50 cursor-pointer transition-colors"
                      >
                        <td className="px-4 py-3">
                          <input type="checkbox" className="accent-blue-500 w-4 h-4" onClick={(e) => e.stopPropagation()} />
                        </td>
                        <td className="px-4 py-3 font-medium text-slate-100">{contact.name}</td>
                        <td className="px-4 py-3 text-blue-400">{contact.email}</td>
                        <td className="px-4 py-3 text-slate-300">{contact.age}</td>
                        <td className="px-4 py-3">
                          {contact.tag ? (
                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${TAG_STYLES[contact.tag] || "bg-slate-700 text-slate-300"}`}>
                              {contact.tag}
                            </span>
                          ) : (
                            <span className="text-slate-600">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-slate-300">{contact.phoneNumber || "—"}</td>
                        <td className="px-4 py-3 text-slate-400 max-w-xs truncate">{contact.address || "—"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-4 py-12 text-center text-slate-500">
                        {search ? "No contacts match your search" : "No contacts found — click Add Contact"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-slate-700 flex items-center justify-between flex-wrap gap-3 bg-slate-900/40">
              <span className="text-xs text-slate-400">
                Showing{" "}
                <strong className="text-slate-200">{totalContacts === 0 ? 0 : start + 1}–{Math.min(end, totalContacts)}</strong>
                {" "}of{" "}
                <strong className="text-slate-200">{totalContacts}</strong> contacts
              </span>

              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>Rows per page:</span>
                <select
                  value={rowsPerPage}
                  onChange={handleRowsPerPageChange}
                  className="bg-slate-800 border border-slate-600 text-slate-200 text-xs rounded-lg px-2 py-1.5 outline-none cursor-pointer"
                >
                  <option value={3}>3</option>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => p - 1)}
                  disabled={currentPage === 0}
                  className="px-3 py-1.5 rounded-lg border border-slate-600 text-slate-300 text-xs font-medium hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  ← Prev
                </button>
                <span className="text-xs text-slate-400 font-medium">
                  Page <strong className="text-slate-200">{currentPage + 1}</strong> of{" "}
                  <strong className="text-slate-200">{Math.max(noOfPages, 1)}</strong>
                </span>
                <button
                  onClick={() => setCurrentPage((p) => p + 1)}
                  disabled={currentPage >= noOfPages - 1}
                  className="px-3 py-1.5 rounded-lg border border-slate-600 text-slate-300 text-xs font-medium hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilter && (
            <div className="absolute top-40 z-50">
              <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-4 w-96">
                <button
                  onClick={() => setShowFilter(false)}
                  className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full bg-slate-700 hover:bg-red-500 hover:text-white text-slate-400 text-xs transition cursor-pointer"
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
          {isFormOpen && (
            <div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setIsFormOpen(false)}
            >
              <div
                className="relative w-full max-w-md bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl max-h-[93 vh] flex flex-col overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="overflow-y-auto flex-1">
                  <ContactForm onSuccess={handleContactAdded} close={() => setIsFormOpen(false)} />
                </div>
              </div>
            </div>
          )}

          <ContactSidebar
            selectedContact={selectedContact}
            setSelectedContact={setSelectedContact}
            fetchContacts={fetchContacts}
          />
        </>
      )}
    </div>
  );
};

export default Contacts;