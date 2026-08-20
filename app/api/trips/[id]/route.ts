import { NextResponse } from "next/server";
import { getTrip, deleteTrip } from "@/lib/storage/trips";

export const runtime = "nodejs";

/** GET /api/trips/:id — 单条行程 */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const trip = await getTrip(id);
  if (!trip) return NextResponse.json({ error: "未找到" }, { status: 404 });
  return NextResponse.json(trip);
}

/** DELETE /api/trips/:id — 删除 */
export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await deleteTrip(id);
  return NextResponse.json({ ok: true });
}
