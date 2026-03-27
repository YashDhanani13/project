import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import api from "../lib/api";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle2, AlertCircle, Loader2, LogIn,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    setApiError("");
    setApiSuccess("");

    try {
      const response = await api.post(
        "/auth/login",
        {
          email: data.email,
          password: data.password,
        },
      );
      setApiSuccess("Welcome back!");

      if (response.data.token) {
        login(response.data.token);
      } else if (response.data.data?.token) {
        login(response.data.data.token);
      }

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      if (error.response) {
        setApiError(error.response.data.message || "Invalid credentials.");
      } else {
        setApiError("Server connection failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-gradient-to-r from-blue-300 to-white-200 pt-28">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-[2.5rem] focus:not-open:not-even: p-10 shadow-3xl shadow-slate-200 border-slate-100">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-6">
              <LogIn size={32} />
            </div>
            <h1 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-slate-500 font-bold">
              Sign in to continue shopping.
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
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="email"
                  placeholder="name@example.com"
                  className={`w-full bg-slate-50 border-2 ${errors.email ? "border-sky-100" : "border-slate-50"} text-slate-900 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-blue-200 focus:bg-white transition-all font-bold placeholder:text-slate-300`}
                  {...register("email", { required: "Email is required" })}
                />
              </div>
              {errors.email && (
                <p className="text-rose-500 text-xs font-bold ml-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  size="sm"
                  className="text-blue-600 text-xs font-black hover:underline uppercase tracking-tighter"
                >
                

                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`w-full bg-slate-50 border-2 ${errors.password ? "border-rose-100" : "border-slate-50"} text-slate-900 rounded-2xl py-4 pl-12 pr-12 focus:outline-none focus:border-blue-200 focus:bg-white transition-all font-bold placeholder:text-slate-300`}
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-rose-500 text-xs font-bold ml-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black py-5 rounded-2xl shadow-xl shadow-slate-200 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-3 text-lg mt-4"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <p className="mt-10 text-center text-slate-500 font-bold">
            New here?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
