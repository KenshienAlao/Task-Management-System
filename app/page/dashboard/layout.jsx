"use client";

import ThemeToggle from "@/app/components/theme/page";
import Header from "./components/header/page";
import TabNavigation from "./components/tabNavigation/page";
import Dashboard from "./page";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

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
              Authorization: `Bearer: ${token}`,
            },
          },
        );
        setUsername(res.data.username);
        setEmail(res.data.email);
      } catch (err) {
        console.error(err.respose?.data?.message);
        alert(err.respose?.data?.message);
      }
    };
    fetchData();
  }, []);

  const logOut = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div>
      <ThemeToggle />
      <header>
        <Header username={username} email={email} logOut={logOut} />
        <TabNavigation />
      </header>
      <main>
        <Dashboard />
      </main>
    </div>
  );
}
