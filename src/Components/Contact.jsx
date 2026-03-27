import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import api from "../lib/api";

import {
  User,
  Mail,
  Phone,
  MapPin,
  Tag,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

const Contact = ({ inModal = false, onSuccess = null, close })  => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
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

      await api.post("/contacts", {
        name: data.name,
        email: data.email,
        age: data.age,
        tag: data.tag,
        phoneNumber: data.phoneNumber,
        address: data.address
      });

      setApiSuccess("Contact saved successfully!");
      reset();
      setTimeout(() => {
        onSuccess?.();
        close?.();
      }, 1500);
      // onSuccess?.();
    } catch (err) {
      setApiError(err.response?.data?.message || "Server connection failed.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (hasError) =>
    `w-full rounded-xl py-3 pl-10 pr-4 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all
     ${hasError
      ? "bg-red-50 border border-red-300 focus:ring-2 focus:ring-red-100"
      : "bg-[#EEF2FF] border border-transparent focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:bg-white"
    }`;

  const selectClass = (hasError) =>
    `w-full rounded-xl py-3 px-3 text-sm text-gray-800 outline-none transition-all appearance-none cursor-pointer
     ${hasError
      ? "bg-red-50 border border-red-300 focus:ring-2 focus:ring-red-100"
      : "bg-[#EEF2FF] border border-transparent focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:bg-white"
    }`;

  return (
    <div
      className={
        inModal
          ? "p-6"
          : "min-h-screen bg-gray-100 flex items-start justify-center py-12 px-4"
      }
    >
      <div
        className={
          inModal
            ? "w-full"
            : "w-full max-w-md bg-white rounded-2xl shadow-md p-8"
        }
      >
        {/* Header */}
        <div className="mb-6">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
            <User className="text-blue-500" size={22} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Add Contact
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Fill in the details to save a new contact.
          </p>
        </div>

        {/* Toasts */}
        {apiSuccess && (
          <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-5">
            <CheckCircle2 size={15} className="shrink-0" /> {apiSuccess}
          </div>
        )}
        {apiError && (
          <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5">
            <AlertCircle size={15} className="shrink-0" /> {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Name
            </label>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={14}
              />
              <input
                type="text"
                placeholder="Enter full name"
                className={inputClass(errors.name)}
                {...register("name", { required: "Name is required" ,
                  allowed:"string"
                })}
              />
            </div>
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={14}
              />
              <input
                type="email"
                placeholder="name@example.com"
                className={inputClass(errors.email)}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Invalid email format",
                  },
                })}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Age  ,   Phone side by side */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Age
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={14}
                />
                <input
                  type="number"
                  placeholder="e.g. 18"
                  className={inputClass(errors.age)}
                  {...register("age", {
                    required: "Required",
                    min: { value: 18, message: "Min 18" },
                    max: { value: 100, message: "Max 100" },
                  })}
                />
              </div>
              {errors.age && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.age.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Tag
              </label>
              <select
                className={selectClass(errors.tag)}
                {...register("tag", { required: "Tag is required" })}
              >
                <option value="">Select tag…</option>
                <option value="VIP">VIP</option>
                <option value="VVIP">VVIP</option>
                <option value="regular"> Regular</option>
              </select>
              {errors.tag && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.tag.message}
                </p>
              )}
            </div>
          </div>

          {/* Phone */}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Phone Number
            </label>
            <div className="relative">
              <Phone
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={14}
              />
              <input
                type="text"
                placeholder="+91 98765 43210"
                className={inputClass(errors.phoneNumber)}
                {...register("phoneNumber", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^\+?\d{10,}$/,
                    message: "Invalid phone number format",
                  },
                })}
              />
            </div>
            {errors.phoneNumber && (
              <p className="text-xs text-red-500 mt-1">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Address
            </label>
            <div className="relative">
              <MapPin
                className="absolute left-3 top-3 text-gray-400"
                size={14}
              />
              <textarea
                rows={3}
                placeholder="Street, City, State, PIN"
                className={`${inputClass(errors.address)} pl-10 resize-none`}
                {...register("address", {
                  required: "Address is required",
                  minLength: {
                    value: 10,
                    message: "At least 10 characters",
                  },
                })}
              />
            </div>
            {errors.address && (
              <p className="text-xs text-red-500 mt-1">
                {errors.address.message}
              </p>
            )}
          </div>
          {/* -------------------------------------*/}

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              className="w-50 cursor-pointer  hover:bg-black rounded-lg  hover:text-white"
              type="button"
              onClick={() => {
                reset();
                setApiSuccess("");
                setApiError("");
                if (inModal && onSuccess) onSuccess();
                close();
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-black hover:text-white  disabled:opacity-60 disabled:cursor-not-allowed  text-white text-sm cursor-pointer font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <>
                  <span>Save Contact</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
