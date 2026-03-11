import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FiUser, FiMail, FiPhone, FiMapPin, FiArrowRight, FiCheckCircle, FiAlertCircle, FiLoader } from "react-icons/fi";



const Contact = ({ onSuccess = null }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();


  //all state  here define 
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");

  useEffect(() => {
    if (apiSuccess) {
      const timer = setTimeout(() => setApiSuccess(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [apiSuccess]);

  const onSubmit = async (data) => {
    setLoading(true);
    setApiError("");
    setApiSuccess("");

    try {

      // create  contact here  

      
      await axios.post(
        `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/contacts`,
        {
          name: data.name,
          email: data.email,
          age: Number(data.age),
          phoneNumber: data.phoneNumber,
          address: data.address,
          tag: data.tag,
        }
      );

      setApiSuccess("Contact created successfully!");
      reset();


      if (onSuccess) onSuccess();

    } catch (error) {
      if (error.response) {
        setApiError(error.response.data.message || "Failed to create contact.");
      } else {
        setApiError("Server connection failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 pt-28">
      <div className="w-120">
        <div className="bg-gray-500 rounded-[2.5rem] p-10 shadow-lg shadow-stone-200 border border-slate-100">

          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-6">
              <FiUser size={32} />
            </div>
            <h1 className="text-3xl font-black text-zinc-600 mb-3 tracking-tight">Add Contact</h1>
            <p className="text-black font-extrabold">Fill in the details below.</p>
          </div>

          {apiSuccess && (
            <div className="bg-emerald-50 border border-emerald-100 text-emerald-600 text-sm p-4 rounded-2xl mb-8 flex items-center gap-3">
              <FiCheckCircle className="shrink-0" />
              <p className="font-bold">{apiSuccess}</p>
            </div>
          )}

          {apiError && (
            <div className="bg-rose-50 border border-rose-100 text-rose-600 text-sm p-4 rounded-2xl mb-8 flex items-center gap-3">
              <FiAlertCircle className="shrink-0" />
              <p className="font-bold">{apiError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* name*/}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Name</label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Your full name"
                  className={`w-full bg-slate-50 border-2 ${errors.name ? "border-rose-400" : "border-slate-50"} text-slate-900 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-blue-200 focus:bg-white transition-all font-bold placeholder:text-slate-300`}
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
                  className={`w-full bg-slate-50 border-2 ${errors.email ? "border-rose-400" : "border-slate-50"} text-slate-900 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-blue-200 focus:bg-white transition-all font-bold placeholder:text-slate-300`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email format" }
                  })}
                />
              </div>
              {errors.email && <p className="text-rose-500 text-xs font-bold ml-1">{errors.email.message}</p>}
            </div>

            {/* Age  */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Age</label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="number"
                  placeholder="Your age"
                  className={`w-full bg-slate-50 border-2 ${errors.age ? "border-rose-400" : "border-slate-50"} text-slate-900 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-blue-200 focus:bg-white transition-all font-bold placeholder:text-slate-300`}
                  {...register("age", {
                    required: "Age is required",
                    min: { value: 18, message: "Age must be at least 18" },
                    max: { value: 100, message: "Age must be less than 100" },
                  })}
                />
              </div>
              {errors.age && <p className="text-rose-500 text-xs font-bold ml-1">{errors.age.message}</p>}
            </div>

            {/* phone number */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
              <div className="relative">
                <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="+91 9876543210"
                  className={`w-full bg-slate-50 border-2 ${errors.phoneNumber ? "border-rose-400" : "border-slate-50"} text-slate-900 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-blue-200 focus:bg-white transition-all font-bold placeholder:text-slate-300`}
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                    minLength: { value: 10, message: "Phone number must be at least 10 digits" },
                    pattern: { value: /^\+?\d{10,}$/, message: "Invalid phone number format" }
                  })}
                />
              </div>
              {errors.phoneNumber && <p className="text-rose-500 text-xs font-bold ml-1">{errors.phoneNumber.message}</p>}
            </div>

            {/* address heree */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Address</label>
              <div className="relative">
                <FiMapPin className="absolute left-4 top-4 text-slate-400" />
                <textarea
                  placeholder="Your full address"
                  rows={3}
                  className={`w-full bg-slate-50 border-2 ${errors.address ? "border-rose-400" : "border-slate-50"} text-slate-900 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-blue-200 focus:bg-white transition-all font-bold placeholder:text-slate-300 resize-none`}
                  {...register("address", {
                    required: "Address is required",
                    minLength: { value: 10, message: "Address must be at least 10 characters" }
                  })}
                />
              </div>
              {errors.address && <p className="text-rose-500 text-xs font-bold ml-1">{errors.address.message}</p>}
            </div>

            {/* Tag section */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Tag</label>
              <select
                className={`w-full bg-slate-50 border-2 ${errors.tag ? "border-rose-400" : "border-slate-50"} text-slate-900 rounded-2xl py-4 pl-4 pr-4 focus:outline-none focus:border-blue-200 focus:bg-white transition-all font-bold`}
                {...register("tag", { required: "Tag is required" })}
              >
                <option value="">Select a tag</option>
                <option value="VIP">VIP</option>
                <option value="VVIP">VVIP</option>
                <option value="regular">Regular</option>
              </select>
              {errors.tag && <p className="text-rose-500 text-xs font-bold ml-1">{errors.tag.message}</p>}
            </div>
            {/* button */}
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black py-5 rounded-2xl shadow-sm transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-3 text-lg mt-4"
            >
              {loading
                ? <FiLoader className="animate-spin" />
                : <><span>Save Contact</span><FiArrowRight /></>
              }
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;