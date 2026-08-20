import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "旅行规划 · Great Trip",
  description: "左地图 + 右可折叠行程单，JSON 导入，Vercel Postgres/Blob 存储",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="h-full">{children}</body>
    </html>
  );
}
