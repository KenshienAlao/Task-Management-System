"use client";

import { Sun, Moon } from "lucide-react";
export default function ThemeToggle({ isDark, toggleTheme }) {
  return (
    <div className="fixed right-10 bottom-10 z-50 p-4">
      <button
        onClick={toggleTheme}
        className="relative flex items-center space-x-2"
      >
        {isDark ? (
          <Moon size={40} className="text-gray-400" />
        ) : (
          <Sun size={40} className="text-yellow-500" />
        )}
      </button>
    </div>
  );
}
