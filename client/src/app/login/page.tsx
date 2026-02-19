'use client';

import { useState } from 'react';
import { MdVisibility, MdVisibilityOff, MdCheck } from 'react-icons/md';
import Logo from '@/components/Logo';
import { login } from '@/utils/api';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = await login(email, password);
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data));
            window.location.href = '/';
        } catch (error) {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="bg-background-light text-slate-900 font-display min-h-screen flex items-center justify-center p-4">
            {/* Main Container */}
            <div className="w-full max-w-5xl h-auto md:h-[650px] bg-white rounded-xl shadow-2xl flex overflow-hidden border border-gray-100">
                {/* Left Side: Image/Branding */}
                <div className="hidden md:flex md:w-1/2 bg-primary relative flex-col justify-between p-8 text-white">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?q=80&w=2664&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary/90"></div>

                    <div className="relative z-10">
                        <Logo size="md" className="mb-6" iconClassName="text-white" textClassName="text-white" />
                        <h1 className="text-3xl font-bold leading-tight mb-3">Streamline Your Print Operations</h1>
                        <p className="text-white/80 text-base">Manage inventory, track orders, and optimize your workflow all in one place.</p>
                    </div>

                    <div className="relative z-10 flex gap-4 text-sm text-white/60">
                        <a className="hover:text-white transition-colors" href="#">Terms</a>
                        <a className="hover:text-white transition-colors" href="#">Privacy</a>
                        <a className="hover:text-white transition-colors" href="#">Help</a>
                    </div>
                </div>

                {/* Right Side: Login Form */}
                <div className="w-full md:w-1/2 flex flex-col justify-center p-6 md:p-12 lg:p-16 bg-white">
                    <div className="max-w-[420px] w-full mx-auto">
                        {/* Header */}
                        <div className="text-center md:text-left mb-8">
                            <h1 className="text-slate-900 tracking-tight text-[28px] font-bold leading-tight pb-2">Welcome back</h1>
                            <p className="text-slate-500 text-sm font-normal leading-normal">Please enter your details to sign in.</p>
                        </div>

                        {/* Form */}
                        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                            {/* Email Field */}
                            <div className="flex flex-col gap-2">
                                <label className="text-slate-900 text-sm font-medium leading-normal">Username or Email</label>
                                <div className="relative">
                                    <input
                                        className="form-input flex w-full rounded-lg text-slate-900 focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-slate-200 h-10 placeholder:text-slate-400 px-4 text-sm font-normal leading-normal transition-all"
                                        placeholder="name@printshop.com"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="flex flex-col gap-2">
                                <label className="text-slate-900 text-sm font-medium leading-normal">Password</label>
                                <div className="flex w-full items-stretch rounded-lg relative">
                                    <input
                                        className="form-input flex w-full rounded-lg text-slate-900 focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-slate-200 h-10 placeholder:text-slate-400 pl-4 pr-12 text-sm font-normal leading-normal transition-all"
                                        placeholder="Enter your password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        className="absolute right-0 top-0 h-full px-4 text-slate-400 hover:text-slate-900 flex items-center justify-center transition-colors"
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <MdVisibilityOff className="text-[20px]" />
                                        ) : (
                                            <MdVisibility className="text-[20px]" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Remember & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative flex items-center">
                                        <input
                                            className="peer h-5 w-5 rounded border-slate-200 border-2 bg-transparent text-primary checked:bg-primary checked:border-primary focus:ring-0 focus:ring-offset-0 transition-all cursor-pointer"
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                        />
                                        <MdCheck className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none text-[16px] left-[2px] top-[2px]" />
                                    </div>
                                    <p className="text-slate-900 text-sm font-normal leading-normal select-none group-hover:text-primary transition-colors">Remember me</p>
                                </label>
                                <a className="text-primary hover:text-primary/80 text-sm font-medium transition-colors" href="#">Forgot password?</a>
                            </div>

                            {/* Login Button */}
                            <button
                                className="w-full bg-primary hover:bg-blue-700 text-white font-semibold h-10 rounded-lg transition-all shadow-md hover:shadow-lg focus:ring-4 focus:ring-primary/20 active:scale-[0.98] mt-1"
                                type="submit"
                            >
                                Sign In
                            </button>

                            {/* Divider */}
                            <div className="relative flex py-2 items-center">
                                <div className="flex-grow border-t border-gray-200"></div>
                                <span className="flex-shrink-0 mx-4 text-gray-400 text-xs uppercase">Or continue with</span>
                                <div className="flex-grow border-t border-gray-200"></div>
                            </div>

                            {/* Social Login */}
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    className="flex items-center justify-center gap-2 h-10 border border-slate-200 rounded-lg hover:bg-gray-50 transition-colors"
                                    type="button"
                                >
                                    <img
                                        alt="Google Logo"
                                        className="w-5 h-5"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0f675w2rF0kTwZpXiJQrp4rc8p93S-ss2AtW8XWUcJvhD9DyaP8lqWAIOviZE0MK1D3aH0Wf6axDUAkj20MJJFBnW3CKDc2xK8mKLMeQgdG2r8PXUQxtLlMS7B-NQObuCtDauBaj-Cq74C_sGckJGAepLsCkQAs8pRy6QDgGfK4UmOgDwFWoEp4UlTif78u3dIZpGArWjO6TnpdVNt2ZC-WXQjHO7XDq7qINMwMWwd_W92164Oh2xInCs8shMnT4ByxYntWU7CYE"
                                    />
                                    <span className="text-sm font-medium text-slate-900">Google</span>
                                </button>
                                <button
                                    className="flex items-center justify-center gap-2 h-10 border border-slate-200 rounded-lg hover:bg-gray-50 transition-colors"
                                    type="button"
                                >
                                    <img
                                        alt="Microsoft Logo"
                                        className="w-5 h-5"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDWg098pv3dSc1BpUhCsfhS_lURdYsNpBFD7Bd4m8ZwSbSxXJ_KF-7IUbAXGFWJ_UnyB5yKuzZrHYkDYc-RUoLe8LQT2R6bTVGG4CMb9lb9xbvCQ28KR_VVrGtbv1ofoF_ZO-FeRSu3dRHAfGlykZnW37vTSwrjL8SrfYjkRhijrfguVwrezR98d1kTwQHbmw4lmsWdPGD-9h8uucKQg3NIuBBxKRuLNYYaAqMROQpLh0HuOwGhWfbL1uAvPQXDSOI23sqn0lfG4w"
                                    />
                                    <span className="text-sm font-medium text-slate-900">Microsoft</span>
                                </button>
                            </div>

                            {/* Sign Up Link */}
                            <div className="text-center mt-4">
                                <p className="text-slate-500 text-sm">
                                    Don't have an account?{' '}
                                    <a className="text-primary font-medium hover:underline" href="#">Contact Admin</a>
                                </p>
                            </div>
                        </form>
                    </div>

                    {/* Mobile Footer */}
                    <div className="mt-auto pt-8 md:hidden text-center text-xs text-slate-400">
                        © 2023 Sayan Digital
                    </div>
                </div>
            </div>
        </div>
    );
}
