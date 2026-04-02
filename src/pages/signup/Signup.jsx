import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from "react-router-dom";
import {
  Mail, Lock, ArrowRight, CheckCircle2, AlertCircle, Loader2, User,
} from "lucide-react";
import axios from "axios";

const signValdate = z.object({
  fullName :  z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  organizationName: z.string().min(1, "Organization name is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password is too long"), // Added 
});

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signValdate)
  });

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");


  const onSubmit = async (data) => {
    setLoading(true);
    setApiError("");
    setApiSuccess("");

    try {
      await axios.post("http://localhost:3000/auth/signup", {
        fullName: data.fullName,
        email: data.email,
        organizationName: data.organizationName,
        password: data.password,
      });

      setApiSuccess("Account created successfully!");

    } catch (error) {
      if (error.response) {
        setApiError(error.response.data.message || " ");
      } else {
        setApiError("Server connection failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-gradient-to-r from-slate-400 to-sky-950 pt-28">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-[2.5rem] p-6 shadow-lg shadow-gray-200 border border-gray-100">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Create Account
            </h1>
            <p className="text-slate-500 font-bold">
              Start your journey with us today.
            </p>
          </div>

          {apiSuccess && (
            <div className="bg-emerald-50 border border-emerald-100 text-emerald-600 text-sm p-4 rounded-2xl mb-8 flex items-center gap-3">
              <CheckCircle2 className="shrink-0" size={18} />
              <p className="font-bold">{apiSuccess}</p>
            </div>
          )}

          {apiError && (
            <div className="bg-rose-50 border border-rose-100 text-rose-600 text-sm p-4 rounded-2xl mb-8 flex items-center gap-3">
              <AlertCircle className="shrink-0" size={18} />
              <p className="font-bold">{apiError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* full name */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                Full name
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
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* email */}
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="email"
                  placeholder="name@example.com"
                  className={`w-full bg-slate-50 border-2 ${errors.email ? "border-rose-300" : "border-slate-50"} rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-blue-200 transition-all font-bold`}
                  {...register("email")}
                />
              </div>
              {errors.email && <p className="text-rose-500 text-xs font-bold ml-1">{errors.email.message}</p>}
            </div>


            {/* organization name */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                Organization Name
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Enter your organization name"
                  className={`w-full bg-slate-50 border-2 ${errors.organizationName ? "border-rose-100" : "border-slate-50"} text-slate-900 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-blue-200 focus:bg-white transition-all font-bold placeholder:text-slate-300`}
                  {...register("organizationName")}
                />
              </div>
              {errors.organizationName && (
                <p className="text-rose-500 text-xs font-bold ml-1">
                  {errors.organizationName.message}
                </p>
              )}
            </div>


            {/* password  */}
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="password"
                  className={`w-full bg-slate-50 border-2 ${errors.password ? "border-rose-300" : "border-slate-50"} rounded-2xl py-4 pl-12 pr-12 focus:outline-none focus:border-blue-200 transition-all font-bold`}
                  {...register("password")}
                />
              </div>
              {errors.password && <p className="text-rose-500 text-xs font-bold ml-1">{errors.password.message}</p>}
            </div>


            {/* button  */}
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black rounded-lg h-10 shadow-xl shadow-slate-200 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-3 text-lg mt-4"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <p className="mt-10 text-center text-slate-500 font-bold">
            Already a member?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;