import React, { useState, useEffect } from "react";
import axios from "axios";
import Contact  from "./Contact";
import ContactFilter from "./ContactFilter";
const PAGE_SIZE = 10;   // here   page  limit  define here 

const Services = () => {
  const [open, setOpen] = useState(false);// open  here  contact module 

  const [contacts, setContacts] = useState([]); //    
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  // ------------------------------------------------------------
  // sorting
  const [sortField, setSortField] = useState("name");  // sorting 
  const [sortOrder, setSortOrder] = useState("asc");  // sorting

  const [showFilter, setShowFilter] = useState(false);
  // ----------------
  useEffect(() => {
    fetchContacts();
  }, [search]);

  //  here  calling the    get api for  a    dagta show in this   
  const fetchContacts = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/contacts`
      );
      const data = response.data;
      const contactList = Array.isArray(data)
        ? data
        : data.data || data.contacts || [];
      setContacts(contactList);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch contacts");
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };
  const handleContactAdded = () => {
    setOpen(false);
    fetchContacts();
  };

  const handleEdit = async (data) => {
    try {
      const updatedContact = {
        name: data.name,
        email: data.email,
        age: Number(data.age),
        phoneNumber: data.phoneNumber,
        address: data.address,
        tag: data.tag
      };
      await axios.put(
        `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/contacts/${data.id}`,
        updatedContact);
      fetchContacts();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update contact");
    }
  };

  // delte buttion are logic are  here   : -   

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/contacts/${id}`
      );
      fetchContacts();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete contact");
    }
  };

  // // sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortIcon = (field) => {
    if (sortField !== field) return " ↕";
    return sortOrder === "asc" ? " ↑" : " ↓";
  };

  // Step 1 — filter
  const filtered = contacts.filter((c) =>
    c.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase()) ||
    c.phoneNumber?.includes(search) ||
    c.address?.toLowerCase().includes(search.toLowerCase()) ||
    c.age?.toString().includes(search));

  // Step 2 — sort
  const sorted = [...filtered].sort((a, b) => {
    const valA = (a[sortField] ?? "").toString().toLowerCase(); 
    const valB = (b[sortField] ?? "").toString().toLowerCase();
    if (sortOrder === "asc") return valA > valB ? 1 : -1;
    if (sortOrder === "desc") return valA < valB ? 1 : -1;
    return 0;
  });

  // Step 3 — paginate
  const totalContacts = sorted.length;
  const noOfPages = Math.ceil(totalContacts / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const paginatedContacts = sorted.slice(start, end);
  // const PAGE_SIZE = 10; 
  const handlePageChange = (n) => setCurrentPage(n);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
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
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-24 px-6">

      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        {/* <h1 className="text-3xl font-bold">Contacts</h1> */}
        <button className="bg-wite cursor-pointer border  border-black text-black  rounded-lg hover:bg-black  hover:text-white w-40 p-2 m-2 text-2xl"
          onClick={() => setShowFilter(true)}
        > Filter</button>
        <input
          className="bg-white border border-gray-300 p-2 rounded-lg w-72"
          type="search"
          placeholder="Search any information"
          value={search}
          onChange={handleSearchChange}
        />

        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          + Add Contact
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}




      {loading && (
        <div className="text-center py-8">
          <p className="text-white ">Loading contacts...</p>
        </div>
      )}

      {!loading && (
        <>
          <div className="bg-white  rounded-lg shadow-lg overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-purple-500 text-white text-sm">
                <tr>
                  <th className="p-3"><input type="checkbox" /></th>


                  <SortTh field="name" label="Name" />
                  <SortTh field="email" label="Email" />
                  <SortTh field="age" label="Age" />
                  <SortTh field="tag" label="Tags" />
                  <SortTh field="phoneNumber" label="Mobile" />
                  <SortTh field="address" label="Address" />
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="">
                {paginatedContacts.length > 0 ? (
                  paginatedContacts.map((contact) => (
                    <tr key={contact.id} className="border-t hover:bg-gray-50">
                      <td className="p-3"><input type="checkbox" /></td>
                      <td className="p-3 font-medium">{contact.name}</td>
                      <td className="p-3 text-blue-600">{contact.email}</td>
                      <td className="p-3">{contact.age}</td>
                      <td className="p-3">
                        {contact.tag ? (
                          <span style={{
                            background: tagColors[contact.tag]?.bg || "#E5E7EB",
                            color: tagColors[contact.tag]?.color || "#374151",
                            padding: "3px 10px", borderRadius: 20,
                            fontSize: 12, fontWeight: 700,
                          }}>
                            {contact.tag}
                          </span>
                        ) : (
                          <span className="text-gray-300 text-xs">—</span>
                        )}
                      </td>
                      <td className="p-3">{contact.phoneNumber || "—"}</td>
                      <td className="p-3 text-gray-500 max-w-xs truncate">
                        {contact.address || "—"}
                      </td>


                      <div className="flex justify-center">
                        <td className="p-3 ">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(contact)}
                              className="bg-blue-500 hover:bg-blue-600 text-white px-3 h-10   py-1 w-30 rounded-md text-sm"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(contact.id)}
                              className="bg-red-500 hover:bg-red-600 text-white w-30 h-10 px-3 py-1 rounded-md text-sm"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </div>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="p-6 text-center text-gray-400">
                      {search ? "No contacts match your search" : "No contacts found — click + Add Contact"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="p-3 border-t text-sm text-gray-400">
              Showing {totalContacts === 0 ? 0 : start + 1}–{Math.min(end, totalContacts)} of {totalContacts} contacts
              <span className="ml-4 text-blue-400">
                Sorted by: <strong>{sortField}</strong> ({sortOrder})
              </span>
            </div>
          </div>

          {noOfPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${currentPage === 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-gray-700"
                  }`}
              >
                ← Prev
              </button>

              {[...Array(noOfPages).keys()].map((n) => (
                <button
                  key={n}
                  onClick={() => handlePageChange(n)}
                  className={`w-9 h-9 rounded-lg text-sm font-semibold transition ${currentPage === n
                    ? "bg-blue-600 text-white shadow"
                    : "bg-white border border-gray-300 text-gray-600 hover:bg-blue-50"
                    }`}
                >
                  {n + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === noOfPages - 1}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${currentPage === noOfPages - 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}


{showFilter && (
  <div className="fixed inset-0 border   flex items-center justify-center">

    <div className="bg-white border absolute top-40 left-8 border-black h-45 w-100 p-4 rounded">

      {/* <button
        onClick={() => setShowFilter(false)}
        className="mb-2"
      >
        X
      </button> */}

      <ContactFilter />

    </div>

  </div>
)}
      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="relative w-full max-w-lg mx-4 bg-white rounded-2xl max-h-[90vh] overflow-hidden">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 z-20 text-white bg-gray-700 hover:bg-gray-600 rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold"
            >
              ✕
            </button>
            <div className="overflow-y-auto max-h-[90vh]">
              <Contact onSuccess={handleContactAdded} />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Services;