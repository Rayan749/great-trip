"use client";

import { useRef, useState } from "react";
import { validateTrip } from "@/lib/validate";

interface Props {
  onImported: () => void;
}

type State =
  | { kind: "idle" }
  | { kind: "uploading" }
  | { kind: "ok"; msg: string }
  | { kind: "error"; msg: string };

/** JSON 行程导入（选择文件 / 拖拽） */
export default function ImportTrip({ onImported }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [state, setState] = useState<State>({ kind: "idle" });
  const [drag, setDrag] = useState(false);

  async function handleFile(file: File | undefined | null) {
    if (!file) return;
    setState({ kind: "uploading" });
    try {
      const text = await file.text();
      let data: unknown;
      try {
        data = JSON.parse(text);
      } catch {
        setState({ kind: "error", msg: "文件不是合法 JSON" });
        return;
      }
      const v = validateTrip(data);
      if (!v.ok) {
        setState({ kind: "error", msg: `校验失败：${v.error}` });
        return;
      }
      const res = await fetch("/api/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trip: v.trip }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setState({ kind: "error", msg: body.error || `导入失败 (${res.status})` });
        return;
      }
      setState({ kind: "ok", msg: `已导入「${v.trip.title}」` });
      onImported();
    } catch (e) {
      setState({ kind: "error", msg: "读取文件失败" });
    }
  }

  return (
    <div className="flex items-center gap-2">
      <input
        ref={inputRef}
        type="file"
        accept="application/json,.json"
        className="hidden"
        onChange={(e) => {
          handleFile(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
      <button
        onClick={() => inputRef.current?.click()}
        className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 transition-colors"
      >
        导入 JSON
      </button>
      <button
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); handleFile(e.dataTransfer.files?.[0]); }}
        className={`px-3 py-1.5 rounded-md border text-sm transition-colors ${
          drag ? "border-blue-500 text-blue-700" : "border-slate-300 text-slate-600 hover:border-slate-400"
        }`}
      >
        拖拽 / 选择
      </button>
      {state.kind === "uploading" && <span className="text-xs text-slate-500">上传中…</span>}
      {state.kind === "ok" && <span className="text-xs text-green-600">{state.msg}</span>}
      {state.kind === "error" && <span className="text-xs text-red-500">{state.msg}</span>}
    </div>
  );
}
