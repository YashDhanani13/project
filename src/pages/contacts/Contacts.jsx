import { useState, useEffect } from "react";
import Contact from "./ContactForm";
import ContactFilter from "./ContactFilter";
import ContactSidebar from "./ContactSidebar";
import api from "../../api/api";
import { UserPlus } from "lucide-react";
import ContactSkeleton from "./ContactSkeleton";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [open, setOpen] = useState(false);
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


  useEffect(() => {
    fetchContacts();
  }, [search, filterField, filterValue]);

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

  const handleContactAdded = () => {
    setOpen(false);
    fetchContacts();
  };

  const handlesearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(0);
  };

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

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
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
      <br />

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
        <button
          onClick={() => setShowFilter(true)}
          className="border-2 font-extrabold border-black text-gray-800 w-35 h-12 bg-white hover:bg-black hover:text-white hover:border-gray-600 border-2 px-5 py-2 rounded-lg text-sm transition cursor-pointer"
        >
          Filter
        </button>

        <input
          className="flex-1 font-bold h-13 text-black max-w-2xl bg-white border border-gray-300 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-black"
          type="search"
          placeholder="Search contacts..." cd
          value={search}
          onChange={handlesearchChange}
        />

        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-4 py-2 hover:bg-black hover:text-white hover:border-blue-600 hover:border-2 font-bold text-black rounded-lg w-38 h-12 border cursor-pointer border-black text-sm transition-all"
        >
          <UserPlus size={16} />
          Add Contact
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg mb-4">
          {error}
        </div>
      )}

      {loading && (
        <ContactSkeleton />
      )}

      {!loading && (
        <>
          <div className="bg-white rounded-xl shadow overflow-hidden">
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
                        <td className="p-3">

                         
                          {contact.phoneNumber || "—"}
                          <br />
                        </td>
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

            <div className="px-4 py-3 border-t text-xs text-gray-500 flex items-center justify-between flex-wrap gap-3">
              <span className="font-bold">
                Showing{" "}
                <strong className="text-gray-700">
                  {totalContacts === 0 ? 0 : start + 1}–{Math.min(end, totalContacts)}
                </strong>{" "}
                of <strong className="text-gray-700">{totalContacts}</strong> contacts
              </span>

              <div className="flex items-center gap-2">
                <span className="text-gray-600 font-bold">Rows per page :</span>
                <select
                  className="border border-black brounded-lg p-2 rounded-md w-20  text-sm bg-white "
                  value={rowsPerPage}
                  onChange={handleRowsPerPageChange}
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
                  className="p-3  w-25  rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition disabled:bg-white disabled:border-red-300 disabled:text-red-500"
                >
                  ← Prev
                </button>
                <span className="text-black  font-bold text-md">
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

          {showFilter && (
            <div className="absolute top-40 items-center z-50">
              <div className="bg-gray-500 rounded-xl shadow-xl p-4 w-116">
                <button
                  onClick={() => setShowFilter(false)}
                  className="absolute top-3 right-3 w-4 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-500 hover:text-white text-gray-500 font-bold text-xs transition"
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

          {open && (

            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
              onClick={() => setOpen(false)}
            >

              <div
                className="relative w-110 bg-orange-600 shadow-2xl max-h-[93vh] rounded-3xl flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >

                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold text-sm transition"
                >
                  
                  ✕
                </button>
                <div className="overflow-y-auto flex-1">
                  <Contact onSuccess={handleContactAdded} close={() => setOpen(false)} />
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