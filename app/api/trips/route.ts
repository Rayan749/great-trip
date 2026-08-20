import { NextResponse } from "next/server";
import { getTrips, createTrip } from "@/lib/storage/trips";
import { validateTrip } from "@/lib/validate";

export const runtime = "nodejs";

/** GET /api/trips — 行程列表 */
export async function GET() {
  try {
    const trips = await getTrips();
    return NextResponse.json(trips);
  } catch (e) {
    console.error("GET /api/trips", e);
    return NextResponse.json({ error: "读取行程列表失败" }, { status: 500 });
  }
}

/** POST /api/trips — 导入一份行程（body: 行程 JSON，或 { trip: 行程 JSON }） */
export async function POST(req: Request) {
  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "请求体不是合法 JSON" }, { status: 400 });
    }
    const input =
      body && typeof body === "object" && "trip" in (body as object) ? (body as { trip: unknown }).trip : body;
    const v = validateTrip(input);
    if (!v.ok) return NextResponse.json({ error: v.error }, { status: 400 });

    const rawJson = JSON.stringify(v.trip);
    const saved = await createTrip(v.trip, rawJson);
    return NextResponse.json(saved, { status: 201 });
  } catch (e) {
    console.error("POST /api/trips", e);
    return NextResponse.json({ error: "保存失败" }, { status: 500 });
  }
}
