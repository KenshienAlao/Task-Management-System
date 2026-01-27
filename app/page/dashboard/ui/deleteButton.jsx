import { Trash } from "lucide-react";

export default function addButton() {
  return (
    <button className="flex items-center gap-2 rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-600 transition-colors duration-200 hover:border-red-400 hover:bg-red-50">
      <Trash className="size-4" />
      <span className="font-body">Delete Task</span>
    </button>
  );
}
