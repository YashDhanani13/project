import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import api from "../../api/api";
import {
  User,
  Mail,
  Phone,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ChevronDown,
} from "lucide-react";

import EmpSidebar from "./EmpSidebar";
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod';

const Empvalidation = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  role: z.string().min(1, "Role is required"),
  phoneNumber: z.string().min(10, "Phone must be at least 10 digits"),
  status: z.string().min(1, "Status is required"),
});


/* ── main component ──────────────────────────────────────────────────────── */
const EmployeeForm = ({ inModal = false, onSuccess = null, close }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },

  } = useForm({
    resolver: zodResolver
      (Empvalidation)
  });

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");

  const [open, setOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const fetchEmployees = () => { };
  const handleEmployeeAdded = () => fetchEmployees();

  const onSubmit = async (data) => {
    setLoading(true);
    setApiError("");
    setApiSuccess("");
    try {
      await api.post("/employee", {
        name: data.name,
        email: data.email,
        role: data.role,
        phoneNumber: data.phoneNumber,
        status: data.status,
      });
      setApiSuccess("Employee created successfully!");
      if (onSuccess) onSuccess();
      if (inModal && close) close();
    } catch (error) {
      setApiError(error.response?.data?.message || "Server connection failed.");
    } finally {
      setLoading(false);
    }
  };

  const inner = (
    <div className={
      inModal
        ? "w-full"
        : "w-full max-w-[460px] rounded-2xl border border-gray-200 bg-white p-10 shadow-sm"
    }
    >
      {/* ── Header ── */}
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-900">
        <User size={18} color="#fff" />
      </div>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight text-gray-900">
        Add Employee
      </h1>
      <p className="mb-7 mt-1 text-sm text-gray-400">
        Fill in the details to create a new team member.
      </p>

      {/* ── Alerts ── */}
      {apiSuccess && (
        <div className="mb-5 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          <CheckCircle2 size={15} className="shrink-0" />
          {apiSuccess}
        </div>
      )}
      {apiError && (
        <div className="mb-5 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          <AlertCircle size={15} className="shrink-0" />
          {apiError}
        </div>
      )}

      {/* ── Form ── */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Name */}
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-gray-700">Full Name</label>
          <div className="relative">
            <User
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="e.g. Rohan Mehta"
              className={`w-full border-2 rounded-xl py-2.5 pl-10 pr-4 text-sm font-medium outline-none transition-all ${errors.name ? "border-red-300 focus:border-red-400" : "border-gray-100 focus:border-gray-900"}`}
              {...register("name")}
            />
          </div>
          {errors.name?.message && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-gray-700">Email Address</label>
          <div className="relative">
            <Mail
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="email"
              placeholder="name@company.com"
              className={`w-full border-2 rounded-xl py-2.5 pl-10 pr-4 text-sm font-medium outline-none transitio-all ${errors.email ? "border-nred-300 focus:border-red-400" : "border-gray-100 focus:border-gray-900"}`}
              {...register("email")}
            />
          </div>
          {errors.email?.message && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>

        {/* Role + Status — side by side */}
        <div className="grid grid-cols-2 gap-3">
          {/* Role */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">Role</label>
            <div className="relative">
              <select
                className={`w-full border-2 rounded-xl py-2.5 pl-4 pr-10 text-sm font-medium outline-none transition-all appearance-none bg-white ${errors.role ? "border-red-300 focus:border-red-400" : "border-gray-100 focus:border-gray-900"}`}
                {...register("role", { required: "Role is required" })}
              >
                <option value="">Select role</option>
                <option value="ADMIN">Admin</option>
                <option value="EMPLOYEE">Employee</option>
              </select>
              <ChevronDown
                size={13}
                className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
            {errors.role?.message && <p className="mt-1 text-xs text-red-500">{errors.role.message}</p>}
          </div>

          {/* Status */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">Status</label>
            <div className="relative">
              <select
                className={`w-full border-2 rounded-xl py-2.5 pl-4 pr-10 text-sm font-medium outline-none transition-all appearance-none bg-white ${errors.status ? "border-red-300 focus:border-red-400" : "border-gray-100 focus:border-gray-900"}`}
                {...register("status")}
              >
                <option value="">Select status</option>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
              <ChevronDown
                size={13}
                className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
            {errors.status?.message && <p className="mt-1 text-xs text-red-500">{errors.status.message}</p>}
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-gray-700">Phone Number</label>
          <div className="relative">
            <Phone
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="+91 98765 43210"
              className={`w-full border-2 rounded-xl py-2.5 pl-10 pr-4 text-sm font-medium outline-none transition-all ${errors.phoneNumber ? "border-red-300 focus:border-red-400" : "border-gray-100 focus:border-gray-900"}`}
              {...register("phoneNumber")}
            />
          </div>
          {errors.phoneNumber?.message && <p className="mt-1 text-xs text-red-500">{errors.phoneNumber.message}</p>}
        </div>

        {/* Divider */}
        <div className="mt-6 border-t border-gray-100" />

        {/* Actions */}
        <div className="mt-5 flex gap-2.5">
          <button
            type="button"
            onClick={() => {

              close?.();
            }}
           className="flex items-center gap-3 px-4 py-2 bg-white- hover:bg-red-500  hover:text-white  hover:border-2  text-black rounded-lg w-45 h-12 border border-gray-400  text-sm font-semibold transition-all"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-gray-900 py-2.5
                       text-sm font-semibold text-white transition-all hover:opacity-90
                       active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
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
  );

  return inModal ? (
    <div className="w-full">{inner}</div>
  ) : (
    <div className="flex min-h-screen items-start justify-center bg-gray-50 px-4 py-12">
      {inner}

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <EmployeeForm
              onSuccess={handleEmployeeAdded}
              close={() => setOpen(false)}
              inModal
            />
          </div>
        </div>
      )}

      <EmpSidebar
        selectedEmployee={selectedEmployee}
        setSelectedemployee={setSelectedEmployee}
        fetchEmployeee={fetchEmployees}
      />
    </div>
  );
};

export default EmployeeForm;
