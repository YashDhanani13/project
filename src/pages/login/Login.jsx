import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from "react-router-dom";
import {
  Mail, Lock, ArrowRight, CheckCircle2, AlertCircle, Loader2, LogIn,
} from "lucide-react";
import api from "../../api/api";
import { AuthContext } from "../../Authcontext/AuthContext";

const loginValidationSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginValidationSchema),
  });

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    setApiError("");
    setApiSuccess("");

    try {
      const response = await api.post("/auth/login", data);
      console.log("Login response:", response.data); // Debug: see what the backend returns

      // Handle different response structures
      let token = response.data.token || response.data.accessToken || response.data.data;

      if (token) {
        login(token);
        setApiSuccess("Welcome back!");
        setTimeout(() => navigate("/"), 1500);
      } else {
        console.error("Token not found in response:", response.data);
        setApiError("No token received from server. Check console for details.");
      }
    } catch (error) {
      setApiError(error.response?.data?.message || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-linear-to-r from-blue-300 to-white pt-28">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-[2.5rem] p-10 shadow-3xl border-slate-100">

          {/* Header Section */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-6">
              <LogIn size={32} />
            </div>
            <h1 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Welcome Back</h1>
            <p className="text-slate-500 font-bold">Sign in to continue shopping.</p>
          </div>

          {/* Alert Messages */}
          {apiSuccess && (
            <div className="bg-emerald-50 border border-emerald-100 text-emerald-600 text-sm p-4 rounded-2xl mb-8 flex items-center gap-3">
              <CheckCircle2 size={18} />
              <p className="font-bold">{apiSuccess}</p>
            </div>
          )}

          {apiError && (
            <div className="bg-rose-50 border border-rose-100 text-rose-600 text-sm p-4 rounded-2xl mb-8 flex items-center gap-3">
              <AlertCircle size={18} />
              <p className="font-bold">{apiError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">


            {/* Email Field */}
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

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="password"
                  placeholder="Enter your password"
                  className={`w-full bg-slate-50 border-2 ${errors.password ? "border-rose-300" : "border-slate-50"} rounded-2xl py-4 pl-12 pr-12 focus:outline-none focus:border-blue-200 transition-all font-bold`}
                  {...register("password")}
                />
              </div>
              {errors.password && <p className="text-rose-500 text-xs font-bold ml-1">{errors.password.message}</p>}
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black py-5 rounded-2xl shadow-xl transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-3 text-lg"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <><span>Sign In</span><ArrowRight size={20} /></>}
            </button>
          </form>

          <p className="mt-10 text-center text-slate-500 font-bold">
            New here? <Link to="/signup" className="text-blue-600 hover:underline">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;