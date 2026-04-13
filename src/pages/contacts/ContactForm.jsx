import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import api from "../../api/api";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ReactCountryFlag from "react-country-flag";


//zod validation  :- 

const contactValidation = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be under 100 characters")
    .regex(
      /^[a-zA-Z\s'-]+$/,
      "Name can only contain letters, spaces, hyphens, and apostrophes",
    ),

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
    .string({ required_error: "Phone number is required" })
    .trim()
    .min(10, "Address must be at least 10 characters")
    .max(255, "Address must be under 255 characters"),
});

const ContactForm = ({ close }) => {
 // Add "watch" to your useForm hook
const {
  register,
  handleSubmit,
  watch, // Add this
  formState: { errors },
} = useForm({
  resolver: zodResolver(contactValidation),
  defaultValues: { countryCode: "IN" } // Set a default like India
});

const selectedCountry = watch("countryCode"); // This tracks the selection
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
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-gray-200 flex items-center justify-center p-0.5 ">
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 transition-all">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Add Contact</h1>
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

          {/* Country Selector */}
          <div>
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              Country
              {selectedCountry && (
                <ReactCountryFlag
                  countryCode={selectedCountry}
                  svg
                  style={{ width: '1.2em', height: '1.2em' }}
                />
              )}
            </label>
            <select
              {...register("countryCode")}
              className="w-full mt-1 rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-200"
            >
              <option value="IN">India (+91)</option>
              <option value="US">USA (+1)</option>
              <option value="GB">UK (+44)</option>
              <option value="AE">UAE (+971)</option>
              <option value="CA">Canada (+1)</option>
            </select>
            {errors.countryCode && (
              <p className="text-xs text-red-500 mt-1">{errors.countryCode.message}</p>
            )}
          </div>

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
                  : "border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-200"
                }`}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="name@mail.com"
              {...register("email")}
              className={`w-full mt-1 rounded-xl border px-4 py-3 text-sm outline-none transition 
              ${errors.email
                  ? "border-red-300 focus:ring-2 focus:ring-red-200"
                  : "border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-200"
                }`}
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
              <label className="text-sm font-medium text-gray-700">Age</label>
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
              <label className="text-sm font-medium text-gray-700">Tag</label>
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
            <label className="text-sm font-medium text-gray-700">Phone</label>
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
            <label className="text-sm font-medium text-gray-700">Address</label>
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
              className="flex items-center gap-3 px-4 py-2 bg-white hover:bg-red-500  hover:text-white  hover:border-2  text-black rounded-lg w-43 h-12 border border-gray-400 cursor-pointer text-sm font-semibold transition-all"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-black hover:text-white hover:border-gray-500  hover:border-2  text-blue-500 rounded-lg w-38 h-12 border cursor-pointer border-blue-400  text-sm font-semibold transition-all"
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
