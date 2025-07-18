"use client";

import { useReportStore } from "@/app/store/reportStore";

const issueTypes = [
  "Jalan Rusak",
  "Longsor",
  "Jembatan Retak",
  "Pohon Tumbang",
  "Banjir",
];

const FilterPanel = () => {
  const filter = useReportStore((s) => s.filter);
  const setFilter = useReportStore((s) => s.setFilter);

  const toggleFilter = (issue: string) => {
    setFilter(filter === issue ? null : issue);
  };

  return (
    <div className="flex gap-2 flex-wrap mb-4">
      {issueTypes.map((issue) => (
        <button
          key={issue}
          onClick={() => toggleFilter(issue)}
          className={`px-3 py-1 rounded border ${
            filter === issue
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {issue}
        </button>
      ))}
      <button
        onClick={() => setFilter(null)}
        className={`px-3 py-1 rounded border ${
          filter === null
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        Semua
      </button>
    </div>
  );
};

export default FilterPanel;
