import type { Trip } from "./types";

/**
 * 种子示例：青岛+威海四天三夜看海行程（合肥出发 · 人少优先版）
 * 坐标/转场/距离/游玩时长为估算，仅作规划参考。
 */
export const SAMPLE_TRIP: Trip = {
  title: "青岛+威海四天三夜看海",
  dates: "2026-09-04 ~ 09-07",
  description:
    "往返开环票：9/4 MU6431 合肥→青岛 → 9/6 高铁转威海 → 9/7 9C7757 威海→南京。青岛2晚+威海1晚，仅1次搬行李；人少优先。",
  days: [
    {
      day: 1,
      date: "2026-09-04",
      title: "早机抵青 · 午后海岸慢逛",
      city: "青岛",
      hotel: "五四广场/奥帆片区（住2晚）",
      items: [
        { time: "07:30", title: "MU6431 合肥→青岛", desc: "东航直飞，青岛胶东机场地铁直达市区", place: "合肥新桥机场", transport: "出发（乘机）", transfer: "飞行 1h15m", distance: "约660公里", visit: "乘机（约1.5h含候机）", mode: "flight", lat: 31.99, lng: 116.978 },
        { time: "11:30", title: "午餐 · 双合园", desc: "本地老字号，鲅鱼/虾三鲜水饺、老青岛炸肉", place: "崂山区仙霞岭路48号", transport: "地铁/打车", transfer: "约40分钟", distance: "约50公里", visit: "1小时（用餐）", lat: 36.098, lng: 120.461 },
        { time: "13:30", title: "海之恋公园 + 雕塑园", desc: "人少景美，海边草坪+海景步道，随手出片", place: "崂山区海之恋公园", transport: "打车", transfer: "约15分钟", distance: "约7公里", visit: "1.5小时（含拍照）", lat: 36.078, lng: 120.450 },
        { time: "15:30", title: "第三海水浴场", desc: "白天沙滩玩水出片；晚间看五四广场灯光秀（曼哈顿夜景既视感）", place: "市南区第三海水浴场", transport: "打车", transfer: "约20分钟", distance: "约9公里", visit: "2.5小时（含玩水+晚间灯光秀）", lat: 36.059, lng: 120.371 },
        { time: "19:30", title: "晚餐 · 老东港蒸海鲜", desc: "全家福饺子+海鲜拼盘，性价比高", place: "市南区大学路附近", transport: "打车", transfer: "约15分钟", distance: "约5公里", visit: "1.5小时（用餐）", lat: 36.067, lng: 120.334 },
      ],
    },
    {
      day: 2,
      date: "2026-09-05",
      title: "石老人日出 · 市区山海线（东向西）",
      city: "青岛",
      hotel: "五四广场/奥帆片区",
      items: [
        { time: "05:30", title: "石老人海水浴场 · 日出", desc: "青岛看日出首选：海蚀柱+橘子海日出，人少；全程唯一一次日出", place: "市南区东海中路", transport: "打车", transfer: "约25分钟", distance: "约8公里", visit: "1.5小时（含日出+拍照）", lat: 36.095, lng: 120.492 },
        { time: "08:00", title: "早餐", desc: "酒店或附近小吃", place: "住宿附近", transport: "打车", transfer: "约15分钟", distance: "约5公里", visit: "40分钟" },
        { time: "09:00", title: "燕儿岛山公园", desc: "花海木栈道+礁石，人少氛围感（定位西门进）", place: "市南区燕儿岛", transport: "打车", transfer: "约15分钟", distance: "约6公里", visit: "1.5小时（含拍照）", lat: 36.057, lng: 120.401 },
        { time: "10:30", title: "奥帆中心轮渡", desc: "79元，日间班次，海上看青岛海岸线（坐二楼）", place: "市南区奥帆中心", transport: "打车", transfer: "约10分钟", distance: "约2公里", visit: "1.5小时", lat: 36.062, lng: 120.391 },
        { time: "12:30", title: "午餐", desc: "奥帆/八大关沿线小店", place: "奥帆中心附近", transport: "步行", transfer: "约10分钟", distance: "约1公里", visit: "1小时（用餐）" },
        { time: "13:30", title: "八大关 → 第二海水浴场", desc: "花石楼8元，梧桐大道+老洋房；尽头第二海水浴场人少清净、沙细", place: "市南区八大关", transport: "打车", transfer: "约15分钟", distance: "约5公里", visit: "2小时（含拍照）", lat: 36.062, lng: 120.350 },
        { time: "15:30", title: "琴屿路 → 小青岛", desc: "S弯海边公路，沿途看海军博物馆军舰", place: "市南区琴屿路", transport: "打车", transfer: "约10分钟", distance: "约3公里", visit: "1.5小时（含拍照）", lat: 36.061, lng: 120.338 },
        { time: "17:00", title: "小鱼山", desc: "5分钟登顶，红瓦老城+海岸线；比信号山人少、树少视野好", place: "市南区鱼山路", transport: "打车", transfer: "约10分钟", distance: "约1公里", visit: "1小时（含拍照）", lat: 36.061, lng: 120.336 },
        { time: "18:30", title: "台东步行街夜市", desc: "小吃摊、铁板鸭肠；或即墨老公社海肠捞饭", place: "市北区台东步行街", transport: "地铁/打车", transfer: "约20分钟", distance: "约6公里", visit: "1.5小时（逛吃）", lat: 36.091, lng: 120.370 },
      ],
    },
    {
      day: 3,
      date: "2026-09-06",
      title: "威海 · 刘公岛 + 蓝旗海滩",
      city: "威海",
      hotel: "国际海水浴场周边（住1晚）",
      items: [
        { time: "07:30", title: "青岛退房 → 青岛北站", desc: "行李随身，仅搬一次", place: "青岛北站", transport: "地铁3号线", transfer: "约40分钟", distance: "约8公里", visit: "候车30分钟", lat: 36.190, lng: 120.397 },
        { time: "07:54", title: "G5335 青岛北→威海", desc: "二等152元，1h41m", place: "青岛北站", transport: "高铁", transfer: "1h41m", distance: "约250公里", visit: "乘车", lat: 36.190, lng: 120.397 },
        { time: "10:30", title: "寄存行李 → 威海旅游码头", desc: "酒店放行李后打车到码头", place: "威海旅游码头", transport: "打车", transfer: "约25分钟", distance: "约7公里", visit: "30分钟", lat: 37.502, lng: 122.153 },
        { time: "11:00", title: "刘公岛", desc: "乘船约20分钟上岛；甲午战争博物馆、北洋海军公所、岛内观光车；海景+历史，人少出片", place: "威海刘公岛", transport: "轮渡", transfer: "船程约20分钟", distance: "约3公里（船）", visit: "3.5小时（含拍照/博物馆）", lat: 37.499, lng: 122.183 },
        { time: "14:30", title: "午餐 · 韩乐坊", desc: "韩式烤肉/部队锅，人均50；或码头附近海鲜", place: "威海韩乐坊", transport: "打车", transfer: "约15分钟", distance: "约7公里", visit: "1小时（用餐）", lat: 37.474, lng: 122.141 },
        { time: "15:30", title: "国际海水浴场", desc: "威海看海天花板、蓝旗认证（2026-05）、免费、沙细水清、坡缓浪小", place: "威海国际海水浴场", transport: "打车", transfer: "约15分钟", distance: "约6公里", visit: "2小时（含玩水/拍照）", lat: 37.524, lng: 122.014 },
        { time: "17:00", title: "猫头山 2/3号观景台", desc: "悬崖+大海同框，人少出片", place: "威海环海路猫头山", transport: "打车", transfer: "约25分钟", distance: "约10公里", visit: "1小时（含拍照）", lat: 37.506, lng: 122.093 },
        { time: "18:30", title: "橘子海日落（全程唯一一次日落）", desc: "回威海国际浴场看日落——蓝旗海滩+橘子海，看海日落天花板；晚餐巧克力渔家/赶海归来", place: "威海国际海水浴场", transport: "打车", transfer: "约20分钟", distance: "约10公里", visit: "1.5小时（含拍照）", lat: 37.524, lng: 122.014 },
      ],
    },
    {
      day: 4,
      date: "2026-09-07",
      title: "威海收尾 · 下午飞南京",
      city: "威海",
      items: [
        { time: "07:30", title: "火炬八街", desc: "趁早拍空镜（街道尽头就是大海）；晚去人挤人", place: "威海火炬八街", transport: "打车", transfer: "约20分钟", distance: "约7公里", visit: "1小时（含拍照）", lat: 37.525, lng: 122.018 },
        { time: "09:00", title: "半月湾", desc: "清晨人少，挖沙踏浪；或国际浴场再吹海风", place: "威海半月湾", transport: "打车", transfer: "约15分钟", distance: "约8公里", visit: "1.5小时（含拍照）", lat: 37.501, lng: 122.104 },
        { time: "11:00", title: "午餐", desc: "韩乐坊或海边简餐", place: "威海韩乐坊", transport: "打车", transfer: "约15分钟", distance: "约8公里", visit: "1小时（用餐）", lat: 37.474, lng: 122.141 },
        { time: "12:30", title: "出发大水泊机场", desc: "机场在文登区，距市区40-50分钟；17:15起飞建议14:30前到", place: "威海大水泊机场", transport: "打车/机场大巴", transfer: "约40-50分钟", distance: "约40公里", visit: "提前1.5h到机场", lat: 37.190, lng: 122.230 },
        { time: "17:15", title: "9C7757 威海→南京", desc: "春秋航空 17:15→18:55 南京禄口", place: "威海大水泊机场", transport: "航班", transfer: "1h40m", distance: "约800公里", visit: "飞行", mode: "flight", lat: 37.190, lng: 122.230 },
        { time: "20:20", title: "南京→合肥/杭州 高铁", desc: "禄口S1到南京南→高铁返合肥（约1h）或杭州（约1h-1.5h），末班23:48/22:37", place: "南京南站", transport: "地铁S1 + 高铁", transfer: "约1.5-2h", distance: "约45公里+车程", visit: "返程", lat: 31.971, lng: 118.798 },
      ],
    },
  ],
};
