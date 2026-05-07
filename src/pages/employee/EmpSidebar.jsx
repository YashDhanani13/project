import React, { useState, useEffect } from 'react'
import { Save, Pencil, Trash2, X } from 'lucide-react'
import api from '../../api/api'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const Empvalidation2 = z.object({
    name: z
        .string({ required_error: 'Name is required' })
        .trim()
        .min(1, 'Name is required')
        .max(100, 'Name must be under 100 characters')
        .regex(
            /^[a-zA-Z\s'-]+$/,
            'Name can only contain letters, spaces, hyphens, and apostrophes'
        ),
    email: z
        .string({ required_error: 'Email is required' })
        .trim()
        .toLowerCase()
        .min(1, 'Email is required')
        .email('Invalid email address')
        .max(255, 'Email must be under 255 characters'),
    role: z.string().min(1, 'Role is required'),
    phoneNumber: z
        .string({ required_error: 'Phone number is required' })
        .trim()
        .min(10, 'Phone must be at least 10 digits')
        .max(11, 'Phone number is too long')
        .regex(/^\+?[0-9\s\-().]+$/, 'Invalid phone number format'),
    status: z.string().min(1, 'Status is required'),
})

const EmpSidebar = ({
    selectedEmployee,
    setSelectedEmployee,
    fetchEmployees,
}) => {
    const [error, setError] = useState('')
    const [isEditing, setIsEditing] = useState(false)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(Empvalidation2),
    })

    // 🔥 Fill form when sidebar opens
    useEffect(() => {
        if (selectedEmployee) {
            reset({
                name: selectedEmployee.name,
                email: selectedEmployee.email,
                phoneNumber: selectedEmployee.phoneNumber,
                role: selectedEmployee.role,
                status: selectedEmployee.status,
            })
        }
    }, [selectedEmployee, reset])

    if (!selectedEmployee) return null

    const onSubmit = async (data) => {
        try {
            const updatedEmployee = {
                name: selectedEmployee.name,
                email: selectedEmployee.email,
                phoneNumber: selectedEmployee.phoneNumber,
                role: selectedEmployee.role,
                status: selectedEmployee.status,
            }

            await api.put(`/employee/${selectedEmployee.id}`, updatedEmployee)
            setIsEditing(false)
            setSelectedEmployee(null)
            fetchEmployees()
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update')
        }
    }

    // const handleEdit = () => {
    //   setIsEditing(true);
    // };

    const handleDelete = async () => {
        try {
            await api.delete(`/employee/${selectedEmployee.id}`)
            setSelectedEmployee(null)
            fetchEmployees()
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete')
        }
    }

    const closePanel = () => {
        setSelectedEmployee(null)
        setIsEditing(false)
    }

    return (
        <div>
            <div
                onClick={closePanel}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />

            <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-gradient-to-br from-slate-800  shadow-2xl z-50 p-6 overflow-y-auto transition-transform duration-300">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-extralight text-slate-500">
                        {isEditing ? 'Edit Employee' : 'Employee Details : '}
                        <p className="text-2xl text-white font-bold">
                            {selectedEmployee.name}
                        </p>
                    </h2>
                    <button
                        onClick={() => {
                            setSelectedEmployee(null)
                            setIsEditing(false)
                        }}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold"
                    >
                        <X size={16} />
                    </button>
                </div>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                {isEditing ? (
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <div
                            className="bg-slate-800 border border-slate-700 
                   rounded-lg p-3 hover:bg-slate-700 transition"
                        >
                            <p className="text-xs text-gray-500 uppercase">
                                Name{' '}
                            </p>
                            <input
                                className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 outline-none"
                                {...register('name')}
                                placeholder="Name"
                            />
                            {errors.name && (
                                <p className="text-red-500">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        <div
                            className="bg-slate-800 border border-slate-700 
                   rounded-lg p-3 hover:bg-slate-700 transition"
                        >
                            <p className="text-xs text-gray-500 uppercase">
                                Email
                            </p>
                            <input
                                className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 outline-none"
                                {...register('email')}
                                placeholder="Email"
                            />
                            {errors.email && (
                                <p className="text-red-500">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div
                            className="bg-slate-800 border border-slate-700 
                   rounded-lg p-3 hover:bg-slate-700 transition"
                        >
                            <p className="text-xs text-gray-500 uppercase">
                                Role
                            </p>
                            <input
                                className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 outline-none"
                                {...register('role')}
                                placeholder="Role"
                            />
                            {errors.age && (
                                <p className="text-red-500">
                                    {errors.role.message}
                                </p>
                            )}
                        </div>

                        <div
                            className="bg-slate-800 border border-slate-700 
                   rounded-lg p-3 hover:bg-slate-700 transition"
                        >
                            <p className="text-xs text-gray-500 uppercase">
                                Phone Number{' '}
                            </p>
                            <input
                                className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 outline-none"
                                {...register('phoneNumber')}
                                placeholder="PhoneNumber"
                            />
                            {errors.phoneNumber && (
                                <p className="text-red-500">
                                    {errors.phoneNumber.message}
                                </p>
                            )}
                        </div>

                        <div
                            className="bg-slate-800 border border-slate-700 
                   rounded-lg p-3 hover:bg-slate-700 transition"
                        >
                            <p className="text-xs text-gray-500 uppercase">
                                Status{' '}
                            </p>
                            <input
                                className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 outline-none"
                                {...register('status')}
                                placeholder="Status"
                            />
                            {errors.address && (
                                <p className="text-red-500">
                                    {errors.status.message}
                                </p>
                            )}
                        </div>

                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="flex items-center justify-center gap-2 p-2 bg-white rounded-lg text-blue-400 w-40 border border-blue-400 cursor-pointer hover:bg-black hover:text-white hover:border-orange-400"
                            >
                                <Save size={16} /> Save
                            </button>

                            <button
                                className="flex items-center gap-3 px-4 py-2 bg-white hover:bg-red-600  hover:text-white  hover:border-2  text-red-600  rounded-lg w-42 h-12 border border-red-600  hover:border-gray-400  text-sm font-semibold transition-all cursor-pointer"
                                type="button"
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className=" grid grid-rows-5 gap-y-3.5  ">
                        <div
                            className="bg-slate-800 border border-slate-700 
            rounded-lg p-3 hover:bg-slate-700 transition"
                        >
                            <p className="text-xs text-gray-500 uppercase">
                                Name
                            </p>{' '}
                            <p className="text-white font-medium">
                                {selectedEmployee.name}
                            </p>
                        </div>

                        <div
                            className="bg-slate-800 border border-slate-700 
            rounded-lg p-3 hover:bg-slate-700 transition"
                        >
                            <p className="text-xs text-gray-500 uppercase">
                                Email
                            </p>
                            <p className="text-white font-medium">
                                {selectedEmployee.email}
                            </p>
                        </div>

                        <div
                            className="bg-slate-800 border border-slate-700 
            rounded-lg p-3 hover:bg-slate-700 transition"
                        >
                            <p className="text-xs text-gray-500 uppercase">
                                Role
                            </p>
                            <p className="text-white font-medium">
                                {selectedEmployee.role}
                            </p>
                        </div>
                        <div
                            className="bg-slate-800 border border-slate-700 
            rounded-lg p-3 hover:bg-slate-700 transition"
                        >
                            <p className="text-xs text-slate-400 uppercase">
                                Phone
                            </p>
                            <p className="text-white font-medium">
                                {selectedEmployee.phoneNumber}
                            </p>
                        </div>

                        <div
                            className="bg-slate-800 border border-slate-700 
            rounded-lg p-3 hover:bg-slate-700 transition"
                        >
                            <p className="text-xs text-gray-500 uppercase">
                                Status
                            </p>{' '}
                            <span
                                className={`inline-block mt-1 px-3 py-1 text-xs font-semibold rounded-full ${selectedEmployee.status === 'ACTIVE'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-red-100 text-red-700'
                                    }`}
                            >
                                {selectedEmployee.status}
                            </span>
                        </div>

                        <div className="flex gap-2">
                            <button
                                className="flex-1 flex items-center justify-center gap-2 
                         py-2 rounded-lg bg-blue-600 hover:bg-blue-700 
                         text-white transition cursor-pointer"
                                onClick={() => setIsEditing(true)}
                            >
                                <Pencil /> Edit
                            </button>

                            <button
                                className="flex-1 flex items-center justify-center gap-2 
                         py-2 rounded-lg bg-red-600 hover:bg-red-700 
                         text-white transition  cursor-pointer"
                                onClick={handleDelete}
                            >
                                <Trash2 /> Delete
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default EmpSidebar
