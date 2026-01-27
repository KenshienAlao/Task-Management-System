import { ClipboardClockIcon } from "lucide-react";
import Link from "next/link";

export default function HomePage({ user, isLoading }) {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12 select-none">
      <div className="mx-auto">
        {/* text */}
        <div className="mb-5">
          {/* greetings */}
          <p className="font-header text-foreground/80 animate-in text-7xl font-bold uppercase duration-700">
            {greeting}
          </p>
          {/* username */}
          <div className="flex justify-end gap-3">
            <h1 className="font-body text-foreground/50 animate-in flex gap-3 text-2xl font-bold duration-700">
              Ready to crush it,
              {isLoading ? (
                <span className="text-accent capitalize">{user}</span>
              ) : (
                <div className="bg-accent/20 h-10 w-43 animate-pulse rounded-md" />
              )}
              ?
            </h1>
          </div>

          <div className="bg-accent/20 mt-6 h-0.5 w-full rounded-full opacity-60" />
        </div>
        {/* buttons */}
        <div className="flex justify-center gap-20 pt-10">
          <Link
            href="/page/dashboard"
            className="group relative flex items-center gap-3 overflow-hidden rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-violet-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-violet-500/60 active:scale-95"
          >
            <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"></div>
            <ClipboardClockIcon className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
            <span className="relative z-10">View Tasks</span>
            <div className="absolute inset-0 scale-0 rounded-xl bg-white/20 opacity-0 blur-sm transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"></div>
          </Link>
        </div>
      </div>
    </div>
  );
}
