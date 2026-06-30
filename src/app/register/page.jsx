"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (password !== confirmPassword) {
      setErrorMsg("Password does not match!");
      return;
    }

    setIsLoading(true);

    try {
      await axios.post("http://localhost:8080/api/auth/register", {
        username,
        email,
        password,
      });

      router.push("/login");
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-mood-bg p-4 md:p-6">
      <div className="w-full max-w-5xl bg-white rounded-4xl shadow-sm flex overflow-hidden min-h-150 border border-neutral-border/50">
        {/* Kolom Kiri: Form Register */}
        <div className="w-full md:w-1/2 p-8 md:p-14 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-text-dark mb-1">Sign up to</h1>
          <p className="text-text-muted mb-6 text-sm">
            Lorem ipsum dolor sit amet consectetur.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Input Email */}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full border border-neutral-border rounded-xl px-4 py-2.5 focus:outline-none focus:border-sage-500 focus:ring-sage-500 transition-colors text-text-dark placeholder:text-text-muted/60 text-sm"
                required
              />
            </div>
            {/* Input Username */}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1.5">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full border border-neutral-border rounded-xl px-4 py-2.5 focus:outline-none focus:border-sage-500 focus:ring-sage-500 transition-colors text-text-dark placeholder:text-text-muted/60 text-sm"
                required
              />
            </div>
            {/* Input Password */}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full border border-neutral-border rounded-xl px-4 py-2.5 focus:outline-none focus:border-sage-500 focus:ring-1 focus:ring-sage-500 transition-colors text-text-dark placeholder:text-text-muted/60 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3 text-text-muted hover:text-sage-dark transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            {/* Input Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1.5`">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full border border-neutral-border rounded-xl px-4 py-2.5 focus:outline-none focus:border-sage-500 focus:ring-1 focus:ring-sage-500 transition-colors text-text-dark placeholder:text-text-muted/60 text-sm"
                  required
                />
                <button
                  type="submit"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-3 text-text-muted hover:text-sage-dark transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>
            {/* Menampilkan pesan error jika ada */}
            {errorMsg && (
              <p className="text-status-burnout text-sm font-medium text-center mt-1">
                {errorMsg}
              </p>
            )}
            {/* Tombol register */}
            <button
              type="submit"
              disabled={isLoading}
              className="mt-3 w-full bg-sage-dark text-white font-medium rounded-xl py-3 hover:bg-sage-700 transition-all active:scale-[0.98] text-sm font-sans ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}"
            >
              {isLoading ? "Processing..." : "Register"}
            </button>
          </form>
          {/* Navigasi kembali ke Login */}
          <p className="mt-6 text-center text-sm text-text-muted">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-sage-dark font-semibold hover:text-sage-700 hover:underline transition-colors"
            >
              Login
            </Link>
          </p>
        </div>
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
            A safe place to reflect, understand your emotions, and track your
            burnout probability
          </p>
        </div>
      </div>
    </div>
  );
}
