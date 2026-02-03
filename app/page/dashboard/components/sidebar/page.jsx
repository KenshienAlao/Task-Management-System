import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Filter, Tag, Circle, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const labels__tags = ["Work", "Personal", "Urgent", "Shopping", "Health"];
  const labels__button = ["All", "Low", "Medium", "High"];
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState("All");
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    const sidebarStatus = localStorage.getItem("sidebar__status");
    if (sidebarStatus === "open") {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, []);

  const handleSidebar = () => {
    if (isOpen) {
      setIsOpen(false);
      localStorage.setItem("sidebar__status", "close");
    } else {
      setIsOpen(true);
      localStorage.setItem("sidebar__status", "open");
    }
  };

  const handleTagToggle = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const priorityColors = {
    All: "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200",
    Low: "bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200",
    Medium: "bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-200",
    High: "bg-red-50 text-red-700 hover:bg-red-100 border-red-200",
  };

  const prioritySelectedColors = {
    All: "bg-slate-100 text-slate-800 border-slate-300 ring-2 ring-slate-200",
    Low: "bg-blue-100 text-blue-800 border-blue-300 ring-2 ring-blue-200",
    Medium:
      "bg-amber-100 text-amber-800 border-amber-300 ring-2 ring-amber-200",
    High: "bg-red-100 text-red-800 border-red-300 ring-2 ring-red-200",
  };

  const tagColors = [
    {
      bg: "bg-purple-500",
      hover: "hover:bg-purple-50",
      ring: "ring-purple-200",
    },
    { bg: "bg-blue-500", hover: "hover:bg-blue-50", ring: "ring-blue-200" },
    {
      bg: "bg-orange-500",
      hover: "hover:bg-orange-50",
      ring: "ring-orange-200",
    },
    {
      bg: "bg-emerald-500",
      hover: "hover:bg-emerald-50",
      ring: "ring-emerald-200",
    },
    { bg: "bg-pink-500", hover: "hover:bg-pink-50", ring: "ring-pink-200" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.aside
      animate={{ width: isOpen ? 280 : 64 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="flex flex-col border-r border-gray-200 bg-linear-to-b from-white to-gray-50/30 shadow-sm"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200/80 bg-white/80 p-4 backdrop-blur-sm">
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              key="filter-icon"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2.5 text-lg font-semibold text-gray-800"
            >
              <div className="rounded-lg bg-linear-to-br from-blue-500 to-indigo-600 p-1.5">
                <Filter className="h-4 w-4 text-white" />
              </div>
              <span className="font-header">Filters</span>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          className="rounded-lg p-2 transition-all hover:bg-gray-100 active:scale-95"
          onClick={handleSidebar}
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          <ArrowRight
            className={`h-5 w-5 text-gray-600 transition-transform duration-300 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="space-y-6 p-4"
            >
              {/* Labels Section */}
              <motion.div variants={itemVariants}>
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="flex items-center gap-2 text-xs font-semibold tracking-wider text-gray-500 uppercase">
                    <Tag className="h-3.5 w-3.5" />
                    Labels
                  </h3>
                  {selectedTags.length > 0 && (
                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                      {selectedTags.length}
                    </span>
                  )}
                </div>
                <div className="space-y-1">
                  {labels__tags.map((label, index) => {
                    const isSelected = selectedTags.includes(label);
                    return (
                      <motion.label
                        key={label}
                        variants={itemVariants}
                        className={`group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 transition-all ${
                          isSelected
                            ? `${tagColors[index].hover} ring-2 ${tagColors[index].ring}`
                            : "hover:bg-gray-100"
                        }`}
                        onClick={() => handleTagToggle(label)}
                      >
                        <div className="relative flex items-center">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => {}}
                            className="peer h-4 w-4 cursor-pointer appearance-none rounded border-2 border-gray-300 transition-all checked:border-transparent checked:bg-linear-to-br checked:from-blue-500 checked:to-indigo-600"
                          />
                          <CheckCircle2 className="pointer-events-none absolute left-0 h-4 w-4 text-white opacity-0 transition-opacity peer-checked:opacity-100" />
                        </div>
                        <div className="flex flex-1 items-center gap-2.5">
                          <div
                            className={`h-2 w-2 rounded-full ${tagColors[index].bg} shadow-sm`}
                          ></div>
                          <span className="font-body text-sm font-medium text-gray-700 group-hover:text-gray-900">
                            {label}
                          </span>
                        </div>
                      </motion.label>
                    );
                  })}
                </div>
              </motion.div>

              {/* Priority Section */}
              <motion.div variants={itemVariants}>
                <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-wider text-gray-500 uppercase">
                  <Circle className="h-3.5 w-3.5" />
                  Priority
                </h3>
                <div className="space-y-1.5">
                  {labels__button.map((label) => {
                    const isSelected = selectedPriority === label;
                    return (
                      <motion.button
                        key={label}
                        variants={itemVariants}
                        onClick={() => setSelectedPriority(label)}
                        className={`font-body flex w-full items-center gap-2.5 rounded-lg border px-4 py-2.5 text-left text-sm font-medium transition-all ${
                          isSelected
                            ? prioritySelectedColors[label]
                            : priorityColors[label]
                        }`}
                      >
                        <Circle
                          className={`h-3 w-3 transition-all ${
                            isSelected ? "scale-110 fill-current" : ""
                          }`}
                        />
                        {label}
                        {isSelected && label !== "All" && (
                          <span className="ml-auto text-xs opacity-60">
                            Active
                          </span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>

              {/* Active Filters Summary */}
              {(selectedTags.length > 0 || selectedPriority !== "All") && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg border border-blue-200 bg-blue-50/50 p-3"
                >
                  <div className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-wider text-blue-700 uppercase">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Active Filters
                  </div>
                  <div className="space-y-1 text-xs text-blue-600">
                    {selectedPriority !== "All" && (
                      <div>Priority: {selectedPriority}</div>
                    )}
                    {selectedTags.length > 0 && (
                      <div>Labels: {selectedTags.join(", ")}</div>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapsed State Icons */}
        {!isOpen && (
          <div className="flex flex-col items-center gap-4 pt-6">
            <button
              className="group relative rounded-lg p-3 transition-all hover:bg-linear-to-br hover:from-blue-50 hover:to-indigo-50"
              onClick={handleSidebar}
              title="Labels"
            >
              <Tag className="h-5 w-5 text-gray-600 transition-colors group-hover:text-blue-600" />
              {selectedTags.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                  {selectedTags.length}
                </span>
              )}
            </button>
            <button
              className="group relative rounded-lg p-3 transition-all hover:bg-linear-to-br hover:from-blue-50 hover:to-indigo-50"
              onClick={handleSidebar}
              title="Priority"
            >
              <Circle
                className={`h-5 w-5 text-gray-600 transition-colors group-hover:text-blue-600 ${
                  selectedPriority !== "All" ? "fill-current text-blue-500" : ""
                }`}
              />
            </button>
          </div>
        )}
      </div>
    </motion.aside>
  );
}
