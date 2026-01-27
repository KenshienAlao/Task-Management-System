"use client";

import { AnimatePresence, boxEquals, motion } from "framer-motion";
import { ClipboardList, Home, Mail, Menu, User } from "lucide-react";
import Link from "next/link";

export default function Navbar({
  user,
  email,
  openMenu,
  setOpenMenu,
  RemoveToken,
}) {
  return (
    <div className="relative">
      <div
        onClick={() => setOpenMenu(false)}
        className={`absolute ${openMenu ? "h-screen w-screen" : ""}`}
      ></div>
      <nav className="flex items-center justify-between p-4 shadow-md">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <ClipboardList className="h-7 w-7 text-blue-700" />
          <span className="font-semiheader text-2xl font-bold">Todo Tasks</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex justify-center">
            <motion.button
              whileHover={{
                scale: 1.09,
              }}
              whileTap={{
                scale: 0.8,
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 40,
              }}
              onClick={() => setOpenMenu(!openMenu)}
              className="z-2"
            >
              <Menu />
            </motion.button>

            <AnimatePresence>
              {openMenu && (
                <motion.div
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  transition={{
                    type: "tween",
                    stiffness: 400,
                    damping: 20,
                  }}
                >
                  <div
                    key="box"
                    className={`bg-background absolute right-4 -bottom-60 z-2 rounded-md p-4 shadow-md transition-colors duration-400 ease-in ${openMenu ? "flex" : "hidden"} flex-col items-start gap-2`}
                  >
                    {/* top */}
                    <div className="mb-5 flex items-center gap-2 border-b border-neutral-300 px-4 py-3">
                      <div className="rounded-full border-3 p-2">
                        <User size={90} />
                      </div>
                      <div className="ml-2 flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                          <User />
                          <p className="font-body text-2xl">{user}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail />
                          <p className="font-body text-2xl text-blue-400">
                            {email}
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* middle */}
                    <div className="flex flex-col gap-3 pl-5"></div>
                    <Link className="w-full text-end" href="/login">
                      <button
                        onClick={RemoveToken}
                        className="text-red-500 hover:text-red-700"
                      >
                        Logout
                      </button>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>
    </div>
  );
}
