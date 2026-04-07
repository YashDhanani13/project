import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import api from "../../api/api";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// validation

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
    .number({
      required_error: "Age is required",
    })
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
    .string()
    .trim()
    .max(255, "Address must be under 255 characters")
    .optional(),
});

const ContactForm = ({ close }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactValidation),
  });

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
      onSucess?.();
    } catch (err) {
      setApiError(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-6">

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 transition-all">

        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Add Contact
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your contacts easily
          </p>
        </div>

        {/* Alerts */}
        {apiSuccess && (
          <div className="bg-green-50 text-green-700 p-3 rounded-xl text-sm mb-4">
            {apiSuccess}
          </div>
        )}

        {apiError && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-4">
            {apiError}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Rohan Mehta"
              {...register("name")}
              className={`w-full mt-1 rounded-xl border px-4 py-3 text-sm outline-none transition 
              ${errors.name
                  ? "border-red-300 focus:ring-2 focus:ring-red-200"
                  : "border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-200"}`}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="name@mail.com"
              {...register("email")}
              className={`w-full mt-1 rounded-xl border px-4 py-3 text-sm outline-none transition 
              ${errors.email
                  ? "border-red-300 focus:ring-2 focus:ring-red-200"
                  : "border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-200"}`}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Age + Tag */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Age
              </label>
              <input
                type="number"
                placeholder="18"
                {...register("age", { valueAsNumber: true })}
                className="w-full mt-1 rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-200"
              />
              {errors.age && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.age.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Tag
              </label>
              <select
                {...register("tag")}
                className="w-full mt-1 rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-200"
              >
                <option value="">Select</option>
                <option value="VIP">VIP</option>
                <option value="VVIP">VVIP</option>
                <option value="regular">Regular</option>
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
            <label className="text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="text"
              placeholder="+91 9876543210"
              {...register("phoneNumber")}
              className="w-full mt-1 rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-200"
            />
            {errors.phoneNumber && (
              <p className="text-xs text-red-500 mt-1">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Address
            </label>
            <textarea
              rows={3}
              placeholder="City, State..."
              {...register("address")}
              className="w-full mt-1 rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-200"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-4">
            <button
              type="button"
              onClick={() => close?.()}
              className="flex-1 rounded-xl border border-gray-300 py-3 text-sm font-medium hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-xl bg-black text-white py-3 text-sm font-semibold hover:bg-gray-800 transition active:scale-[0.97]"
            >
              {loading ? "Loading..." : "Create Contact"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ContactForm;