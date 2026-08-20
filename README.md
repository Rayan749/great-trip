# Great Trip · 旅行规划

左地图 + 右可折叠行程单的旅行规划 Web 应用。行程数据为 JSON（可导入），记录存储在 Vercel Postgres（结构化记录）+ Vercel Blob（原始 JSON 文件）。

## 功能

- 🗺️ 高德地图按天展示行程（Day 切换，当天路线连线）
- 📋 可折叠行程单：逐日卡片，每项含交通方式、转场时长、预估游玩时长（含拍照）
- 🔗 地图 ↔ 行程单双向联动
- 📥 JSON 行程导入（拖拽/选择文件，前端校验后入库）
- 💾 Vercel Postgres + Blob 持久化；本地开发回退到 `data/trips.json` 文件存储

## 技术栈

Next.js 16（App Router）· TypeScript · Tailwind CSS v4 · 高德地图（@amap/amap-jsapi-loader）· Vercel Postgres · Vercel Blob

## 本地开发

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # 构建
```

### 环境变量（.env.local）

```bash
# 高德地图 JS API（https://console.amap.com 申请，需把 localhost 与部署域名加入白名单）
NEXT_PUBLIC_AMAP_KEY=
NEXT_PUBLIC_AMAP_SECURITY_CODE=

# Vercel 存储（部署时由 Vercel 注入；本地留空则用文件存储）
POSTGRES_URL=
BLOB_READ_WRITE_TOKEN=
```

## 行程 JSON 结构

```json
{
  "title": "行程名称",
  "dates": "2026-09-04 ~ 09-07",
  "days": [
    {
      "day": 1,
      "date": "2026-09-04",
      "title": "Day1 标题",
      "city": "城市",
      "hotel": "住宿",
      "items": [
        {
          "time": "07:30",
          "title": "景点/事项",
          "desc": "说明",
          "place": "地点",
          "transport": "打车",
          "transfer": "20分钟",
          "visit": "2小时（含拍照）",
          "lat": 36.095,
          "lng": 120.492
        }
      ]
    }
  ]
}
```

`lat/lng` 可选，有坐标的条目会在地图上打点。`transport`/`transfer`/`visit` 可选。

## 部署到 Vercel

```bash
vercel login
vercel link        # 关联项目
vercel deploy --prod
```

在 Vercel 控制台开通 **Postgres + Blob** 并注入环境变量；**把线上域名加入高德 JS API 白名单**。
