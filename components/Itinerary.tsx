"use client";

import type { Trip } from "@/lib/types";
import { itemId } from "@/lib/geo";

interface Props {
  trip: Trip;
  activeId: string | null;
  onSelect: (id: string) => void;
  /** 当前展开的天（0 起索引），与地图 selectedDay 联动 */
  openDay: number | null;
  onToggleDay: (i: number) => void;
}

/** 右栏行程单：标题 + 逐日可折叠卡片（受控手风琴，与地图联动） */
export default function Itinerary({ trip, activeId, onSelect, openDay, onToggleDay }: Props) {

  return (
    <div className="h-full overflow-y-auto p-4 space-y-4">
      <div>
        <h1 className="text-xl font-bold text-slate-800">{trip.title}</h1>
        {trip.dates && <div className="text-sm text-slate-500 mt-0.5">{trip.dates}</div>}
        {trip.description && <p className="text-sm text-slate-600 mt-2 leading-relaxed">{trip.description}</p>}
      </div>

      <div className="space-y-3">
        {trip.days.map((day, di) => {
          const open = openDay === di;
          return (
            <div key={di} className="border border-slate-200 rounded-lg overflow-hidden bg-white">
              {/* 可折叠头部 */}
              <button
                onClick={() => onToggleDay(di)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 transition-colors"
              >
                <span className="shrink-0 w-8 h-8 rounded-md bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">
                  D{day.day}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block font-semibold text-slate-800 text-sm truncate">{day.title}</span>
                  <span className="block text-xs text-slate-500">
                    {day.date}
                    {day.city ? ` · ${day.city}` : ""} · {day.items.length} 项
                    {day.hotel ? ` · 住宿 ${day.hotel}` : ""}
                  </span>
                </span>
                <svg
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* 折叠内容 */}
              {open && (
                <div className="border-t border-slate-100 divide-y divide-slate-100">
                  {day.items.map((item, ii) => {
                    const id = itemId(di, ii);
                    const active = activeId === id;
                    return (
                      <button
                        key={id}
                        onClick={() => onSelect(id)}
                        onMouseEnter={() => onSelect(id)}
                        className={`w-full text-left px-4 py-2.5 transition-colors ${
                          active ? "bg-blue-50" : "hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          {item.time && (
                            <span className={`shrink-0 mt-0.5 text-[11px] tabular-nums px-1.5 py-0.5 rounded ${
                              active ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"
                            }`}>
                              {item.time}
                            </span>
                          )}
                          <div className="min-w-0">
                            <div className={`text-sm font-medium ${active ? "text-blue-800" : "text-slate-800"}`}>
                              {item.title}
                            </div>
                            {item.desc && <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.desc}</div>}
                            {item.place && <div className="text-xs text-slate-400 mt-0.5">{item.place}</div>}
                            {(item.transport || item.transfer || item.distance || item.visit) && (
                              <div className="mt-1 flex flex-wrap gap-1.5 text-[11px] text-slate-500">
                                {(item.transport || item.transfer || item.distance) && (
                                  <span className="bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5">
                                    {item.transport}
                                    {item.transfer ? ` · ${item.transfer}` : ""}
                                    {item.distance ? ` · ${item.distance}` : ""}
                                  </span>
                                )}
                                {item.visit && (
                                  <span className="bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5">
                                    {item.visit}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                          {item.lat != null && item.lng != null && (
                            <span className="ml-auto shrink-0 text-slate-300 text-xs mt-1">●</span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
