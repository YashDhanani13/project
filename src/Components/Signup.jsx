import React, { useState } from "react";
import { useForm } from "react-hook-form"; // form hook
import axios from "axios"; // api calling
import { Link, useNavigate } from "react-router-dom"; // react-router-dom
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiCheckCircle,
  FiAlertCircle,
  FiLoader,
  FiUserPlus,
} from "react-icons/fi"; // react-iconn

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  //state cvreate heree : -
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const password = watch("password");
  const onSubmit = async (data) => {
    setLoading(true);
    setApiError("");
    setApiSuccess("");

    try {
      await axios.post("http://localhost:3000/api/auth/signup", {
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmpassword,
      });

      setApiSuccess("Account created successfully!");
      reset();
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      if (error.response) {
        setApiError(error.response.data.message || "Signup failed.");
      } else {
        setApiError("Server connection failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6  bg-linear-to-r from-slate-400 to-sky-950  pt-28">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-[2.5rem] p-10 shadow-lg shadow-gray-200 border border-gray-100">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-6">
              <FiUserPlus size={32} />
            </div>
            <h1 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">
              Create Account
            </h1>
            <p className="text-slate-500 font-bold">
              Start your journey with us today.
            </p>
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
            {/* email filed  */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  className={`w-full bg-slate-50 border-2 ${errors.email ? "border-rose-100" : "border-slate-50"} text-slate-900 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-blue-200 focus:bg-white transition-all font-bold placeholder:text-slate-300`}
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
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 8 characters"
                  className={`w-full bg-slate-50 border-2 ${errors.password ? "border-rose-100" : "border-slate-50"} text-slate-900 rounded-2xl py-4 pl-12 pr-12 focus:outline-none focus:border-blue-200 focus:bg-white transition-all font-bold placeholder:text-slate-300`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 8, message: "Min 8 characters" },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-rose-500 text-xs font-bold ml-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            {/* confirm password filed  */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                Confirm Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Repeat your password"
                  className={`w-full bg-slate-50 border-2 ${errors.confirmpassword ? "border-rose-100" : "border-slate-50"} text-slate-900 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-blue-200 focus:bg-white transition-all font-bold placeholder:text-slate-300`}
                  {...register("confirmpassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match", // ✅ match check
                  })}
                />
              </div>
              {errors.confirmpassword && (
                <p className="text-rose-500 text-xs font-bold ml-1">
                  {errors.confirmpassword.message}
                </p>
              )}
            </div>
            {/* sing up button  */}
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black py-5 rounded-2xl shadow-xl shadow-slate-200 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-3 text-lg mt-4"
            >
              {loading ? (
                <FiLoader className="animate-spin" />
              ) : (
                <>
                  <span>Create Account</span>
                  <FiArrowRight />
                </>
              )}
            </button>
          </form>

          <p className="mt-10 text-center text-slate-500 font-bold">
            Already a member?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
