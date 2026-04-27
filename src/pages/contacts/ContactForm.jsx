import React, { useState } from "react";
import { useForm } from "react-hook-form";
import api from "../../api/api";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  ChevronDown,
  Loader2,
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Hash,
} from "lucide-react";

const contactValidation = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be under 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes"),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .toLowerCase()
    .min(1, "Email is required")
    .email("Invalid email address")
    .max(255, "Email must be under 255 characters"),
  age: z
    .number({ required_error: "Age is required" })
    .min(18, "Must be at least 18 years old")
    .max(120, "Age seems invalid"),
  tag: z
    .string({ required_error: "Tag is required" })
    .trim()
    .min(1, "Tag is required")
    .max(50, "Tag must be under 50 characters"),
  phoneNumber: z
    .string({ required_error: "Phone number is required" })
    .trim()
    .min(10, "Phone must be at least 10 digits")
    .max(15, "Phone number is too long")
    .regex(/^\+?[0-9\s\-().]+$/, "Invalid phone number format"),
  address: z
    .string({ required_error: "Address is required" })
    .trim()
    .min(10, "Address must be at least 10 characters")
    .max(255, "Address must be under 255 characters"),
});

const ContactForm = ({ inModal = false, onSuccess = null, close }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(contactValidation) });

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    setApiError("");
    setApiSuccess("");
    try {
      await api.post("/contacts", data);
      setApiSuccess("Contact added successfully!");
      setTimeout(() => {
        onSuccess?.();
        close?.();
      }, 1000);
    } catch (err) {
      setApiError(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-30 to-mist-700   border-black px-8 py-5 flex items-center justify-between border border-black ">
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">Add Contact</h1>
            <p className="text-blue-100 text-xs mt-0.5 opacity-80">Fill in the details below</p>
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
        <div className="px-8 py-7">

          {/* Success Alert */}
          {apiSuccess && (
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl px-4 py-3 text-sm mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              {apiSuccess}
            </div>
          )}

          {/* Error Alert */}
          {apiError && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 text-sm mb-5">
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
              <div className={`flex items-center gap-2.5 rounded-xl border bg-slate-900/60 px-3 py-2.5 transition-colors focus-within:ring-2 focus-within:ring-blue-500/40 ${errors.name ? "border-red-500/60 focus-within:border-red-500" : "border-slate-700 focus-within:border-blue-500/70 hover:border-slate-600"}`}>
                <User size={14} className={errors.name ? "text-red-400 shrink-0" : "text-slate-500 shrink-0"} />
                <input
                  type="text"
                  placeholder="Rohan Mehta"
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
              <div className={`flex items-center gap-2.5 rounded-xl border bg-slate-900/60 px-3 py-2.5 transition-colors focus-within:ring-2 focus-within:ring-blue-500/40 ${errors.email ? "border-red-500/60 focus-within:border-red-500" : "border-slate-700 focus-within:border-blue-500/70 hover:border-slate-600"}`}>
                <Mail size={14} className={errors.email ? "text-red-400 shrink-0" : "text-slate-500 shrink-0"} />
                <input
                  type="email"
                  placeholder="name@mail.com"
                  className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 outline-none"
                  {...register("email")}
                />
              </div>
              {errors.email?.message && (
                <p className="text-xs text-red-400">{errors.email.message}</p>
              )}
            </div>

            {/* Age + Tag */}
            <div className="grid grid-cols-2 gap-4">

              {/* Age */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Age
                </label>
                <div className={`flex items-center gap-2.5 rounded-xl border bg-slate-900/60 px-3 py-2.5 transition-colors focus-within:ring-2 focus-within:ring-blue-500/40 ${errors.age ? "border-red-500/60 focus-within:border-red-500" : "border-slate-700 focus-within:border-blue-500/70 hover:border-slate-600"}`}>
                  <Hash size={14} className={errors.age ? "text-red-400 shrink-0" : "text-slate-500 shrink-0"} />
                  <input
                    type="number"
                    placeholder="18"
                    className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 outline-none"
                    {...register("age", { valueAsNumber: true })}
                  />
                </div>
                {errors.age?.message && (
                  <p className="text-xs text-red-400">{errors.age.message}</p>
                )}
              </div>

              {/* Tag */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Tag
                </label>
                <div className={`relative flex items-center rounded-xl border bg-slate-900/60 px-3 py-2.5 transition-colors focus-within:ring-2 focus-within:ring-blue-500/40 ${errors.tag ? "border-red-500/60 focus-within:border-red-500" : "border-slate-700 focus-within:border-blue-500/70 hover:border-slate-600"}`}>
                  <select
                    className="w-full bg-transparent text-sm text-slate-100 outline-none appearance-none pr-5 cursor-pointer"
                    {...register("tag")}
                  >
                    <option value="" className="bg-slate-800">Select</option>
                    <option value="VIP" className="bg-slate-800">VIP</option>
                    <option value="VVIP" className="bg-slate-800">VVIP</option>
                    <option value="regular" className="bg-slate-800">Regular</option>
                  </select>
                  <ChevronDown size={13} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
                {errors.tag?.message && (
                  <p className="text-xs text-red-400">{errors.tag.message}</p>
                )}
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Phone Number
              </label>
              <div className={`flex items-center gap-2.5 rounded-xl border bg-slate-900/60 px-3 py-2.5 transition-colors focus-within:ring-2 focus-within:ring-blue-500/40 ${errors.phoneNumber ? "border-red-500/60 focus-within:border-red-500" : "border-slate-700 focus-within:border-blue-500/70 hover:border-slate-600"}`}>
                <Phone size={14} className={errors.phoneNumber ? "text-red-400 shrink-0" : "text-slate-500 shrink-0"} />
                <input
                  type="text"
                  placeholder="+91 9876543210"
                  className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 outline-none"
                  {...register("phoneNumber")}
                />
              </div>
              {errors.phoneNumber?.message && (
                <p className="text-xs text-red-400">{errors.phoneNumber.message}</p>
              )}
            </div>

            {/* Address */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Address
              </label>
              <div className={`flex items-start gap-2.5 rounded-xl border bg-slate-900/60 px-3 py-2.5 transition-colors focus-within:ring-2 focus-within:ring-blue-500/40 ${errors.address ? "border-red-500/60 focus-within:border-red-500" : "border-slate-700 focus-within:border-blue-500/70 hover:border-slate-600"}`}>
                <MapPin size={14} className={`mt-0.5 ${errors.address ? "text-red-400 shrink-0" : "text-slate-500 shrink-0"}`} />
                <textarea
                  rows={3}
                  placeholder="City, State..."
                  className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 outline-none resize-none"
                  {...register("address")}
                />
              </div>
              {errors.address?.message && (
                <p className="text-xs text-red-400">{errors.address.message}</p>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-slate-700" />

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => close?.()}
                className="flex items-center gap-3 px-4 py-2 bg-white- hover:bg-red-500  hover:text-white  border border-gray-500 hover:border-2  text-gray-300 rounded-lg w-42 h-12  text-sm font-semibold transition-all cursor-pointer"
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
                    Create Contact <ArrowRight size={14} />
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

export default ContactForm;