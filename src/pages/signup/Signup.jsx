import { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import {
    Mail,
    Lock,
    ArrowRight,
    CheckCircle2,
    AlertCircle,
    Loader2,
    User,
    LogIn,
} from 'lucide-react'

import api from '../../api/api'
import { AuthContext } from '../../Authcontext/AuthContext'

const signValdate = z.object({
    fullName: z.string().min(1, 'Name is required'),
    email: z.string().min(1, 'Email is required').email('Invalid email format'),
    organizationName: z.string().min(1, 'Organization name is required'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .max(100, 'Password is too long'), // Added
})

const Signup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(signValdate),
    })

    const [loading, setLoading] = useState(false)
    const [apiError, setApiError] = useState('')
    const [apiSuccess, setApiSuccess] = useState('')
    const navigate = useNavigate()
    const { login } = useContext(AuthContext)

    const onSubmit = async (data) => {
        setLoading(true)
        setApiError('')
        setApiSuccess('')

        try {
            const response = await api.post('/auth/signup', {
                fullName: data.fullName,
                email: data.email,
                organizationName: data.organizationName,
                password: data.password,
            })

            const token = response.data.token
            if (token) {
                login(token)
                setApiSuccess('Account created successfully!')
                setTimeout(() => navigate('/'), 1500)
            } else {
                // setApiError("No token received from server");
            }
        } catch (error) {
            if (error.response) {
                setApiError(error.response.data.message || 'Signup failed')
            } else {
                setApiError('Server connection failed.')
            }
        } finally {
            setLoading(false)
            // redireact(navigate("/login"));
            // navigate('/login');
            window.location.href = '/login'
        }
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-linear-to-r from-orange-300 to-indigo-800 pt-7 ">
            <div className="w-full max-w-md">
                <div className="bg-slate-800 rounded-[2.5rem] p-8 shadow-3xl border-slate-100">
                    {/* Header Section */}
                    <div className="text-center  mb-10 flex justify-start">
                        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-slate-800 mx-10 ">
                            <User className="" size={32} />
                        </div>
                        <h1 className="text-3xl  font-black text-gray-400 ">
                            Signup
                        </h1>
                    </div>

                    <div className="flex justify-center">
                        <p className="text-slate-400  text-lg font-black">
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

                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* full name */}
                        <div className=" space-y-2">
                            <label
                                className="text-xs font-black text-mist-
              400 uppercase tracking-widest ml-1"
                            >
                                Full name
                            </label>
                            <div className="relative">
                                <User
                                    className="absolute left-4 top-1/3 .-translate-y-1/2 text-slate-500"
                                    size={20}
                                />
                                <input
                                    type="text"
                                    placeholder="Enter Your Full name"
                                    className={`w-full bg-slate-50 border-2 border border-gray-500  ${errors.password ? 'border-red-300' : 'border-gray-200'} rounded-2xl py-4 pl-12 pr-12 focus:outline-none focus:border-blue-200 transition-all font-bold`}
                                    {...register('fullName')}
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
                            <label className="text-xs font-black  text-mist-500 uppercase tracking-widest ml-1">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    size={20}
                                />
                                <input
                                    type="email"
                                    placeholder="name@example.com"
                                    className={`w-full bg-slate-50 border-2  border-gray-500 ${errors.password ? 'border-red-300' : 'border-gray-200'} rounded-2xl py-4 pl-12 pr-12 focus:outline-none focus:border-blue-200 transition-all font-bold`}
                                    {...register('email')}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-rose-500 text-xs font-bold ml-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* organization name */}
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                                Organization Name
                            </label>
                            <div className="relative">
                                <Mail
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    size={20}
                                />
                                <input
                                    type="text"
                                    placeholder="Enter your organization name "
                                    className={`w-full bg-slate-50 border-2  border-gray-500 ${errors.password ? 'border-red-300' : 'border-gray-200'} rounded-2xl py-4 pl-12 pr-12 focus:outline-none focus:border-blue-200 transition-all font-bold`}
                                    {...register('organizationName')}
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
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                                Password
                            </label>
                            <div className="relative">
                                <Lock
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    size={20}
                                />
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    className={`w-full bg-slate-50 border-2 border-gray-500 ${errors.password ? 'border-red-300' : 'border-gray-200'} rounded-2xl py-4 pl-12 pr-12 focus:outline-none focus:border-blue-200 transition-all font-bold`}
                                    {...register('password')}
                                />
                            </div>
                            {errors.password && (
                                <p className="text-rose-500 text-xs font-bold ml-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* button  */}
                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full bg-white text-blue-400 hover:bg-blue-600 hover:text-white   font-bold  rounded-lg  border border-slate-800  border-2    will-change-auto h-14 p-3  shadow-xl  transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-3 text-lg mt-4 hover:bg--800 cursor-pointer"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <>
                                    <span>Sign up</span>
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="mt-10 text-center text-md text-mist-700 font-bold">
                        Already a member?{' '}
                        <Link
                            to="/login"
                            className="text-blue-600 hover:underline"
                        >
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Signup
