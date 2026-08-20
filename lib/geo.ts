import type { Trip, TripDay, TripItem } from "./types";

/** 行程条目唯一 id："{dayIndex}-{itemIndex}" */
export function itemId(dayIndex: number, itemIndex: number): string {
  return `${dayIndex}-${itemIndex}`;
}

export interface FlatItem {
  id: string;
  dayIndex: number;
  itemIndex: number;
  day: TripDay;
  item: TripItem;
}

/** 展开全部条目（含无坐标的），用于行程单渲染 */
export function allItems(trip: Trip): FlatItem[] {
  const out: FlatItem[] = [];
  trip.days.forEach((day, di) => {
    day.items.forEach((item, ii) => {
      out.push({ id: itemId(di, ii), dayIndex: di, itemIndex: ii, day, item });
    });
  });
  return out;
}

/** 只保留有坐标的条目，用于地图打点与连线 */
export function geoItems(trip: Trip): FlatItem[] {
  return allItems(trip).filter((f) => typeof f.item.lat === "number" && typeof f.item.lng === "number");
}

/**
 * 地面分段：飞行段（mode==="flight"）不上地图并断开；跨天也断开。
 * 返回若干段，每段内的点按顺序连接（驾车真实路线）。
 * 例：D1 起飞(flight)→石老人→…→老东港 → 返回 [[石老人,…,老东港]]
 */
export function mapSegments(trip: Trip): FlatItem[][] {
  const segments: FlatItem[][] = [];
  let cur: FlatItem[] = [];
  let curDay = -1;
  for (const f of allItems(trip)) {
    const hasCoord = typeof f.item.lat === "number" && typeof f.item.lng === "number";
    if (f.item.mode === "flight") {
      if (cur.length) { segments.push(cur); cur = []; }
      curDay = -1;
      continue;
    }
    if (!hasCoord) continue;
    if (f.day.day !== curDay) {
      if (cur.length) segments.push(cur);
      cur = [];
      curDay = f.day.day;
    }
    cur.push(f);
  }
  if (cur.length) segments.push(cur);
  return segments;
}
