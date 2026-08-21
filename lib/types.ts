/** 行程 JSON 数据类型（导入/存储/渲染统一使用） */

/** 单个时间点（可带经纬度，用于地图打点） */
export interface TripItem {
  time?: string;
  title: string;
  desc?: string;
  place?: string;
  /** 从上一点到本点的交通方式，如「打车」「地铁2号线」「高铁」 */
  transport?: string;
  /** 转场预估时长，如「20分钟」「1h41m」 */
  transfer?: string;
  /** 转场预估距离，如「约5公里」「约40公里」 */
  distance?: string;
  /** 本点预估游玩时长（含拍照），如「2小时（含拍照）」 */
  visit?: string;
  /** 交通模式：flight=飞行段（不上地图）；其余为地面段 */
  mode?: string;
  /** 纬度（高德 GCJ-02），可省略 */
  lat?: number;
  /** 经度（高德 GCJ-02），可省略 */
  lng?: number;
}

/** 一天 */
export interface TripDay {
  /** 第几天，从 1 开始 */
  day: number;
  /** 日期，如 2026-09-04 */
  date?: string;
  title: string;
  city?: string;
  /** 当天住宿 */
  hotel?: string;
  /** 住宿经纬度（高德 GCJ-02），用于地图上黄色五角星独立标记 */
  hotelLat?: number;
  hotelLng?: number;
  items: TripItem[];
}

/** 完整行程 */
export interface Trip {
  title: string;
  dates?: string;
  description?: string;
  days: TripDay[];
}

/** 已保存的行程记录（含 id / blob 引用） */
export interface SavedTrip extends Trip {
  id: string;
  /** Vercel Blob 上的原始 JSON 地址（可选） */
  blobUrl?: string;
  createdAt: string;
}
