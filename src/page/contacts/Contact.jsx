import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  User,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import z, { email } from "zod";



const contactvalidation = z.object({
  name: z
    .min("name is required"),

  email: z
    .min("email is   required ")
    .email("@ this si  required "),

  age: z
    .min("18 is  required")
    .maxLength("minimum  100  age are  requied"),

  tag: z
    .min("tag is   required"),

  phoneNumber: z
    .minLength("10 digit is  required   ")
})

const Contact = ({ inModal = false, onSuccess = null, close }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodReslove(contactvalidation)
  });


  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    setApiError("");
    setApiSuccess("");

    try {
      await axios.post("http:localhost3000/api/contact", {
        name: data.name,
        email: data.email,
        age: data.age,
        tag: data.tag,
        phoneNumber: data.phoneNumber,
        address: data.address
      });

    } catch (err) {
      setApiError(err.response?.data?.message || "Server connection failed.");
    } finally {
      setLoading(false);
    }
  };


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
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
              name
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Enter Your Full name"
                className={`w-full bg-slate-50 border-2 ${errors.fullName ? "border-rose-100" : "border-slate-50"} text-slate-900 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-blue-200 focus:bg-white transition-all font-bold placeholder:text-slate-300`}
                {...register("fullName")
                }
              />
            </div>
            {errors.fullName && (
              <p className="text-rose-500 text-xs font-bold ml-1">
                {errors.ame.message}
              </p>
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
                {...register("email")}
              />
            </div>

            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>


          <div className="grid grid-cols-2 gap-3">
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
                {...register("age")}
              />
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
                {...register("phoneNumber")}
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

                {...register("address")}
              />
            </div>
            {errors.address && (
              <p className="text-xs text-red-500 mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

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
