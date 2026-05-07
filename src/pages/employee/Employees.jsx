import { useState, useEffect } from 'react'
import api from '../../api/api'
import EmployeeSkeleton from './EmployeeSkeleton'
import EmployeeForm from './EmployeeForm'
import EmpSidebar from './EmpSidebar'
import { UserPlus, Search, Hand } from 'lucide-react'

const Employees = () => {
    const [employees, setEmployees] = useState([])
    const [selectedEmployee, setSelectedEmployee] = useState(null)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [search, setSearch] = useState('')
    const [filterField, setFilterField] = useState("");
    const [filterValue, setFilterValue] = useState("");
    const [currentPage, setCurrentPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [sortField, setSortField] = useState('name')
    const [sortOrder, setSortOrder] = useState('asc')
       

    useEffect(() => {
        fetchEmployees()
    }, [search , filterField, filterValue])

    const fetchEmployees = async () => {
        setLoading(true)
        setError('')
        try {
            const response = await api.get('/employee', {
                params: {
                    search: search || undefined,
                    field: filterField || undefined,
                    value: filterValue || undefined,
                },
            })
            const data = response.data
            setEmployees(
                Array.isArray(data) ? data : data.data || data.employees || []
            )
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch employees')
            setEmployees([])
        } finally {
            await new Promise((resolve) => setTimeout(resolve, 2000))
            setLoading(false)
        }
    }

    const handleEmployeeAdded = () => {
        setIsFormOpen(false)
        fetchEmployees()
    }

        const handlesearchChange = (e) => {
        setSearch(e.target.value)
        setCurrentPage(0)
    }

    const handleSort = (field) => {
        if (sortField === field)
            setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
        else {
            setSortField(field)
            setSortOrder('asc')
        }
        setCurrentPage(0)
    }

    const sortIcon = (field) => {
        if (sortField !== field) return ''
        return sortOrder === 'asc' ? ' ↑' : ' ↓'
    }

    const sorted = [...employees].sort((a, b) => {
        const valA = (a[sortField] ?? '').toString().toLowerCase()
        const valB = (b[sortField] ?? '').toString().toLowerCase()
        return sortOrder === 'asc'
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA)
    })

    const totalEmployees = sorted.length
    const totalPages = Math.max(Math.ceil(totalEmployees / rowsPerPage), 1)
    const start = currentPage * rowsPerPage
    const end = start + rowsPerPage
    const pageEmployees = sorted.slice(start, end)

    const STATUS_STYLES = {
        active: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
        inactive: 'bg-red-500/15 text-red-400 border border-red-500/30',
        pending: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
    }

    const SortTh = ({ field, label }) => (
        <th
            onClick={() => handleSort(field)}
            className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider cursor-pointer select-none hover:text-orange-400 transition-colors"
        >
            {label}
            <span
                className={
                    sortField === field
                        ? 'text-orange-400 ml-1'
                        : 'text-slate-600 ml-1'
                }
            >
                {sortIcon(field)}
            </span>
        </th>
    )

    return (
        <div className="min-h-screen  bg-slate-900 text-slate-100 p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-white tracking-tight">
                    Employee Management
                </h1>
                <p className="text-slate-400 text-sm mt-1">
                    Manage and organise your team
                </p>
            </div>

            {/* Toolbar */}
            <div className="flex items-center gap-3 mb-6 flex-wrap">
                <div className="flex flex-1 max-w-2xl text-2xl items-center gap-2.5 rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-3.5 focus-within:ring-2 hover:border-slate-600 transition-colors">
                    <Search size={15} className="text-slate-500 shrink-0" />
                    <input
                        type="search"
                        placeholder="Search employees..."
                        value={search}
                            onChange={handlesearchChange}
                        className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 outline-none"
                    />
                </div>

                <button
                    onClick={() => setIsFormOpen(true)}
                    className="flex items-center gap-2 p-3  border border-blue-950 border-2 w-40 rounded-lg bg-linear-to-r from-slate-800  to-pink-900  text-black   text-sm font-semibold hover:from-mist-600 hover:to-indigo-400 hover:text-black border hover:border-black active:scale-[0.98] transition-all shadow-lg shadow-blue-500/20 cursor-pointer"
                >
                    <UserPlus size={15} />
                    Add Employee
                </button>
            </div>

            {/* Error */}
            {error && (
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 text-sm mb-5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                    {error}
                </div>
            )}

            {loading ? (
                <EmployeeSkeleton />
            ) : (
                <>
                    {/* Table Card */}
                    <div className="bg-slate-800 border border-slate-700 rounded-md shadow-xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm">
                                <thead className="bg-slate-900/60 border-b border-slate-700">
                                    <tr>
                                        <th className="px-4 py-3">
                                            <input
                                                type="checkbox"
                                                className=" w-4 h-4"
                                            />
                                        </th>
                                        <SortTh field="name" label="Name" />
                                        <SortTh field="email" label="Email" />
                                        <SortTh field="role" label="Role" />
                                        <SortTh
                                            field="phoneNumber"
                                            label="Phone"
                                        />
                                        <SortTh field="status" label="Status" />
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700/50">
                                    {pageEmployees.length > 0 ? (
                                        pageEmployees.map((employee) => (
                                            <tr
                                                key={employee.id}
                                                onClick={() =>
                                                    setSelectedEmployee(
                                                        employee
                                                    )
                                                }
                                                className="hover:bg-slate-700/50 cursor-pointer transition-colors"
                                            >
                                                <td className="px-4 py-3">
                                                    <input
                                                        type="checkbox"
                                                        className="accent-black -500 w-4 h-4"
                                                        onClick={(e) =>
                                                            e.stopPropagation()
                                                        }
                                                    />
                                                </td>
                                                <td className="px-4 py-3 font-medium text-slate-100">
                                                    {employee.name}
                                                </td>
                                                <td className="px-4 py-3 text-blue-400">
                                                    {employee.email}
                                                </td>
                                                <td className="px-4 py-3 text-slate-300">
                                                    {employee.role}
                                                </td>
                                                <td className="px-4 py-3 text-slate-300">
                                                    {employee.phoneNumber ||
                                                        '—'}
                                                </td>
                                                <td className="px-4 py-3">
                                                    {employee.status ? (
                                                        <span
                                                            className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${STATUS_STYLES[employee.status?.toLowerCase()] || 'bg-slate-700 text-slate-300'}`}
                                                        >
                                                            {employee.status}
                                                        </span>
                                                    ) : (
                                                        '—'
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={6}
                                                className="px-4 py-12 text-center text-slate-500"
                                            >
                                                {search
                                                    ? 'No employees match your search'
                                                    : 'No employees found — click Add Employee'}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Footer */}
                        <div className="px-5 py-3 border-t border-slate-700 flex items-center justify-between flex-wrap gap-3 bg-slate-900/40">
                            <span className="text-xs text-slate-400">
                                Showing{' '}
                                <strong className="text-slate-200">
                                    {totalEmployees === 0 ? 0 : start + 1}–
                                    {Math.min(end, totalEmployees)}
                                </strong>{' '}
                                of{' '}
                                <strong className="text-slate-200">
                                    {totalEmployees}
                                </strong>{' '}
                                employees
                            </span>

                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                <span>Rows per page:</span>
                                <select
                                    value={rowsPerPage}
                                    onChange={(e) => {
                                        setRowsPerPage(Number(e.target.value))
                                        setCurrentPage(0)
                                    }}
                                    className="bg-slate-800 border border-slate-600 text-slate-200 text-xs rounded-lg px-2 py-1.5 outline-none focus:ring-2 focus:ring-orange-500/40 cursor-pointer"
                                >
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={15}>15</option>
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
                                    Page{' '}
                                    <strong className="text-slate-200">
                                        {currentPage + 1}
                                    </strong>{' '}
                                    of{' '}
                                    <strong className="text-slate-200">
                                        {totalPages}
                                    </strong>
                                </span>
                                <button
                                    onClick={() => setCurrentPage((p) => p + 1)}
                                    disabled={currentPage >= totalPages - 1}
                                    className="px-3 py-1.5 rounded-lg border border-slate-600 text-slate-300 text-xs font-medium hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                                >
                                    Next →
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Add Employee Modal */}
                    {isFormOpen && (
                        <div
                            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-1"
                            onClick={() => setIsFormOpen(false)}
                        >
                            <div
                                className="relative w-full max-w-120 bg-slate-800 border border-orange-900 rounded-2xl  max-h-[92vh] "
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="overflow-y-auto flex-1">
                                    <EmployeeForm
                                        inModal={true}
                                        onSuccess={handleEmployeeAdded}
                                        close={() => setIsFormOpen(false)}
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
                </>
            )}
        </div>
    )
}

export default Employees
