import { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../api/api'
import { AuthContext } from '../../Authcontext/AuthContext'
import pop from '../../../public/pop.jpeg'
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



// validaitno for   signup 
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
    // const navigate = useNavigate()
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
        <div className="flex  h-172">
            <img
                className="h-178  w-150    outline-none "
                src={pop}
                alt="imgage"
            />
            <div className=" h-145 w-full    flex items-center justify-center m-15">
                <div className="w-full max-w-110">
                    <div className=" rounded-lg p-8 h-165 shadow-3xl  bg-linear-0 from-slate-900 to-mist-800   border-yellow-600">
                        {/* Header Section */}
                        <div className="text-center mb-4">
                            <div className="w-16  h-16  bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mx-auto  cursor-pointer ">
                                <User className="" size={32} />
                            </div>
                            <h1 className="text-2xl  font-black text-gray-400">
                                Signup
                            </h1>

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
                            <div className=" ">
                                <label className="text-sm font-serif  text-gray-300 uppercase tracking-widest ml-1">
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
                                        className={`w-full bg-slate-900 border-2 ${errors.email ? 'border-red-300' : 'border-slate-50'} border border-gray-500  font-serif rounded-2xl p-5 px-11  text-gray-400 outline-none caret-blue-600 border  hover
                                                                border-2   hover:border-blue-600 transition-all font-bold`}
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

                            {/* organization name */}
                            <div className="space-y-2">
                                <label className="text-xs font-serif text-slate-400 uppercase tracking-widest ml-1">
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
                                        className={`w-full bg-slate-900 border-2 ${errors.email ? 'border-red-300' : 'border-slate-50'} border border-gray-500  font-serif rounded-2xl p-5 px-11  text-gray-400 outline-none caret-cyan-400 border  hover
                                                                border-2   hover:border-cyan-400 transition-all font-bold`}
                                        {...register('organizationName')}
                                    />
                                </div>
                                {errors.organizationName && (
                                    <p className="text-rose-500 text-xs font-bold ml-1">
                                        {errors.organizationName.message}
                                    </p>
                                )}
                            </div>

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
                                        className={`w-full bg-slate-900 border-2 ${errors.email ? 'border-red-300' : 'border-slate-50'} border border-gray-500  font-serif rounded-2xl p-5 px-11  text-gray-400 outline-none caret-yellow-300 border  hover
                                                                border-2   hover:border-yellow-300 transition-all font-bold`}
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

                            {/* button  */}
                            <button
                                disabled={loading}
                                type="submit"
                                className="w-full bg-white text-blue-400 hover:text-white   font-bold  rounded-lg  border border-gray-600  border-2    will-change-auto h-14   shadow-xl  disabled:opacity-70 flex items-center justify-center gap-3 hover:border-black border-2 text-lg mt-3 hover:bg-violet-800 cursor-pointer transform-border  from-gray-500  hover:font-serif transition-all delay-200 ease-in-to-lime-300 hover:w-96 `"
                            >










                                {loading ? (
                                    <Loader2
                                        className="animate-spin"
                                        size={20}
                                    />
                                ) : (
                                    <>
                                        <span>Sign up</span>
                                        <ArrowRight size={20} />
                                    </>
                                )}
                            </button>
                        </form>

                        <p className="mt-4 text-center text-md text-slate-400 font-serif">
                            Already a member?{' '}
                            <Link
                                to="/login"
                                className="text-red-400  font-serif hover:underline"
                            >
                                Log In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
