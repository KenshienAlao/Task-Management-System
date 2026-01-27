"use client";

import { ChevronDown, ArrowDownUp } from "lucide-react";
import AddButton from "./components/ui/addButton";
import DeleteButton from "./components/ui/deleteButton";

export default function Dashboard() {

  return (
      <main>
        <div className="flex justify-between p-5">
          <div className="flex gap-4">
            {/* add tasks */}
            <AddButton />
            {/* delete tasks */}
            <DeleteButton />
          </div>
          <div className="flex items-center justify-center gap-4">
            <div className="relative">
              <select className="cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-sm font-medium text-gray-700 transition-colors duration-200 hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option value="due-date">Due Date</option>
                <option value="created-time">Created Time</option>
                <option value="priority">Priority</option>
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
            </div>
            <button className="group flex items-center justify-center rounded-lg border border-gray-300 bg-white p-2.5 text-gray-700 transition-colors duration-200 hover:border-gray-400 hover:bg-gray-50">
              <ArrowDownUp className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
            </button>
          </div>
        </div>
      </main>
  );
}
