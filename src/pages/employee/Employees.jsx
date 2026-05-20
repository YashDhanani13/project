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
    const [filterField, setFilterField] = useState('')
    const [filterValue, setFilterValue] = useState('')
    const [currentPage, setCurrentPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [sortField, setSortField] = useState('name')
    const [sortOrder, setSortOrder] = useState('asc')

    useEffect(() => {
        fetchEmployees()
    }, [search, filterField, filterValue])

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
                <h1 className="text-2xl font-serif text-white tracking-tight">
                    Employee Management
                </h1>
                <p className="text-slate-400 font-serif  text-sm mt-1">
                    Manage and organise your team
                </p>
            </div>

            {/* Toolbar */}
            <div className="flex items-center gap-3 mb-6 flex-wrap">
                <div className="flex flex-1 max-w-2xl items-center gap-2.5 font-serif   rounded-xl border border-slate-700 bg-slate-800 font-bold px-4 py-4 focus-within:border-blue-400 focus:border-gray-500 border-2 hover:border-slate-600 ">
                    <Search size={15} className="text-slate-500 shrink-0" />

                    <input
                        type="search"
                        placeholder="Search Employee..."
                        value={search}
                        onChange={handlesearchChange}
                        className="w-full bg-transparent text-white  outline-none"
                    />
                </div>
    <button
                    onClick={() => setIsFormOpen(true)}
                    // className="flex items-center gap-2 p-3  border border-blue-900 border-2 w-40 rounded-lg bg-linear-to-r from-slate-800  to-slate-900  text-white   text-1xl font-serif hover:from-mist-600 hover:to-indigo-400 hover:text-black border hover:border-black *: transition-all  cursor-pointer"
                    className="  group relative flex gap-3
    overflow-hidden
    cursor-pointer
    rounded-md
    border
    border-[#00A97F]
    bg-transparent
    
    w-50
p-4
    text-[17px]
    font-light
    uppercase
    text-[#247342]
    transition-all
    duration-500
    z-[1]
    active:scale-[0.98]
    active:brightness-75
    hover:text-[rgb(1,2,1)]
 hover:font-serif
    before:content-['']
    before:absolute
    before:h-full
    before:w-full
    before:left-[-25%]
    before:top-[-50%]
    before:z-[-1]
    before:bg-[#5c449c]
    before:transition-all
    before:duration-500
    before:ease-out
    before:[transform:skew(90deg)_rotate(180deg)_translate(-50%,-50%)]

    after:content-['']
    after:absolute
    after:h-full
    after:w-full
    after:left-[25%]
    after:top-1/2
    after:z-[-1]
    after:bg-[#00A97F]
    after:transition-all
    after:duration-500
    after:ease-out
    after:[transform:skew(90deg)_translate(-50%,-50%)]

    hover:before:[transform:skew(45deg)_rotate(180deg)_translate(-50%,-50%)]
    hover:after:[transform:skew(45deg)_translate(-50%,-50%)]
  "
                >
                    <UserPlus size={20} />
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
                                                <td className="px-4 py-3 font-serif text-slate-100">
                                                    {employee.name}
                                                </td>
                                                <td className="px-4 py-3 text-blue-400 font-serif">
                                                    {employee.email}
                                                </td>
                                                <td className="px-4 py-3 font-serif text-slate-300">
                                                    {employee.role}
                                                </td>
                                                <td className="px-4 py-3 text-slate-300">
                                                    {employee.phoneNumber ||
                                                        '—'}
                                                </td>
                                                <td className="px-4 py-3">
                                                    {employee.status ? (
                                                        <span
                                                            className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-serif ${STATUS_STYLES[employee.status?.toLowerCase()] || 'bg-slate-700 text-slate-300'}`}
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
                            <span className="text-md  text-slate-400">
                                Showing{' '}
                                <strong className="text-slate-200">
                                    {totalEmployees === 0 ? 0 : start + 1}–
                                    {Math.min(end, totalEmployees)}
                                </strong>{' '}
                                of{' '}
                                <strong className="text-slate-200 font-serif">
                                    {totalEmployees}
                                </strong>{' '}
                                employees
                            </span>

                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                <span className="font-serif">
                                    Rows per page:
                                </span>
                                <select
                                    value={rowsPerPage}
                                    onChange={(e) => {
                                        setRowsPerPage(Number(e.target.value))
                                        setCurrentPage(0)
                                    }}
                                    className="bg-slate-800 border text-1xl  border-slate-600 hover:border-red-900 hover:text-sm     transition-all  ease-in-out delay-300   hover:text-red-400 hover:bg-red-100 text-black -200  rounded-lg p-3 w-20 outline-none cursor-pointer font-serif"
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
                                    className=" p-3  w-30 rounded-lg border border-slate-600  text-slate-300 text-xs font-serif disabled:opacity-30 hover:bg-white  transition-all  ease-in-out delay-500  hover:text-green-500 hover:border-green-600 disabled:bg-red-200 disabled:border-red-600 disabled:text-red-400 isabled:cursor-not-allowed cursor-pointer"
                                >
                                    ← Prev
                                </button>
                                <span className="text-md text-slate-400 font-serif">
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
                                    className=" p-3  w-30 rounded-lg border border-slate-600  text-slate-300 text-xs font-serif disabled:opacity-30 hover:bg-white hover:text-green-500 hover:border-green-600  disabled:bg-red-200 disabled:border-red-600 disabled:text-red-400 isabled:cursor-not-allowed transition-all cursor-pointer"
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
                                className="relative w-full max-w-120 bg-slate-800 border border-slate-600  border-2 rounded-2xl  max-h-[92vh] "
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
