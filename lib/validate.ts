import type { Trip, TripDay, TripItem } from "./types";

export type ValidateResult = { ok: true; trip: Trip } | { ok: false; error: string };

const isNum = (v: unknown): v is number => typeof v === "number" && Number.isFinite(v);

/** 校验并规范化一份行程 JSON */
export function validateTrip(input: unknown): ValidateResult {
  if (!input || typeof input !== "object") return { ok: false, error: "顶层必须是对象" };
  const obj = input as Record<string, unknown>;

  const title = typeof obj.title === "string" && obj.title.trim() ? obj.title.trim() : "";
  if (!title) return { ok: false, error: "缺少 title（行程名称）" };

  if (!Array.isArray(obj.days) || obj.days.length === 0)
    return { ok: false, error: "缺少 days（至少一天）" };

  const days: TripDay[] = [];
  for (let i = 0; i < obj.days.length; i++) {
    const raw = obj.days[i] as Record<string, unknown> | undefined;
    if (!raw || typeof raw !== "object") return { ok: false, error: `days[${i}] 不是对象` };

    const dayTitle = typeof raw.title === "string" && raw.title.trim() ? raw.title.trim() : "";
    if (!dayTitle) return { ok: false, error: `days[${i}] 缺少 title` };

    if (!Array.isArray(raw.items) || raw.items.length === 0)
      return { ok: false, error: `days[${i}] 缺少 items` };

    const items: TripItem[] = [];
    for (let j = 0; j < raw.items.length; j++) {
      const it = raw.items[j] as Record<string, unknown> | undefined;
      if (!it || typeof it !== "object" || typeof it.title !== "string" || !it.title.trim())
        return { ok: false, error: `days[${i}].items[${j}] 缺少 title` };
      const item: TripItem = {
        title: it.title.trim(),
        time: typeof it.time === "string" ? it.time : undefined,
        desc: typeof it.desc === "string" ? it.desc : undefined,
        place: typeof it.place === "string" ? it.place : undefined,
        transport: typeof it.transport === "string" ? it.transport : undefined,
        transfer: typeof it.transfer === "string" ? it.transfer : undefined,
        distance: typeof it.distance === "string" ? it.distance : undefined,
        visit: typeof it.visit === "string" ? it.visit : undefined,
        mode: typeof it.mode === "string" ? it.mode : undefined,
      };
      // 坐标可选；非法坐标丢弃（而非报错）
      if (isNum(it.lat) && isNum(it.lng) && it.lat >= -90 && it.lat <= 90 && it.lng >= -180 && it.lng <= 180) {
        item.lat = Math.round(it.lat * 1e6) / 1e6;
        item.lng = Math.round(it.lng * 1e6) / 1e6;
      }
      items.push(item);
    }

    days.push({
      day: isNum(raw.day) ? Math.max(1, Math.round(raw.day)) : i + 1,
      date: typeof raw.date === "string" ? raw.date : undefined,
      title: dayTitle,
      city: typeof raw.city === "string" ? raw.city : undefined,
      hotel: typeof raw.hotel === "string" ? raw.hotel : undefined,
      items,
    });
  }

  return {
    ok: true,
    trip: {
      title,
      dates: typeof obj.dates === "string" ? obj.dates : undefined,
      description: typeof obj.description === "string" ? obj.description : undefined,
      days,
    },
  };
}
