import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Mail, User, Edit2, Check, X } from "lucide-react";
import api from "../../api/api";

interface ProfileForm {
  fullName: string;
  email: string;
}

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileForm>({
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  // ─── GET profile ──────────
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/auth/getUserProfile");
        const { fullName, email } = res.data.data;
        reset({ fullName, email });
      } catch (err) {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ─── UPDATE profile ────────────────────
  const onSubmit = async (data: ProfileForm) => {
    try {
      await api.put("auth/updateUserProfile", {
        fullName: data.fullName,
        email :data.email
      });

      console.log("Profile updated");
      setIsEditing(false);
    } catch (err) {
      console.error("Update failed ", err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className=" rounded-lg bg-orange-50 h-130 p-4 " >
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <p className="text-1-xl text-gray-500 font-semibold  mt-1">
            Manage your personal information
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm  h-90  p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Profile Information
              </h2>
              <p className="text-1-xl  font-semibold  text-gray-400">
                Update your personal details
              </p>
            </div>

            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:border-orange-400 hover:text-orange-500 hover:bg-orange-50 transition-all"
              >
                <Edit2 size={14} /> Edit
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-100 transition-all"
                >
                  <X size={14} /> Cancel
                </button>
                <button
                  onClick={handleSubmit(onSubmit)}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-semibold transition-all"
                >
                  <Check size={14} /> Save Changes
                </button>
              </div>
            )}
          </div>
            
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-black uppercase tracking-widest">
                Full Name
              </label>
              <div className="relative">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  disabled={!isEditing}
                  placeholder="Enter your full name"
                  className={`w-full border-2 rounded-xl py-3 pl-11 pr-4 text-sm font-semibold outline-none transition-all
                    ${
                      !isEditing
                        ? "bg-gray-50 border-gray-100 text-blue-300 cursor-not-allowed"
                        : errors.fullName
                          ? "bg-white border-red-300 text-gray-900"
                          : "bg-white border-gray-200 focus:border-orange-400 text-gray-900"
                    }`}
                  {...register("fullName", {
                    required: "Full name is required",
                  })}
                />
              </div>
              {errors.fullName && (
                <p className="text-red-500 text-xs font-semibold ml-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="email"
                  disabled={!isEditing}
                  placeholder="name@example.com"
                  className={`w-full border-2 rounded-xl py-3 pl-11 pr-4 text-sm font-semibold outline-none transition-all
                    ${
                      !isEditing
                        ? "bg-gray-50 border-gray-100 text-blue-300 cursor-not-allowed"
                        : errors.email
                          ? "bg-white border-red-300 text-gray-900"
                          : "bg-white border-gray-200 focus:border-orange-400 text-gray-900"
                    }`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Invalid email",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs font-semibold ml-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
