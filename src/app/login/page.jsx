'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setshowPassword] = useState(false);

    const [errorMsg, setErrorMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { setUser } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setIsLoading(true);

        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                { email, password },
                { withCredentials: true }
            );

            // mark authenticated locally so closing/reopening the tab retains UI state
            try { localStorage.setItem('isAuthenticated', 'true'); } catch (e) { }
            // store user object locally for optimistic restore
            try { if (response.data?.user) localStorage.setItem('user', JSON.stringify(response.data.user)); } catch (e) { }
            // optimistically set user in context if server returned user info
            if (response.data?.user) setUser(response.data.user);

            router.push("/dashboard");
        } catch (error) {
            setErrorMsg(
                error.response?.data?.message || "Credential not valid or server went wrong!"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-mood-bg p-4 md:p-6">
            <div className="w-full max-w-5xl bg-white rounded-4xl shadow-sm flex overflow-hidden min-h-150 border border-neutral-border/50">
                {/* Kolom Kiri: Form Login (Sekarang di urutan pertama) */}
                <div className="w-full md:w-1/2 p-8 md:p-14 flex flex-col justify-center">
                    <h1 className="text-3xl font-bold text-text-dark mb-2">Login</h1>
                    <p className="text-text-muted mb-8">Sign in to access your journal.</p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        {/* Input Email */}
                        <div>
                            <label className="block text-sm font-medium text-text-dark mb-2">Email</label>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        {/* Input Password */}
                        <div>
                            <label className="block text-sm font-medium text-text-dark mb-2">Password</label>
                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setshowPassword(!showPassword)}
                                    className="absolute right-4 top-3.5 text-text-muted hover:text-sage-dark transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>
                        {/* Remember Me & Lupa Password */}
                        <div className="flex items-center justify-between mt-2">
                            <label className="flex items-center gap-2 text-sm text-text-muted cursor-pointer">
                                <input type="checkbox" className="rounded border-neutral-border text-sage-dark focus:ring-sage-dark" />
                                Remember me
                            </label>
                            <a href="#" className="text-sm text-sage-dark hover:text-sage-700 hover:underline font-medium transition-colors">
                                Forgot password?
                            </a>
                        </div>
                        {/* Menampilkan pesan error */}
                        {errorMsg && (
                            <p className="text-status-burnout text-sm font-medium mt-1">
                                {errorMsg}
                            </p>
                        )}
                        {/* Tombol Login */}
                        <Button
                            type="submit"
                            isLoading={isLoading}
                            className="mt-4"
                        >
                            Sign In
                        </Button>
                    </form>
                    {/* Navigasi ke Register */}
                    <p className="mt-8 text-center text-sm text-text-muted">
                        Dont have an account?{" "}
                        <Link href="/register" className="text-sage-dark font-semibold hover:text-sage-700 hover:underline transition-colors">
                            Sign Up
                        </Link>
                    </p>
                </div>
                {/* Kolom Kanan: Ilustrasi (Sekarang di urutan kedua) */}
                {/* Kelas 'hidden md:flex' membuat ilustrasi ini hilang di HP agar form tetap nyaman diakses */}
                <div className="hidden md:flex  md:w-1/2 bg-sage-100 flex-col items-center justify-center p-10 text-center">
                    <div className="w-96 h-96 bg-sage-200/40 rounded-full mb-5 relative flex items-center justify-center">
                        <div className="w-72 h-72 relative mb-8 flex items-center justify-center">
                            <Image
                                src="/images/image.png"
                                alt="Ilustrasi Meditasi"
                                fill
                                sizes="(max-width: 768px) 100vw, 300px"
                                className="object-contain scale-120"
                                priority
                            />
                        </div>
                    </div>
                    <h2 className="text-2xl font-semibold text-text-dark mb-3">
                        Welcome to Mood Lens
                    </h2>
                    <p className="text-text-muted max-w-xs leading-relaxed">
                        A safe place to reflect, understand your emotions, and track your burnout probability
                    </p>
                </div>
            </div>
        </div>
    );

}