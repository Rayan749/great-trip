"use client";

import type { SavedTrip } from "@/lib/types";

interface Props {
  trips: SavedTrip[];
  /** 当前选中的 key：'sample' 或 记录 id */
  selectedKey: string;
  onSelect: (key: string) => void;
  onDelete: (id: string) => void;
}

/** 已存行程切换 + 删除 */
export default function TripSelector({ trips, selectedKey, onSelect, onDelete }: Props) {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto max-w-full">
      <button
        onClick={() => onSelect("sample")}
        className={`shrink-0 px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
          selectedKey === "sample"
            ? "bg-slate-800 text-white border-slate-800"
            : "bg-white text-slate-600 border-slate-300 hover:border-slate-400"
        }`}
      >
        示例行程
      </button>
      {trips.map((t) => (
        <div key={t.id} className="shrink-0 flex items-center">
          <button
            onClick={() => onSelect(t.id)}
            title={t.title}
            className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
              selectedKey === t.id
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-slate-600 border-slate-300 hover:border-slate-400"
            }`}
          >
            {t.title.slice(0, 18)}
            {t.title.length > 18 ? "…" : ""}
          </button>
          <button
            onClick={() => onDelete(t.id)}
            title="删除"
            className="ml-1 w-5 h-5 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 text-xs leading-5 text-center"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
