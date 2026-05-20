import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
    Mail,
    User,
    Edit2,
    Check,
    X,
    Camera,
    Loader2,
    ShieldCheck,
    LogOut,
} from 'lucide-react'

import api from '../../api/api'
import ProfileSkeleton from '../../components/ProfileSkeleton'

import multer from 'multer'

interface ProfileForm {
    fullName: string
    email: string
}

const UserProfile = () => {
    const [isEditing, setIsEditing] = useState(false)
    const [loading, setLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('')
    // const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isDirty },
    } = useForm<ProfileForm>({
        defaultValues: {
            fullName: '',
            email: '',
        },
    })

    // =========================
    // Reusable Tailwind Styles
    // =========================

    const inputWrapper =
        'relative rounded-2xl border border-slate-700 bg-slate-900/70 hover:border-red-400 transition-all duration-300'

    const fullNameValue = watch('fullName')

    const initials = fullNameValue
        ? fullNameValue
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()
              .slice(0, 2)
        : 'U'

    // =========================
    // Fetch Profile
    // =========================

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get('/auth/getUserProfile')

                const { fullName, email } = res.data.data

                reset({
                    fullName,
                    email,
                })
            } catch (err) {
                setError('Failed to load profile')
            } finally {
                setLoading(false)
            }
        }

        fetchProfile()
    }, [reset])

    // =========================
    // Update Profile
    // =========================

    const onSubmit = async (data: ProfileForm) => {
        setIsSubmitting(true)

        try {
            await api.put('/auth/updateUserProfile', {
                fullName: data.fullName,
                email: data.email,
            })

            setIsEditing(false)
        } catch (err) {
            console.log(err)
        } finally {
            setIsSubmitting(false)
        }
    }
    if (loading) return <ProfileSkeleton />

    if (error) {
        return (
            <p className="mt-10 text-center text-red-500 font-medium">
                {error}
            </p>
        )
    }

    return (
        <div className="relative h-160 overflow-hidden rounded-2xl  bg-slate-900 px-6  p-4 mb-3">
            <div className="relative mx-auto max-w-4xl">
                {/* Header */}
                <div className="space-y-1 m-2">
                    <h1 className="text-4xl font-serif tracking-tight text-white">
                        Account Settings
                    </h1>

                    <p className="text-md  text-slate-500 font-serif">
                        Manage your profile and preferences
                    </p>
                </div>

                {/* Profile Card */}
                <div className="rounded-3xl border border-white/5   overflow-hidden">
                    {/* Top Section */}
                    <div className="flex flex-col justify-between gap-6 border border-gray-600 bg-slate-900  rounded-t-3xl     p-6 lg:flex-row lg:items-center">
                        {/* Left Side */}
                        <div className="flex items-center gap-5">
                            {/* Avatar */}
                            <div className="relative group">
                                <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-3xl border-4 border-slate-700   transition-all duration-300 group-hover:scale-105">
                                </div>

                                {/* Upload Button */}
                                <label className="absolute -bottom-2 -right-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-2xl bg-cyan-500  hover:bg-cyan-400">
                                    <Camera size={18} className="text-white" />

                                    <input type="file" className="hidden" />
                                </label>
                            </div>

                            {/* User Info */}
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold p-1 text-white ">
                                    {fullNameValue || 'Your Name'}
                                </h2>

                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 "></div>

                                    <span className="text-sm text-red-300 border p-2 rounded-full w-20   border-red-200 flex  justify-center ">
                                    {/* {fullName} */} HI 👋
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3">
                            {!isEditing ? (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center gap-2  font-serif p-3 h-14   w-45  rounded-md  bg-slate-800 border border-gray-600  hover:bg-black  text-white   hover:text-white   cursor-pointer"
                                >
                                    <Edit2 size={18} />
                                    Edit Profile
                                </button>
                            ) : (
                                <>
                                    <button
                                        onClick={() => {
                                            setIsEditing(false)
                                            reset()
                                        }}
                                        className="flex items-center gap-2 font-serif p-4 w-42 px-7  rounded-md  border border-slate-700 hover:text-white hover:border-white text-gray-400 hover:bg-red-600  cursor-pointer"
                                    >
                                        <X size={20} />
                                        Cancel
                                    </button>

                                    <button
                                        onClick={handleSubmit(onSubmit)}
                                        disabled={!isDirty || isSubmitting}
                                        className="flex items-center gap-2  font-serif px-6 py-3 w-45  rounded-md  bg-slate-800  border border-gray-600 hover:bg-black  text-gray-400    hover:text-white   cursor-pointer"
                                    >
                                        {isSubmitting ? (
                                            <Loader2
                                                size={18}
                                                className="animate-spin"
                                            />
                                        ) : (
                                            <Check size={18} />
                                        )}
                                        Save Changes
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Form Section */}
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6 p-8"
                    >
                        {/* Title */}
                        <div className="flex  items-center gap-2">
                            <ShieldCheck size={20} className="text-teal-200" />

                            <h3 className="text-sm font-serif uppercase tracking-[3px] text-lime-700 ">
                                Personal Information
                            </h3>
                        </div>

                        {/* Full Name */}
                        <div className="space-y-2">
                            <label className="text-xs font-serif   hover:border-teal-400 transition-all duration-300   uppercase  text-slate-500">
                                Full Name
                            </label>

                            <div
                                className={`${inputWrapper} ${
                                    errors.fullName ? 'border-red-500' : ''
                                }`}
                            >
                                <User
                                    size={20}
                                    className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500"
                                />

                                <input
                                    type="text"
                                    disabled={!isEditing}
                                    placeholder="Enter your full name"
                                    className="w-full bg-transparent font-serif  py-4 pl-14 pr-4 text-white outline-none placeholder:text-slate-500 disabled:text-slate-500"
                                    {...register('fullName', {
                                        required: 'Full name is required',
                                    })}
                                />
                            </div>

                            {errors.fullName && (
                                <p className="text-xs text-red-400">
                                    {errors.fullName.message}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-[2px] text-slate-500">
                                Email Address
                            </label>

                            <div
                                className={`${inputWrapper} ${
                                    errors.email ? 'border-red-500' : ''
                                }`}
                            >
                                <Mail
                                    size={20}
                                    className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-500"
                                />

                                <input
                                    type="email"
                                    disabled={!isEditing}
                                    placeholder="Enter your email"
                                    className="w-full  font-serif  hover:border-teal-400 transition-all duration-300 py-4 pl-14 pr-4 text-white outline-none  disabled:text-slate-500 "
                                    {...register('email', {
                                        required: 'Email is required',

                                        pattern: {
                                            value: /^\S+@\S+\.\S+$/,
                                            message: 'Invalid email address',
                                        },
                                    })}
                                />
                            </div>

                            {errors.email && (
                                <p className="text-xs font-serif text-red-500">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Footer Hint */}
                        {!isEditing && (
                            <p className="pt-2 text-xs font-serif  text-slate-600">
                                Click "Edit Profile" to update your information
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UserProfile
