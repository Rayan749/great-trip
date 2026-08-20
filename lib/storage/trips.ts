import "server-only";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import crypto from "node:crypto";
import type { Trip, SavedTrip } from "../types";

/**
 * 存储抽象：
 * - 生产（有 POSTGRES_URL）：Vercel Postgres 存记录，Vercel Blob 存原始 JSON
 * - 本地开发（无 POSTGRES_URL）：回退到 data/trips.json 文件存储，保证 npm run dev 开箱即用
 */

const LOCAL_FILE = join(process.cwd(), "data", "trips.json");
const usePostgres = !!process.env.POSTGRES_URL;

/**
 * 生产环境必须使用 Vercel 官方 Postgres。
 * 缺少 POSTGRES_URL 时直接报错，避免在无状态 serverless 环境静默写临时文件（不持久）。
 */
function requirePostgresInProd() {
  if (process.env.NODE_ENV === "production" && !usePostgres) {
    throw new Error(
      "生产环境缺少 POSTGRES_URL：请先开通 Vercel Postgres（Storage → Create Database → Postgres）并注入环境变量后再部署。"
    );
  }
}

/* ---------------- 本地文件后端 ---------------- */

function readLocal(): SavedTrip[] {
  try {
    if (!existsSync(LOCAL_FILE)) return [];
    return JSON.parse(readFileSync(LOCAL_FILE, "utf8"));
  } catch {
    return [];
  }
}

function writeLocal(list: SavedTrip[]) {
  mkdirSync(join(process.cwd(), "data"), { recursive: true });
  writeFileSync(LOCAL_FILE, JSON.stringify(list, null, 2), "utf8");
}

/* ---------------- Postgres 后端 ---------------- */

async function ensureTable() {
  const { sql } = await import("@vercel/postgres");
  await sql`CREATE TABLE IF NOT EXISTS trips (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    start_date TEXT,
    end_date TEXT,
    blob_url TEXT,
    data JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
  )`;
}

function datesFromTrip(trip: Trip): { start?: string; end?: string } {
  // dates 格式：2026-09-04 ~ 09-07
  const d = trip.dates || "";
  const m = d.match(/(\d{4}-\d{2}-\d{2})\s*[~至\-]\s*(\d{2}-\d{2})/);
  if (m) return { start: m[1], end: m[1].slice(0, 8) + m[2] };
  const single = d.match(/(\d{4}-\d{2}-\d{2})/);
  if (single) return { start: single[1], end: single[1] };
  return {};
}

async function createWithBlob(rawJson: string): Promise<string | undefined> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return undefined;
  const { put } = await import("@vercel/blob");
  const blob = await put(`trips/${Date.now()}-${crypto.randomUUID().slice(0, 8)}.json`, rawJson, {
    contentType: "application/json",
    access: "private",
  });
  return blob.url;
}

/* ---------------- 统一接口 ---------------- */

export async function getTrips(): Promise<SavedTrip[]> {
  requirePostgresInProd();
  if (usePostgres) {
    await ensureTable();
    const { sql } = await import("@vercel/postgres");
    const rows = await sql`SELECT id, title, start_date, end_date, blob_url, data, created_at FROM trips ORDER BY created_at DESC`;
    return rows.rows.map((r: any) => ({
      ...r.data,
      id: r.id,
      blobUrl: r.blob_url || undefined,
      createdAt: r.created_at,
    }));
  }
  return readLocal();
}

export async function getTrip(id: string): Promise<SavedTrip | null> {
  const all = await getTrips();
  return all.find((t) => t.id === id) || null;
}

export async function createTrip(trip: Trip, rawJson: string): Promise<SavedTrip> {
  requirePostgresInProd();
  const id = crypto.randomUUID();
  const blobUrl = await createWithBlob(rawJson);
  const { start, end } = datesFromTrip(trip);
  const record: SavedTrip = {
    ...trip,
    id,
    blobUrl,
    createdAt: new Date().toISOString(),
  };

  if (usePostgres) {
    await ensureTable();
    const { sql } = await import("@vercel/postgres");
    await sql`INSERT INTO trips (id, title, start_date, end_date, blob_url, data)
      VALUES (${id}, ${trip.title}, ${start || null}, ${end || null}, ${blobUrl || null}, ${JSON.stringify(trip)})`;
  } else {
    const list = readLocal();
    list.unshift(record);
    writeLocal(list);
  }
  return record;
}

export async function deleteTrip(id: string): Promise<void> {
  requirePostgresInProd();
  if (usePostgres) {
    await ensureTable();
    const { sql } = await import("@vercel/postgres");
    await sql`DELETE FROM trips WHERE id = ${id}`;
  } else {
    const list = readLocal().filter((t) => t.id !== id);
    writeLocal(list);
  }
}
