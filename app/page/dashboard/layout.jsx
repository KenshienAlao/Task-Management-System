"use client";

import ThemeToggle from "@/app/components/theme/layout";
import Header from "./components/header/page";
import TabNavigation from "./components/tabNavigation/page";
import Dashboard from "./page";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./components/sidebar/page";

export default function RootLayout() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/page/error");

    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/user-info`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setUsername(res.data.username);
        setEmail(res.data.email);
      } catch (err) {
        alert(err.response?.data?.message);
        if (err.response?.status === 401) {
          router.push("/login");
        }
      }       
    };
    fetchData();
  }, []);

  const logOut = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="flex flex-col h-screen">
      <ThemeToggle />
      <header>
        <Header username={username} email={email} logOut={logOut} />
        <TabNavigation />
      </header>
      <main className="flex flex-1">
        <Sidebar />
        <Dashboard />
      </main>
    </div>
  );
}
