"use client";

import axios from "axios";
import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [isShow, setIsShow] = useState(false);

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        { email, password },
      );
      alert(res.data.message);
      localStorage.setItem("token", res.data.token);
      setTimeout(() => router.push("/page/home"), 1500);
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        {/* title */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-slate-800">Sign In</h1>
          <p className="mt-1 text-sm text-slate-500">
            Welcome back! Please login
          </p>
        </div>

        {/* form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* email */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-600">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="enter your email"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
            />
          </div>

          {/* password */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-600">
              Password
            </label>
            <div className="relative">
              <input
                type={isShow ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="enter your password"
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setIsShow(!isShow)}
                className="absolute top-3 right-3"
              >
                {isShow ? <Eye size={20} /> : <EyeClosed size={20} />}
              </button>
            </div>
            <p className="mt-1 cursor-pointer text-right text-xs text-blue-500 hover:underline">
              Forgot password?
            </p>
          </div>

          {/* button */}
          <button
            type="submit"
            className="w-full rounded-md bg-blue-500 py-2.5 font-semibold text-white transition hover:bg-blue-600"
          >
            Sign In
          </button>
        </form>

        {/* register */}
        <div className="mt-6 text-center text-sm text-slate-600">
          Don’t have an account?
          <Link href="/register" className="ml-1 text-blue-500 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </section>
  );
}
