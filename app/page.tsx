"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { SAMPLE_TRIP } from "@/lib/sample-trip";
import { RAINY_TRIP } from "@/lib/rainy-trip";
import Itinerary from "@/components/Itinerary";

// 地图必须客户端渲染（高德 API 依赖 window）
const TripMap = dynamic(() => import("@/components/TripMap"), { ssr: false });

export default function Home() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState(1);
  const [openDay, setOpenDay] = useState<number | null>(0); // 行程单展开的天（0起索引），与地图联动
  const [panelOpen, setPanelOpen] = useState(true);
  const [planMode, setPlanMode] = useState<"sunny" | "rainy">("sunny");
  const trip = planMode === "sunny" ? SAMPLE_TRIP : RAINY_TRIP;

  /** 切换晴/雨方案：重置天与高亮 */
  const handlePlanMode = (m: "sunny" | "rainy") => {
    setPlanMode(m);
    setSelectedDay(1);
    setOpenDay(0);
    setActiveId(null);
  };

  /** 地图切天 → 行程单同步展开对应天 */
  const handleDayChange = (d: number) => {
    setSelectedDay(d);
    setOpenDay(d - 1);
  };

  /** 行程单折叠/展开天 → 地图同步切天 */
  const handleToggleDay = (i: number) => {
    setOpenDay((prev) => (prev === i ? null : i));
    setSelectedDay(i + 1);
  };

  /** 点击行程条目：高亮 + 地图切到对应天 + 展开对应天 */
  const handleSelectItem = (id: string) => {
    setActiveId(id);
    const day = parseInt(id.split("-")[0], 10);
    if (!Number.isNaN(day)) {
      setSelectedDay(day + 1);
      setOpenDay(day);
    }
  };

  return (
    <div className="relative flex flex-col md:flex-row h-[100dvh] w-screen overflow-hidden bg-slate-50">
      {/* 地图：弹性占满剩余空间（面板收起时填满，避免留白） */}
      <div className="relative flex-1 min-h-0">
        <TripMap
          trip={trip}
          activeId={activeId}
          selectedDay={selectedDay}
          onMarkerClick={handleSelectItem}
          onDayChange={handleDayChange}
        />
      </div>

      {/* 天气方案切换（太阳/雨云），左栏右上角折叠按钮下方 */}
      <div
        className={`absolute top-[64px] z-[500] flex flex-col rounded-full bg-white border border-slate-200 shadow-sm overflow-hidden
          ${panelOpen ? "right-3 md:right-[408px]" : "right-3"}`}
      >
        <button
          onClick={() => handlePlanMode("sunny")}
          title="晴天方案"
          className={`w-9 h-9 flex items-center justify-center transition-colors ${planMode === "sunny" ? "bg-blue-600 text-white" : "text-slate-500 hover:bg-slate-50"}`}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
        </button>
        <button
          onClick={() => handlePlanMode("rainy")}
          title="雨天方案"
          className={`w-9 h-9 flex items-center justify-center transition-colors border-t border-slate-100 ${planMode === "rainy" ? "bg-blue-600 text-white" : "text-slate-500 hover:bg-slate-50"}`}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.5 19a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.3 1.9A4 4 0 0 0 7 19h10.5z" />
            <path d="M9 19l-1 2M13 19l-1 2M17 19l-1 2" />
          </svg>
        </button>
      </div>

      {/* 行程单：移动端占 40%（可收起）/ 桌面右侧面板 */}
      <aside
        className={`relative z-[500] shrink-0 bg-white border-slate-200 transition-all duration-200 ease-out overflow-hidden
          ${panelOpen
            ? "h-[40%] border-t md:h-full md:w-[400px] md:border-t-0 md:border-l"
            : "h-0 border-t md:h-full md:w-0 md:border-t-0 md:border-l"}`}
      >
        <div className={`h-full overflow-hidden ${panelOpen ? "" : "opacity-0"}`}>
          <Itinerary
            trip={trip}
            activeId={activeId}
            onSelect={handleSelectItem}
            openDay={openDay}
            onToggleDay={handleToggleDay}
          />
        </div>
      </aside>

      {/* 折叠按钮：白色圆形，位于左栏（地图）右上角 */}
      <button
        onClick={() => setPanelOpen((v) => !v)}
        title={panelOpen ? "收起行程单" : "展开行程单"}
        className={`absolute top-[35px] -translate-y-1/2 z-[600] w-9 h-9 rounded-full bg-blue-600 text-white shadow-sm flex items-center justify-center hover:bg-blue-700 transition-colors
          ${panelOpen ? "right-3 md:right-[408px]" : "right-3"}`}
      >
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          className={`transition-transform duration-200 ${panelOpen ? "" : "rotate-180"}`}
        >
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>
    </div>
  );
}
