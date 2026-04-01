import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

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

const Empvalidation = z.object({

  name: z
    .min("name is required"),

  email: z
    .min("email is   required ")
    .email("this si  required "),

  role: z
    .min("role is  required")
    .maxLength("minimum  100  age are  requied"),
  phoneNumber: z
    .minLength("10 digit is  required   "),
  statuus: z
    .min("status is   required"),
})






/* ── main component ──────────────────────────────────────────────────────── */
const Employee = ({ inModal = false, onSuccess = null, close }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
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
      await axios.post("http :localhost:3000/api/employee", {
        name: data.name,
        email: data.email,
        role: data.role,
        phoneNumber: data.phoneNumber,
        status: data.status,
      });
      setApiSuccess("Employee created successfully!");

    } catch (error) {
      setApiError(error.response?.data?.message || "Server connection failed.");
    } finally {
      setLoading(false);
    }
  };

  const inner = (
    <div
      className={
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
          <Label>Full Name</Label>
          <div className="relative">
            <User
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="e.g. Rohan Mehta"
              className={inputCls(errors.name)}
              {...register("name")}
            />
          </div>
          <FieldError message={errors.name?.message} />
        </div>

        {/* Email */}
        <div>
          <Label>Email Address</Label>
          <div className="relative">
            <Mail
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="email"
              placeholder="name@company.com"
              className={inputCls(errors.email)}
              {...register("email")}
            />
          </div>
          <FieldError message={errors.email?.message} />
        </div>

        {/* Role + Status — side by side */}
        <div className="grid grid-cols-2 gap-3">
          {/* Role */}
          <div>
            <Label>Role</Label>
            <div className="relative">
              <select
                className={selectCls(errors.role)}
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
            <FieldError message={errors.role?.message} />
          </div>

          {/* Status */}
          <div>
            <Label>Status</Label>
            <div className="relative">
              <select
                className={selectCls(errors.status)}
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
            <FieldError message={errors.status?.message} />
          </div>
        </div>

        {/* Phone */}
        <div>
          <Label>Phone Number</Label>
          <div className="relative">
            <Phone
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="+91 98765 43210"
              className={inputCls(errors.phoneNumber)}
              {...register("phoneNumber")}
            />
          </div>
          <FieldError message={errors.phoneNumber?.message} />
        </div>

        {/* Divider */}
        <div className="mt-6 border-t border-gray-100" />

        {/* Actions */}
        <div className="mt-5 flex gap-2.5">
          <button
            type="button"
            onClick={() => {
              reset();
              close?.();
            }}
            className="flex-1 rounded-lg border border-gray-200 bg-transparent py-2.5 text-sm font-semibold
                       text-gray-500 transition-all hover:border-gray-900 hover:bg-gray-50 hover:text-gray-900"
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
                Create <ArrowRight size={14} />
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
            <Employee
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

export default Employee;