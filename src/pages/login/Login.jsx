import React, { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import windows from '../../../public/windows.png'
import {
    Mail,
    Lock,
    ArrowRight,
    CheckCircle2,
    AlertCircle,
    Loader2,
    LogIn,
} from 'lucide-react'
import api from '../../api/api'
import { AuthContext } from '../../Authcontext/AuthContext'

const loginValidationSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email format'),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(8, 'Password must be at least 8 characters'),
})

const Login = () => {
    const navigate = useNavigate()
    const { login } = useContext(AuthContext)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginValidationSchema),
    })

    const [loading, setLoading] = useState(false)
    const [apiError, setApiError] = useState('')
    const [apiSuccess, setApiSuccess] = useState('')

    const onSubmit = async (data) => {
        setLoading(true)
        setApiError('')
        setApiSuccess('')

        try {
            const response = await api.post('/auth/login', data)
            // console.log("Login response:", response.data); // Debug: see what the backend returns

            // Handle different response structures
            const token =
                response.data.token ||
                response.data.accessToken ||
                response.data.data?.token ||
                response.data.data?.accessToken ||
                response.data.data

            if (typeof token === 'string' && token) {
                login(token)
                setApiSuccess('Welcome back!')
                setTimeout(() => navigate('/'), 1500)
            } else {
                console.error('Token not found in response:', response.data)
                // setApiError("No token received from server. Check console for details.");
            }
        } catch (error) {
            setApiError(error.response?.data?.message || 'Invalid credentials.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex  h-179">
            <img
                className="h-175 w-150    outline-none "
                src={windows}
                alt="imgage"
            />
            <div className=" w-full  bg-mist-400   flex items-center justify-center p-6 pt-15">
                <div className="w-full max-w-md">
                    <div className=" rounded-lg p-8 shadow-3xl border bg-linear-0 from-slate-900 to-mist-800 0 00 -900  border-slate-600">
                        {/* Header Section */}
                        <div className="text-center mb-">
                            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-4 cursor-pointer ">
                                <LogIn size={32} />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-400 mb-2 tracking-tight">
                                Welcome Back Class Mate
                            </h1>
                            <p className="text-slate-500 font-serif text-lg">
                                Sign in to continue shopping.
                            </p>
                        </div>

                        {/* Alert Messages */}
                        {apiSuccess && (
                            <div className="bg-emerald-50 border border-emerald-100 text-emerald-600 text-sm p-4 rounded-2xl mb-6 flex items-center gap-3">
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

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            {/* Email Field */}
                            <div className="space-y-2">
                                <label className="text-sm font-serif text-gray-400 uppercase tracking-widest ml-1">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail
                                        className="absolute left-4 text-gray-400 top-1/2 -translate-y-1/2 "
                                        size={20}
                                    />
                                    <input
                                        className={`w-full bg-slate-900 border-2 ${errors.email ? 'border-red-300' : 'border-slate-50'} border border-gray-500  font-serif rounded-2xl p-5 px-11  text-gray-300 outline-none caret-red-400 border  hover
                                        hover:border-red-400 transition-all font-bold`}
                                        type="email"
                                        placeholder="name@example.com"
                                        // autoComplete="email"
                                        {...register('email')}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-rose-500 text-xs font-bold ml-1">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <label className="text-xs font-serif text-gray-400 uppercase tracking-widest ml-1">
                                    Password
                                </label>
                                <div className="relative ">
                                    <Lock
                                        className="absolute left-4   text-slate-400 top-1/2 -translate-y-1/2 "
                                        size={20}
                                    />
                                    <input
                                        className={`w-full bg-slate-900 border-2 ${errors.email ? 'border-red-300' : 'border-slate-50'} border border-gray-500  font-serif rounded-2xl p-5 px-11  text-gray-400 outline-none caret-cyan-400 border  hover
                                      border-2   hover:border-cyan-400 transition-all font-bold`}
                                        type="password"
                                        placeholder="Enter your password"
                                        autoComplete="current-password"
                                        {...register('password')}
                                    />
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
                                className="w-95 bg-white -900 text-sans hover:bg-mist-500   text-bllack font-black py-5 border border-slate-900 hover:border-cyan-400 rounded-2xl shadow-xl disabled:opacity-70 flex items-center justify-center gap-3 cursor-pointer hover:text-serif transition-all delay-200  hover:w-96"
                            >
                                {loading ? (
                                    <Loader2
                                        className="animate-spin"
                                        size={20}
                                    />
                                ) : (
                                    <>
                                        <span className="text-sans  hover:text-serif ">
                                            Sign In
                                        </span>
                                        <ArrowRight size={20} />
                                    </>
                                )}
                            </button>
                        </form>

                        <p className="mt-10 text-center text-slate-400 font-serif">
                            New here?{' '}
                            <Link
                                to="/signup"
                                className="text-red-400  font-serif hover:underline"
                            >
                                Create Account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
