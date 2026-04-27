import { useState } from "react";
import { useForm } from "react-hook-form";
import api from "../../api/api";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  User,
  Mail,
  Phone,
  ArrowRight,
  ChevronDown,
  Loader2,
  X,
} from "lucide-react";

const Empvalidation = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  role: z.string().min(1, "Role is required"),
  phoneNumber: z.string().min(10, "Phone must be at least 10 digits"),
  status: z.string().min(1, "Status is required"),
});

const EmployeeForm = ({ inModal = false, onSuccess = null, close }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(Empvalidation) });

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    setApiError("");
    setApiSuccess("");
    try {
      await api.post("/employee", data);
      setApiSuccess("Employee created successfully!");
      setTimeout(() => {
        onSuccess?.();
        close?.();
      }, 1000);
    } catch (error) {
      setApiError(error.response?.data?.message || "Server connection failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-30 to-mist-700   border-black px-8 py-4 flex items-center justify-between border border-black ">
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">Add Employee</h1>
            <p className="text-orange-100 text-xs mt-0.5 opacity-80">Fill in the details below</p>
          </div>
          <button
            type="button"
            onClick={() => close?.()}
            className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>

        {/* Body */}
        <div className="px-8 py-7 space-y-5">

          {/* Success Alert */}
          {apiSuccess && (
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl px-4 py-3 text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              {apiSuccess}
            </div>
          )}

          {/* Error Alert */}
          {apiError && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Full Name
              </label>
              <div className={`flex items-center gap-2.5 rounded-xl border bg-slate-900/60 px-3 py-2.5 transition-colors focus-within:ring-2 focus-within:ring-orange-500/40 ${errors.name ? "border-red-500/60 focus-within:border-red-500" : "border-slate-700 focus-within:border-orange-500/70 hover:border-slate-600"}`}>
                <User size={14} className={errors.name ? "text-red-400 shrink-0" : "text-slate-500 shrink-0"} />
                <input
                  type="text"
                  placeholder="e.g. Rohan Mehta"
                  className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 outline-none"
                  {...register("name")}
                />
              </div>
              {errors.name?.message && (
                <p className="text-xs text-red-400">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Email Address
              </label>
              <div className={`flex items-center gap-2.5 rounded-xl border bg-slate-900/60 px-3 py-2.5 transition-colors focus-within:ring-2 focus-within:ring-orange-500/40 ${errors.email ? "border-red-500/60 focus-within:border-red-500" : "border-slate-700 focus-within:border-orange-500/70 hover:border-slate-600"}`}>
                <Mail size={14} className={errors.email ? "text-red-400 shrink-0" : "text-slate-500 shrink-0"} />
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 outline-none"
                  {...register("email")}
                />
              </div>
              {errors.email?.message && (
                <p className="text-xs text-red-400">{errors.email.message}</p>
              )}
            </div>

            {/* Role + Status */}
            <div className="grid grid-cols-2 gap-4">

              {/* Role */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Role
                </label>
                <div className={`relative flex items-center rounded-xl border bg-slate-900/60 px-3 py-2.5 transition-colors focus-within:ring-2 focus-within:ring-orange-500/40 ${errors.role ? "border-red-500/60 focus-within:border-red-500" : "border-slate-700 focus-within:border-orange-500/70 hover:border-slate-600"}`}>
                  <select
                    className="w-full bg-transparent text-sm text-slate-100 outline-none appearance-none pr-5 cursor-pointer"
                    {...register("role")}
                  >
                    <option value="" className="bg-slate-800">Select role</option>
                    <option value="ADMIN" className="bg-slate-800">Admin</option>
                    <option value="EMPLOYEE" className="bg-slate-800">Employee</option>
                  </select>
                  <ChevronDown size={13} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
                {errors.role?.message && (
                  <p className="text-xs text-red-400">{errors.role.message}</p>
                )}
              </div>

              {/* Status */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Status
                </label>
                <div className={`relative flex items-center rounded-xl border bg-slate-900/60 px-3 py-2.5 transition-colors focus-within:ring-2 focus-within:ring-orange-500/40 ${errors.status ? "border-red-500/60 focus-within:border-red-500" : "border-slate-700 focus-within:border-orange-500/70 hover:border-slate-600"}`}>
                  <select
                    className="w-full bg-transparent text-sm text-slate-100 outline-none appearance-none pr-5 cursor-pointer"
                    {...register("status")}
                  >
                    <option value="" className="bg-slate-800">Select status</option>
                    <option value="ACTIVE" className="bg-slate-800">Active</option>
                    <option value="INACTIVE" className="bg-slate-800">Inactive</option>
                  </select>
                  <ChevronDown size={13} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
                {errors.status?.message && (
                  <p className="text-xs text-red-400">{errors.status.message}</p>
                )}
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Phone Number
              </label>
              <div className={`flex items-center gap-2.5 rounded-xl border bg-slate-900/60 px-3 py-2.5 transition-colors focus-within:ring-2 focus-within:ring-orange-500/40 ${errors.phoneNumber ? "border-red-500/60 focus-within:border-red-500" : "border-slate-700 focus-within:border-orange-500/70 hover:border-slate-600"}`}>
                <Phone size={14} className={errors.phoneNumber ? "text-red-400 shrink-0" : "text-slate-500 shrink-0"} />
                <input
                  type="text"
                  placeholder="+91 98765 43210"
                  className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 outline-none"
                  {...register("phoneNumber")}
                />
              </div>
              {errors.phoneNumber?.message && (
                <p className="text-xs text-red-400">{errors.phoneNumber.message}</p>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-slate-700" />

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => close?.()}
                   className="flex items-center gap-3 px-4 py-2 bg-white- hover:bg-red-500  hover:text-white  hover:border-2  text-black rounded-lg w-38 h-12 border border-gray-400  text-sm font-semibold transition-all cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-white  text-black border border-black border-2 hover:bg-black hover:text-white hover:border-indigo-500 hover:border-2  rounded-lg w-42 h-12  text-sm font-semibold  cursor-pointer transition-all" 
              >
                {loading ? (
                  <Loader2 size={15} className="animate-spin" />
                ) : (
                  <>
                    Create Employee <ArrowRight size={14} />
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;