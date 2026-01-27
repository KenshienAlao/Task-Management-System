import { Plus } from "lucide-react";

export default function addButton() {
  return (
    <button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:border-gray-400 hover:bg-gray-50">
      <Plus className="size-4" />
      <span className="font-body">Add Task</span>
    </button>
  );
}
