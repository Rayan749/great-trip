import type { Trip } from "./types";

/**
 * 第三版 · 慢游方案：不赶路、睡到自然醒，每天 2-4 个点、每点时长放长，保留核心看海与日落。
 * 日期与交通同晴天方案。
 */
export const RELAX_TRIP: Trip = {
  title: "青岛+威海四天三夜看海 · 慢游版",
  dates: "2026-09-04 ~ 09-07",
  description:
    "不特种兵：每天 2-4 个点、睡到自然醒，把时间留给大海。核心保留石老人看海、威海橘子海日落；舍弃赶早的日出与赶场。",
  days: [
    {
      day: 1,
      date: "2026-09-04",
      title: "慢抵青 · 石老人躺海一下午",
      city: "青岛",
      hotel: "全季酒店·青岛五四广场海景店（香港中路28号，住2晚）",
      hotelLat: 36.065221,
      hotelLng: 120.388233,
      items: [
        { time: "07:30", title: "MU6431 合肥→青岛", desc: "东航直飞，青岛胶东机场地铁直达市区", place: "合肥新桥机场", transport: "出发（乘机）", transfer: "飞行 1h15m", distance: "约660公里", visit: "乘机（约1.5h含候机）", mode: "flight", lat: 31.99, lng: 116.978 },
        { time: "11:30", title: "午餐 · 双合园", desc: "本地老字号，鲅鱼/虾三鲜水饺", place: "崂山区仙霞岭路48号", transport: "地铁/打车", transfer: "约40分钟", distance: "约50公里", visit: "1.5小时（慢吃）", lat: 36.098, lng: 120.461 },
        { time: "13:30", title: "石老人海水浴场（慢玩）", desc: "一下午就给它：沙滩躺平+3km木栈道散步+退潮海蚀洞，青岛最清净的大沙滩", place: "市南区东海中路", transport: "打车", transfer: "约15分钟", distance: "约6公里", visit: "3小时（含玩水/拍照/发呆）", lat: 36.095, lng: 120.492 },
        { time: "17:30", title: "第三海水浴场 · 灯光秀", desc: "傍晚玩水，晚间看五四广场灯光秀", place: "市南区第三海水浴场", transport: "打车", transfer: "约20分钟", distance: "约9公里", visit: "2小时（含晚间灯光秀）", lat: 36.059, lng: 120.371 },
        { time: "20:00", title: "晚餐 · 老东港蒸海鲜", desc: "全家福饺子+海鲜拼盘", place: "市南区大学路附近", transport: "打车", transfer: "约15分钟", distance: "约5公里", visit: "1.5小时（用餐）", lat: 36.067, lng: 120.334 },
      ],
    },
    {
      day: 2,
      date: "2026-09-05",
      title: "石老人日出 · 八大关慢逛",
      city: "青岛",
      hotel: "全季酒店·青岛五四广场海景店（香港中路28号）",
      hotelLat: 36.065221,
      hotelLng: 120.388233,
      items: [
        { time: "05:30", title: "石老人海水浴场 · 日出", desc: "早起看橘子海日出（唯一一次日出），看完回酒店补觉/早餐，上午自由休息", place: "市南区东海中路", transport: "打车", transfer: "约25分钟", distance: "约8公里", visit: "1小时（含日出+拍照）", lat: 36.095, lng: 120.492 },
        { time: "10:00", title: "八大关 → 第二海水浴场", desc: "梧桐大道+老洋房慢逛，尽头第二浴人少清净，坐海边喝杯咖啡", place: "市南区八大关", transport: "打车", transfer: "约15分钟", distance: "约5公里", visit: "2.5小时（含咖啡/拍照）", lat: 36.062, lng: 120.350 },
        { time: "13:00", title: "午餐", desc: "八大关/琴屿路沿线小店", place: "八大关附近", transport: "步行", transfer: "约10分钟", distance: "约1公里", visit: "1.5小时（慢吃）" },
        { time: "14:30", title: "燕儿岛山公园", desc: "花海木栈道+礁石，人少，坐着吹海风", place: "市南区燕儿岛", transport: "打车", transfer: "约15分钟", distance: "约5公里", visit: "1.5小时（含拍照）", lat: 36.057, lng: 120.401 },
        { time: "16:30", title: "琴屿路 → 小青岛", desc: "S弯海边公路慢走，看海军博物馆军舰", place: "市南区琴屿路", transport: "打车", transfer: "约10分钟", distance: "约4公里", visit: "1.5小时（含拍照）", lat: 36.061, lng: 120.338 },
        { time: "18:30", title: "台东步行街夜市", desc: "慢吃逛，铁板鸭肠/海肠捞饭", place: "市北区台东步行街", transport: "地铁/打车", transfer: "约20分钟", distance: "约6公里", visit: "1.5小时（逛吃）", lat: 36.091, lng: 120.370 },
      ],
    },
    {
      day: 3,
      date: "2026-09-06",
      title: "转场威海 · 一下午属于海",
      city: "威海",
      hotel: "全季酒店·威海山大海水浴场店（文化西路196号，住1晚）",
      hotelLat: 37.525818,
      hotelLng: 122.054027,
      items: [
        { time: "09:00", title: "青岛退房 → 青岛北站", desc: "行李随身，慢慢来", place: "青岛北站", transport: "地铁3号线", transfer: "约40分钟", distance: "约8公里", visit: "候车30分钟", lat: 36.190, lng: 120.397 },
        { time: "10:00", title: "高铁 青岛北→威海", desc: "二等约100-150元，约1h40m", place: "青岛北站", transport: "高铁", transfer: "约1h40m", distance: "约250公里", visit: "乘车", lat: 36.190, lng: 120.397 },
        { time: "12:30", title: "午餐 · 韩乐坊", desc: "韩式烤肉/部队锅，人均50", place: "威海韩乐坊", transport: "打车", transfer: "约20分钟", distance: "约7公里", visit: "1.5小时（慢吃）", lat: 37.474, lng: 122.141 },
        { time: "14:00", title: "刘公岛（慢游半日）", desc: "乘船约20分钟上岛；甲午战争博物馆、岛内观光车，海景+历史，不赶时间", place: "威海刘公岛", transport: "轮渡", transfer: "船程约20分钟", distance: "约3公里（船）", visit: "2.5小时（含博物馆/拍照）", lat: 37.499, lng: 122.183 },
        { time: "17:00", title: "国际海水浴场（傍晚）", desc: "蓝旗认证、免费、沙细水清；傍晚玩水/躺平", place: "威海国际海水浴场", transport: "打车", transfer: "约15分钟", distance: "约6公里", visit: "1.5小时（含玩水）", lat: 37.524, lng: 122.014 },
        { time: "18:30", title: "橘子海日落（全程唯一日落）", desc: "坐在沙滩等橘子海日落，看海日落天花板", place: "威海国际海水浴场", transport: "步行", transfer: "原地", distance: "0", visit: "1.5小时（含拍照）", lat: 37.524, lng: 122.014 },
        { time: "20:00", title: "晚餐 · 巧克力渔家", desc: "蒸汽海鲜锅+海肠捞饭+鲅鱼水饺", place: "威海韩乐坊", transport: "打车", transfer: "约15分钟", distance: "约6公里", visit: "1.5小时（用餐）", lat: 37.474, lng: 122.141 },
      ],
    },
    {
      day: 4,
      date: "2026-09-07",
      title: "慢收尾 · 下午飞南京",
      city: "威海",
      items: [
        { time: "09:30", title: "火炬八街", desc: "趁上午人少拍空镜，街道尽头就是大海", place: "威海火炬八街", transport: "打车", transfer: "约20分钟", distance: "约7公里", visit: "1小时（含拍照）", lat: 37.525, lng: 122.018 },
        { time: "11:00", title: "半月湾", desc: "人少沙滩，挖沙踏浪，慢玩", place: "威海半月湾", transport: "打车", transfer: "约15分钟", distance: "约8公里", visit: "1.5小时（含拍照）", lat: 37.501, lng: 122.104 },
        { time: "12:30", title: "午餐", desc: "韩乐坊或海边简餐", place: "威海韩乐坊", transport: "打车", transfer: "约15分钟", distance: "约8公里", visit: "1.5小时（慢吃）", lat: 37.474, lng: 122.141 },
        { time: "14:30", title: "出发大水泊机场", desc: "机场在文登区，约40-50分钟", place: "威海大水泊机场", transport: "打车/机场大巴", transfer: "约40-50分钟", distance: "约40公里", visit: "提前1.5h到机场", lat: 37.190, lng: 122.230 },
        { time: "17:15", title: "9C7757 威海→南京", desc: "春秋航空 17:15→18:55 南京禄口", place: "威海大水泊机场", transport: "航班", transfer: "1h40m", distance: "约800公里", visit: "飞行", mode: "flight", lat: 37.190, lng: 122.230 },
        { time: "20:20", title: "南京→合肥/杭州 高铁", desc: "禄口S1到南京南→高铁返程", place: "南京南站", transport: "地铁S1 + 高铁", transfer: "约1.5-2h", distance: "约45公里+车程", visit: "返程", lat: 31.971, lng: 118.798 },
      ],
    },
  ],
};
