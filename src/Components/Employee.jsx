import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  FiUser, FiMail, FiPhone,
  FiArrowRight, FiCheckCircle, FiAlertCircle, FiLoader
} from "react-icons/fi";

const Employee = ({ inModal = false, onSuccess = null }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");

  useEffect(() => {
    if (apiSuccess) {
      const timer = setTimeout(() => setApiSuccess(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [apiSuccess]);

  // create contact 
  const onSubmit = async (data) => {
    setLoading(true);
    setApiError("");
    setApiSuccess("");
    try {
      await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/employee`, {
        name: data.name,
        email: data.email,
        role: data.role,
        phoneNumber: data.phoneNumber,
        status: data.status,
      });
      setApiSuccess("Employee created successfully!");
      reset();
      if (onSuccess) onSuccess();
    } catch (error) {
      if (error.response) {
        setApiError(error.response.data.message || "Failed to create employee.");
      } else {
        setApiError("Server connection failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (hasError) =>
    `w-full bg-slate-50 border-2 ${hasError ? "border-rose-400" : "border-slate-200"} text-slate-900 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-blue-400 focus:bg-white transition-all font-semibold placeholder:text-slate-300`;

  const selectClass = (hasError) =>
    `w-full bg-slate-50 border-2 ${hasError ? "border-rose-400" : "border-slate-200"} text-slate-900 rounded-2xl py-4 pl-4 pr-4 focus:outline-none focus:border-blue-400 focus:bg-white transition-all font-semibold cursor-pointer`;

  return (

    <div
      className={
        inModal
          ? "w-full p-6 overflow-y-auto max-h-[85vh]"
          : "min-h-screen w-full flex items-start justify-center p-6 bg-slate-50 overflow-y-auto"
      }
    >
      <div className="w-full max-w-lg mx-auto">
        <div
          className="bg-white w-full rounded-2xl p-10 border border-slate-200"
          style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.10)" }}
        >
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-6">
              <FiUser size={32} />
            </div>
            <h1 className="text-3xl font-black text-slate-800 mb-3 tracking-tight">Add Employee</h1>
            <p className="text-slate-400 font-semibold">Fill in the details below.</p>
          </div>

          {apiSuccess && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm p-4 rounded-2xl mb-8 flex items-center gap-3">
              <FiCheckCircle className="shrink-0" />
              <p className="font-bold">{apiSuccess}</p>
            </div>
          )}

          {apiError && (
            <div className="bg-rose-50 border border-rose-200 text-rose-600 text-sm p-4 rounded-2xl mb-8 flex items-center gap-3">
              <FiAlertCircle className="shrink-0" />
              <p className="font-bold">{apiError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* {name } */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Name</label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Enter employee name"
                  className={inputClass(errors.name)}
                  {...register("name", { required: "Name is required" })}
                />
              </div>
              {errors.name && <p className="text-rose-500 text-xs font-bold ml-1">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  className={inputClass(errors.email)}
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email format" }
                  })}
                />
              </div>
              {errors.email && <p className="text-rose-500 text-xs font-bold ml-1">{errors.email.message}</p>}
            </div>

            {/* Role */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Role</label>
              <select
                className={selectClass(errors.role)}
                {...register("role", { required: "Role is required" })}
              >
                <option value="">Select a role</option>
                <option value="ADMIN">Admin</option>
                <option value="EMPLOYEE">Employee</option>
              </select>
              {errors.role && <p className="text-rose-500 text-xs font-bold ml-1">{errors.role.message}</p>}
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
              <div className="relative">
                <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="+91 9876543210"
                  className={inputClass(errors.phoneNumber)}
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                    minLength: { value: 10, message: "Phone number must be at least 10 digits" },
                    pattern: { value: /^\+?\d{10,}$/, message: "Invalid phone number format" }
                  })}
                />
              </div>
              {errors.phoneNumber && <p className="text-rose-500 text-xs font-bold ml-1">{errors.phoneNumber.message}</p>}
            </div>

            {/* Status */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Status</label>
              <select
                className={selectClass(errors.status)}
                {...register("status", { required: "Status is required" })}
              >
                <option value="">Select a status</option>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
              {errors.status && <p className="text-rose-500 text-xs font-bold ml-1">{errors.status.message}</p>}
            </div>

            {/* Buttons */}
            <div className="flex justify-between gap-4 mt-4">
              <button
                type="button"
                onClick={() => reset()}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black py-4 rounded-2xl transition-all active:scale-[0.98] text-base"
              >
                Cancel
              </button>

              <button
                disabled={loading}
                type="submit"
                className="flex-1 bg-slate-900 hover:bg-slate-700 text-white font-black py-4 rounded-2xl shadow-md transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-3 text-base"
              >
                {loading
                  ? <FiLoader className="animate-spin" />
                  : <><span>Create Employee</span><FiArrowRight /></>
                }
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Employee;