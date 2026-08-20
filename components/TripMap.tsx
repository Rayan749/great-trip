"use client";

import { useEffect, useRef, useState } from "react";
import type { Trip } from "@/lib/types";
import { mapSegments } from "@/lib/geo";

interface Props {
  trip: Trip;
  /** 当前高亮条目 id（dayIndex-itemIndex） */
  activeId: string | null;
  /** 当前展示第几天（1 起） */
  selectedDay: number;
  onMarkerClick: (id: string) => void;
  onDayChange: (day: number) => void;
}

type Status = "loading" | "no-key" | "ready" | "error";

/**
 * 高德地图：按天展示，地面点打标记、相邻点之间绘制驾车真实路线；
 * 飞行段（mode==="flight"）不上地图。点选条目只平移（固定缩放）。
 */
export default function TripMap({ trip, activeId, selectedDay, onMarkerClick, onDayChange }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<Map<string, any>>(new Map());
  const linesRef = useRef<any[]>([]);
  const renderToken = useRef(0);
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState("");

  const key = process.env.NEXT_PUBLIC_AMAP_KEY;

  // 初始化地图（只跑一次）
  useEffect(() => {
    if (!key) {
      setStatus("no-key");
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const AMapLoader = (await import("@amap/amap-jsapi-loader")).default;
        (window as any)._AMapSecurityConfig = {
          securityJsCode: process.env.NEXT_PUBLIC_AMAP_SECURITY_CODE || "",
        };
        const AMap = await AMapLoader.load({
          key,
          version: "2.0",
          plugins: ["AMap.Scale", "AMap.ToolBar", "AMap.Driving"],
        });
        if (cancelled || !containerRef.current) return;
        // 默认比例尺 1 公里（zoom 14）；缩放只由用户控制
        const map = new AMap.Map(containerRef.current, {
          zoom: 14,
          center: [120.5, 36.4],
          viewMode: "2D",
          animateEnable: true,
        });
        map.addControl(new AMap.Scale());
        mapRef.current = map;
        setStatus("ready");
      } catch (e: any) {
        if (!cancelled) {
          setStatus("error");
          setError(String(e?.message || e));
        }
      }
    })();
    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.destroy();
        mapRef.current = null;
        markersRef.current.clear();
        linesRef.current = [];
      }
    };
  }, [key]);

  // 容器尺寸变化（如移动端折叠面板）时 resize 地图，避免缩放/渲染错乱
  useEffect(() => {
    if (status !== "ready" || !containerRef.current) return;
    const ro = new ResizeObserver(() => {
      mapRef.current?.resize?.();
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [status]);

  // 按天渲染标记 + 驾车路线（天/行程变化时重建）
  useEffect(() => {
    if (status !== "ready" || !mapRef.current) return;
    const AMap = (window as any).AMap;
    const map = mapRef.current;
    const token = ++renderToken.current;

    markersRef.current.forEach((m) => map.remove(m));
    markersRef.current.clear();
    linesRef.current.forEach((l) => map.remove(l));
    linesRef.current = [];

    const daySegments = mapSegments(trip).filter((seg) => seg.length && seg[0].day.day === selectedDay);
    const markers: any[] = [];
    const driving = new AMap.Driving({ policy: AMap.DrivingPolicy.LEAST_TIME, hideMarkers: true, map: null });

    for (const seg of daySegments) {
      // 标记
      seg.forEach((g) => {
        const pos: [number, number] = [g.item.lng as number, g.item.lat as number];
        const content = `<div class="trip-pin">${g.day.day}.${g.itemIndex + 1}</div>`;
        const marker = new AMap.Marker({ position: pos, content, anchor: "bottom-center" });
        marker.on("click", () => {
          onMarkerClick(g.id);
          const info = new AMap.InfoWindow({
            content: `<div class="trip-info"><b>${g.item.time ? g.item.time + " " : ""}${g.item.title}</b>${
              g.item.desc ? `<div class="trip-info-desc">${g.item.desc}</div>` : ""
            }${g.item.transport || g.item.transfer || g.item.distance ? `<div class="trip-info-desc">${g.item.transport || ""}${g.item.transfer ? " · " + g.item.transfer : ""}${g.item.distance ? " · " + g.item.distance : ""}</div>` : ""}${
              g.item.visit ? `<div class="trip-info-desc">${g.item.visit}</div>` : ""
            }</div>`,
          });
          info.open(map, pos);
        });
        markersRef.current.set(g.id, marker);
        markers.push(marker);
      });

      // 相邻点驾车路线（非直线）
      for (let i = 0; i < seg.length - 1; i++) {
        const a = seg[i].item;
        const b = seg[i + 1].item;
        const start: [number, number] = [a.lng as number, a.lat as number];
        const end: [number, number] = [b.lng as number, b.lat as number];
        driving.search(start, end, (st: string, res: any) => {
          if (renderToken.current !== token) return; // 已切天/重建，丢弃过期回调
          const m = mapRef.current;
          if (!m) return;
          let path = [start, end];
          if (st === "complete" && res?.routes?.length) {
            path = res.routes[0].steps.flatMap((s: any) => s.path);
          }
          const line = new AMap.Polyline({
            path,
            strokeColor: "#1d6fff",
            strokeWeight: 4,
            strokeOpacity: 0.75,
            lineJoin: "round",
          });
          m.add(line);
          linesRef.current.push(line);
        });
      }
    }
    map.add(markers);
    // 固定缩放：不自动 fitView，只平移到当天第一个点
    if (markers.length) {
      map.panTo(markers[0].getPosition());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, trip, selectedDay]);

  // 点选条目 → 只平移（固定缩放）+ 高亮
  useEffect(() => {
    if (status !== "ready" || !mapRef.current) return;
    markersRef.current.forEach((m, id) => {
      const el = m.getContent?.();
      const dom = typeof el === "string" ? null : el;
      if (dom?.querySelector) {
        dom.querySelector(".trip-pin")?.classList.toggle("trip-pin-active", id === activeId);
      }
    });
    if (activeId) {
      const marker = markersRef.current.get(activeId);
      if (marker) mapRef.current.panTo(marker.getPosition());
    }
  }, [activeId, selectedDay, status]);

  if (status === "no-key") {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center gap-2 bg-slate-100 text-slate-500 p-6 text-center">
        <p className="font-semibold text-slate-600">尚未配置高德地图 Key</p>
        <p className="text-sm">在项目 <code className="bg-slate-200 px-1 rounded">.env.local</code> 设置</p>
        <p className="text-sm font-mono break-all">NEXT_PUBLIC_AMAP_KEY=你的高德JS Key<br />NEXT_PUBLIC_AMAP_SECURITY_CODE=安全密钥</p>
        <p className="text-xs">并在高德开放平台把 localhost 与部署域名加入白名单</p>
      </div>
    );
  }
  if (status === "error") {
    return (
      <div className="h-full w-full flex items-center justify-center bg-red-50 text-red-500 p-6 text-center text-sm">
        地图加载失败：{error}<br />请检查 Key/白名单/网络后刷新
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <div ref={containerRef} className="h-full w-full" />

      {/* Day 切换（胶囊+日期） */}
      <div className="absolute top-3 left-3 z-[500] flex items-center gap-1 rounded-full bg-white/95 backdrop-blur px-2 py-1.5 shadow-md border border-slate-200/80">
        {trip.days.map((d) => {
          const active = selectedDay === d.day;
          const md = d.date ? `${+d.date.slice(5, 7)}/${+d.date.slice(8, 10)}` : "";
          return (
            <button
              key={d.day}
              onClick={() => onDayChange(d.day)}
              className={`flex flex-col items-center justify-center px-3 py-1 rounded-full leading-none transition-all duration-150 ${
                active
                  ? "bg-gradient-to-b from-blue-500 to-blue-600 text-white shadow-sm"
                  : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              <span className="text-[13px] font-bold">D{d.day}</span>
              <span className={`text-[9px] mt-0.5 ${active ? "text-blue-100" : "text-slate-400"}`}>{md}</span>
            </button>
          );
        })}
      </div>

      {/* 缩放按钮（自定义样式，安全区避让） */}
      <div className="absolute bottom-[calc(1rem+env(safe-area-inset-bottom))] right-3 z-[500] flex flex-col gap-1.5">
        <button
          onClick={() => mapRef.current?.zoomIn()}
          aria-label="放大地图"
          className="w-10 h-10 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 active:scale-95 transition-all text-xl leading-none select-none"
        >
          ＋
        </button>
        <button
          onClick={() => mapRef.current?.zoomOut()}
          aria-label="缩小地图"
          className="w-10 h-10 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 active:scale-95 transition-all text-xl leading-none select-none"
        >
          －
        </button>
      </div>

      {status === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 text-slate-400">
          地图加载中…
        </div>
      )}
    </div>
  );
}
