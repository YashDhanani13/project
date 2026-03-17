import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  FiUser, FiMail, FiPhone,
  FiArrowRight, FiCheckCircle, FiAlertCircle, FiLoader
} from "react-icons/fi";

const Employee = ({ inModal = false, onSuccess = null, close }) => {
const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");

  useEffect(() => {
    if (!apiSuccess) return;
    const t = setTimeout(() => setApiSuccess(""), 3000);
    return () => clearTimeout(t);
  }, [apiSuccess]);

  const onSubmit = async (data) => {
    setLoading(true);
    setApiError("");
    setApiSuccess("");

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/employee`,
        { name: data.name, email: data.email, role: data.role, phoneNumber: data.phoneNumber, status: data.status }
      );
      setApiSuccess("Employee created successfully!");
      reset();

      onSuccess?.();

    } catch (error) {
      setApiError(error.response?.data?.message || "Server connection failed.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (hasError) =>
    `w-full border rounded-lg py-2.5 pl-10 pr-3 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all bg-white
     ${hasError
      ? "border-red-400 focus:ring-2 focus:ring-red-100"
      : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"}`;

  const selectClass = (hasError) =>
    `w-full border rounded-lg py-2.5 px-3 text-sm text-gray-800 outline-none transition-all bg-white appearance-none cursor-pointer
     ${hasError
      ? "border-red-400 focus:ring-2 focus:ring-red-100"
      : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"}`;

  return (
    <div className={inModal ? "p-6" : "min-h-screen bg-gray-50 flex items-start justify-center py-12 px-4"}>
      <div className={inModal ? "w-full" : "w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-200 p-8"}>

        {/* Header */}
        <div className="mb-6">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
            <FiUser className="text-blue-600" size={20} />
          </div>
          <h1 className="text-xl font-semibold text-gray-900">Add Employee</h1>
          <p className="text-sm text-gray-500 mt-1">Fill in the details to create a new employee.</p>
        </div>

        {/* Toasts */}
        {apiSuccess && (
          <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-3 mb-5">
            <FiCheckCircle size={15} className="shrink-0" /> {apiSuccess}
          </div>
        )}
        {apiError && (
          <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-5">
            <FiAlertCircle size={15} className="shrink-0" /> {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <input
                type="text"
                placeholder="Enter employee name"
                className={inputClass(errors.name)}
                {...register("name", { required: "Name is required" })}
              />
            </div>
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <input
                type="email"
                placeholder="name@example.com"
                className={inputClass(errors.email)}
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email format" },
                })}
              />
            </div>
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
          </div>

          {/* Role + Status side by side */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select className={selectClass(errors.role)} {...register("role", { required: "Role is required" })}>
                <option value="">Select role…</option>
                <option value="ADMIN">Admin</option>
                <option value="EMPLOYEE">Employee</option>
              </select>
              {errors.role && <p className="text-xs text-red-500 mt-1">{errors.role.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select className={selectClass(errors.status)} {...register("status", { required: "Status is required" })}>
                <option value="">Select status…</option>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
              {errors.status && <p className="text-xs text-red-500 mt-1">{errors.status.message}</p>}
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <div className="relative">
              <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <input
                type="text"
                placeholder="+91 98765 43210"
                className={inputClass(errors.phoneNumber)}
                {...register("phoneNumber", {
                  required: "Phone number is required",
                  pattern: { value: /^\+?\d{10,}$/, message: "Invalid phone number format" },
                })}
              />
            </div>
            {errors.phoneNumber && <p className="text-xs text-red-500 mt-1">{errors.phoneNumber.message}</p>}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">

            <button
            className="flex-1 border cursor-pointer border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-semibold py-3 rounded-xl transition-colors"
              type="button"  
              onClick={() => { 
                reset();
                setApiSuccess(""); 
                setApiError("");  
                close();
                  //  if (inModal && onSuccess) onSuccess();
              }}
             
            >
              Cancel
            </button>

           
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white  cursor-pointer text-sm font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              {loading
                ? <FiLoader size={16} className="animate-spin" />
                : <><span>Create Employee</span><FiArrowRight size={15} /></>
              }
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Employee;