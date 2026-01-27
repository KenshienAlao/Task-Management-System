"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        {
          username,
          email,
          password,
        },
      );
      alert(res.data.message);
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err) {
      const errorMessage = err.response?.data?.message;
      alert(err.response?.data?.message);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        {/* title */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-slate-800">Sign Up</h1>
          <p className="mt-1 text-sm text-slate-500">Create now!</p>
        </div>

        {/* form */}
        <form onSubmit={handleRegister} className="space-y-5">
          {/* username */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-600">
              Username
            </label>
            <input
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="enter your username"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
            />
          </div>
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
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="enter your password"
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
              />
            </div>
          </div>

          {/* button */}
          <button
            type="submit"
            className="w-full rounded-md bg-blue-500 py-2.5 font-semibold text-white transition hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>

        {/* register */}
        <div className="mt-6 text-center text-sm text-slate-600">
          Already have an account?
          <Link href="/login" className="ml-1 text-blue-500 hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
}
