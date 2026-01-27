"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import ThemeToggle from "../../components/theme/layout";
import NavbarHome from "./components/navbarHome/layout";
import HomePage from "@/app/page/home/components/homePage/page";
import { AlertOctagon } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsSuccess(false);
      router.push("/page/error");
    }

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
        setIsSuccess(true);
        setUser(res.data.username);
        setEmail(res.data.email);
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message);
      }
    };
    fetchData();
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
        <HomePage user={user} isLoading={isSuccess} />
      </main>
    </div>
  );
}
