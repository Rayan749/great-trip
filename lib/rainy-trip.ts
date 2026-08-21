import type { Trip } from "./types";

/**
 * 雨天备选方案：室内为主（博物馆/海洋馆/商场/美食），日期与交通同晴天方案。
 * 坐标/转场/距离为估算值。
 */
export const RAINY_TRIP: Trip = {
  title: "青岛+威海四天三夜看海 · 雨天方案",
  dates: "2026-09-04 ~ 09-07",
  description:
    "天气不好时的室内备选：博物馆、海洋馆、商场、美食为主，避开露天海滩。交通同晴天方案（往返飞机+威海高铁）。",
  days: [
    {
      day: 1,
      date: "2026-09-04",
      title: "雨天抵青 · 啤酒博物馆与老城",
      city: "青岛",
      hotel: "全季酒店·青岛五四广场海景店（香港中路28号，住2晚）",
      hotelLat: 36.065221,
      hotelLng: 120.388233,
      items: [
        { time: "07:30", title: "MU6431 合肥→青岛", desc: "东航直飞，青岛胶东机场地铁直达市区", place: "合肥新桥机场", transport: "出发（乘机）", transfer: "飞行 1h15m", distance: "约660公里", visit: "乘机（约1.5h含候机）", mode: "flight", lat: 31.99, lng: 116.978 },
        { time: "11:30", title: "午餐 · 双合园", desc: "本地老字号，鲅鱼/虾三鲜水饺", place: "崂山区仙霞岭路48号", transport: "地铁/打车", transfer: "约40分钟", distance: "约50公里", visit: "1小时（用餐）", lat: 36.098, lng: 120.461 },
        { time: "13:30", title: "青岛啤酒博物馆", desc: "室内；B馆45元含两杯啤酒，了解百年青啤历史，雨天避雨首选", place: "市北区登州路56号", transport: "打车", transfer: "约20分钟", distance: "约8公里", visit: "2小时（含品酒）", lat: 36.079, lng: 120.359 },
        { time: "15:30", title: "大鲍岛文化街区", desc: "骑楼+红砖老建筑，部分有顶棚，雨天漫步咖啡馆", place: "市北区大鲍岛", transport: "打车", transfer: "约15分钟", distance: "约4公里", visit: "1.5小时（含咖啡）", lat: 36.080, lng: 120.332 },
        { time: "18:00", title: "台东步行街夜市", desc: "室内小吃多，雨天逛吃不受影响", place: "市北区台东步行街", transport: "打车", transfer: "约10分钟", distance: "约2公里", visit: "1.5小时（逛吃）", lat: 36.091, lng: 120.370 },
        { time: "19:30", title: "晚餐 · 老东港蒸海鲜", desc: "全家福饺子+海鲜拼盘", place: "市南区大学路附近", transport: "打车", transfer: "约15分钟", distance: "约5公里", visit: "1.5小时（用餐）", lat: 36.067, lng: 120.334 },
      ],
    },
    {
      day: 2,
      date: "2026-09-05",
      title: "雨天 · 室内展馆日",
      city: "青岛",
      hotel: "全季酒店·青岛五四广场海景店（香港中路28号）",
      hotelLat: 36.065221,
      hotelLng: 120.388233,
      items: [
        { time: "09:00", title: "海军博物馆", desc: "室内展馆+可登军舰，雨天以室内馆为主；需提前预约", place: "市南区莱阳路8号", transport: "打车", transfer: "约20分钟", distance: "约7公里", visit: "2.5小时（含登舰）", lat: 36.061, lng: 120.336 },
        { time: "11:30", title: "青岛海底世界", desc: "室内，看海洋生物，雨天避雨", place: "市南区莱阳路2号", transport: "步行/打车", transfer: "约10分钟", distance: "约1公里", visit: "1.5小时", lat: 36.059, lng: 120.339 },
        { time: "13:00", title: "午餐", desc: "附近海鲜/快餐", place: "莱阳路附近", transport: "步行", transfer: "约5分钟", distance: "约500米", visit: "1小时（用餐）" },
        { time: "14:30", title: "极地海洋世界", desc: "室内，海豚白鲸表演，适合雨天全家玩", place: "崂山区东海东路60号", transport: "打车", transfer: "约20分钟", distance: "约10公里", visit: "2.5小时", lat: 36.070, lng: 120.435 },
        { time: "17:30", title: "万象城/商场", desc: "室内商场，逛街+咖啡+晚餐", place: "市南区万象城", transport: "打车", transfer: "约20分钟", distance: "约9公里", visit: "2小时", lat: 36.073, lng: 120.375 },
      ],
    },
    {
      day: 3,
      date: "2026-09-06",
      title: "雨天转威海 · 室内人文线",
      city: "威海",
      hotel: "全季酒店·威海山大海水浴场店（文化西路196号，住1晚）",
      hotelLat: 37.525818,
      hotelLng: 122.054027,
      items: [
        { time: "07:30", title: "青岛退房 → 青岛北站", desc: "行李随身", place: "青岛北站", transport: "地铁3号线", transfer: "约40分钟", distance: "约8公里", visit: "候车30分钟", lat: 36.190, lng: 120.397 },
        { time: "07:54", title: "G5335 青岛北→威海", desc: "二等152元，1h41m", place: "青岛北站", transport: "高铁", transfer: "1h41m", distance: "约250公里", visit: "乘车", lat: 36.190, lng: 120.397 },
        { time: "10:30", title: "威海市博物馆", desc: "免费，室内，了解威海海防与城市史", place: "威海环翠区", transport: "打车", transfer: "约20分钟", distance: "约7公里", visit: "1.5小时", lat: 37.490, lng: 122.120 },
        { time: "12:30", title: "午餐 · 韩乐坊", desc: "韩式料理/烤肉，室内", place: "威海韩乐坊", transport: "打车", transfer: "约15分钟", distance: "约5公里", visit: "1小时（用餐）", lat: 37.474, lng: 122.141 },
        { time: "14:00", title: "刘公岛（雨天·室内博物馆为主）", desc: "乘船约20分钟上岛，甲午战争博物馆等室内为主；雨天轮渡可能停航，出行前确认，停航则改威高海洋公园", place: "威海刘公岛", transport: "轮渡", transfer: "船程约20分钟", distance: "约3公里（船）", visit: "2.5小时", lat: 37.499, lng: 122.183 },
        { time: "17:00", title: "环翠楼/中心商场", desc: "室内商场+咖啡，晚上韩乐坊晚餐", place: "威海环翠区", transport: "打车", transfer: "约20分钟", distance: "约8公里", visit: "1.5小时", lat: 37.492, lng: 122.116 },
        { time: "18:30", title: "晚餐 · 韩乐坊", desc: "烤肉/部队锅，室内烟火气", place: "威海韩乐坊", transport: "打车", transfer: "约10分钟", distance: "约3公里", visit: "1.5小时（用餐）", lat: 37.474, lng: 122.141 },
      ],
    },
    {
      day: 4,
      date: "2026-09-07",
      title: "雨天收尾 · 下午飞南京",
      city: "威海",
      items: [
        { time: "09:00", title: "火炬八街（雨中）", desc: "雨天海雾别样氛围，拍几张照即可", place: "威海火炬八街", transport: "打车", transfer: "约20分钟", distance: "约7公里", visit: "40分钟（拍照）", lat: 37.525, lng: 122.018 },
        { time: "10:00", title: "威高广场/商场", desc: "室内逛街+咖啡，等雨或买伴手礼", place: "威海威高广场", transport: "打车", transfer: "约15分钟", distance: "约6公里", visit: "1.5小时", lat: 37.502, lng: 122.117 },
        { time: "12:00", title: "午餐", desc: "商场内或韩乐坊", place: "威海市区", transport: "打车", transfer: "约10分钟", distance: "约3公里", visit: "1小时（用餐）" },
        { time: "13:30", title: "出发大水泊机场", desc: "机场在文登区，雨天预留更多时间", place: "威海大水泊机场", transport: "打车/机场大巴", transfer: "约50分钟", distance: "约40公里", visit: "提前1.5h到机场", lat: 37.190, lng: 122.230 },
        { time: "17:15", title: "9C7757 威海→南京", desc: "春秋航空 17:15→18:55 南京禄口", place: "威海大水泊机场", transport: "航班", transfer: "1h40m", distance: "约800公里", visit: "飞行", mode: "flight", lat: 37.190, lng: 122.230 },
        { time: "20:20", title: "南京→合肥/杭州 高铁", desc: "禄口S1到南京南→高铁返程", place: "南京南站", transport: "地铁S1 + 高铁", transfer: "约1.5-2h", distance: "约45公里+车程", visit: "返程", lat: 31.971, lng: 118.798 },
      ],
    },
  ],
};
