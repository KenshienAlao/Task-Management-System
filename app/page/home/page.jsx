"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import ThemeToggle from "../../components/theme/layout";
import NavbarHome from "./components/navbarHome/layout";
import HomePage from "@/app/page/home/components/homePage/page";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/page/error");

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/auth/user-info`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data.username);
        setEmail(res.data.email);
      });
  }, []);

  const RemoveToken = () => {
    localStorage.removeItem("token");
  };

  return (
    <div className="min-h-screen">
      <ThemeToggle />
      <header className="fixed w-full">
        <NavbarHome user={user} email={email} RemoveToken={RemoveToken} />
      </header>
      <main>
        <HomePage />
      </main>
    </div>
  );
}
