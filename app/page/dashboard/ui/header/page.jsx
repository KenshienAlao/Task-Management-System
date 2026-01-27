"use client"

import { User, Search, ClipboardList, LogOut } from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";

import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [show__menu, isShow__menu] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchData = async () => {
      try {
        await axios
          .get(`${process.env.NEXT_PUBLIC_API_URL}/auth/user-info`, {
            headers: {
              Authorization: `Bearers ${token}`,
            },
          })
          .then((res) => {
            setUsername(res.data.username);
            setEmail(res.data.email);
          });
      } catch (err) {
        alert(err.response?.data?.message);
      }
    };

    fetchData();
  }, []);

  const removeToken = () => {
    localStorage.removeItem("token");
  };

  return (
    <div>
      <div
        onClick={() => isShow__menu(false)}
        className={show__menu ? "absolute z-1 h-full w-full" : ""}
      />
      <header className="bg-background flex w-full justify-center border-b border-gray-200 py-4 shadow-sm transition-colors duration-400">
        <div className="flex w-full max-w-7xl items-center justify-between gap-4 px-4">
          <div className="flex items-center justify-center gap-5">
            <ClipboardList className="text-accent" />
            <h1 className="font-header text-foreground text-2xl font-bold transition-colors duration-400">
              Todo Task
            </h1>
          </div>

          <div className="relative max-w-md flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 text-sm text-gray-400 transition-colors duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="relative z-2">
            <button
              onClick={() => isShow__menu(!show__menu)}
              className="flex items-center justify-center rounded-lg border border-gray-300 bg-white p-2 text-gray-700 transition-colors duration-200 hover:border-gray-400 hover:bg-gray-50"
            >
              <User className="h-5 w-5" />
            </button>

            <AnimatePresence>
              {show__menu && (
                // card
                <motion.div
                  initial={{
                    y: -5,
                    opacity: 0,
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                  }}
                  exit={{
                    y: -5,
                    opacity: 0,
                  }}
                  transition={{
                    type: "tween",
                    stiffness: 200,
                    damping: 20,
                  }}
                  className="absolute top-full right-0 mt-2 w-64 rounded-lg border border-gray-200 bg-white p-4 shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-indigo-600 p-3">
                      <User size={32} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{username}</p>
                      <p className="text-xs text-gray-500">{email}</p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2 border-t border-gray-200 pt-4">
                    <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50">
                      <LogOut className="h-4 w-4" />
                      <Link onClick={removeToken} href="/login">
                        Logout
                      </Link>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>
    </div>
  );
}
