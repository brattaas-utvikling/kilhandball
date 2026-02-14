import * as React from "react"
import { cn } from "@/lib/utils"
import { UTHEME, type UTheme } from "./theme"

/* ── Section title ───────────────────────────────────────────
   Consistent across ALL section types.
   Icon in a solid theme-colored rounded square.              */

export function SectionTitle({
  icon,
  title,
  theme = "red",
}: {
  icon: React.ReactNode
  title: string
  theme?: UTheme
}) {
  const t = UTHEME[theme]
  return (
    <div className="flex items-center gap-4 mb-5">
      <div className={cn("shrink-0", t.tagText)}>
        {icon}
      </div>
      <h2 className="text-xl font-anton tracking-wide uppercase sm:text-2xl">{title}</h2>
    </div>
  )
}

/* ── Paragraphs ──────────────────────────────────────────── */

export function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="space-y-3">
      {items.map((p, i) => (
        <p key={i} className="text-kilsvart-600 text-sm leading-relaxed">
          {p}
        </p>
      ))}
    </div>
  )
}

/* ── Callout ─────────────────────────────────────────────── 
   "info"  → full theme color bg, white text
   "danger" → kilred full bg, white text                      */

export function Callout({
  tone = "info",
  title,
  text,
  theme = "blue",
}: {
  tone?: "info" | "danger"
  title?: string
  text: string
  theme?: UTheme
}) {
  const t = UTHEME[theme]
  const isDanger = tone === "danger"
  return (
    <div
      className={cn(
        "rounded-xl px-5 py-4",
        isDanger ? "bg-kilred" : t.calloutBg
      )}
    >
      <p className="text-sm leading-relaxed text-white">
        {title ? <strong className="font-bold">{title}: </strong> : null}
        {text}
      </p>
    </div>
  )
}

/* ── Comparison cards ────────────────────────────────────── 
   Solid theme-colored header strip, white body.              */

export function ComparisonCard({
  heading,
  text,
  tone = "blue",
}: {
  heading: string
  text: string
  tone: "blue" | "red"
}) {
  const isBlue = tone === "blue"
  return (
    <div className="rounded-xl overflow-hidden border border-kilsvart-50">
      <div className={cn("px-5 py-3", isBlue ? "bg-kilblue" : "bg-kilred")}>
        <h4 className="font-anton text-sm uppercase tracking-widest text-white">
          {heading}
        </h4>
      </div>
      <div className="p-5">
        <p className="text-kilsvart-600 text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  )
}

/* ── Source link ──────────────────────────────────────────── */

export function SourceLink({
  label,
  url,
  theme = "blue",
}: {
  label: string
  url: string
  theme?: UTheme
}) {
  const t = UTHEME[theme]
  return (
    <p className="text-sm text-kilsvart-500">
      <strong>Kilde:</strong>{" "}
      <a href={url} className={cn("underline", t.tagText)} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    </p>
  )
}

/* ── Progresjon table ────────────────────────────────────── */

export function ProgresjonTable({
  rows,
  theme = "blue",
}: {
  rows: Array<{ level: number; age: string; sessions: string; days: string }>
  theme?: UTheme
}) {
  const t = UTHEME[theme]
  return (
    <div className="overflow-x-auto rounded-xl border border-kilsvart-50">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className={cn("text-white", t.calloutBg)}>
            <th className="px-4 py-3 font-anton tracking-wide text-xs uppercase">Nivå</th>
            <th className="px-4 py-3 font-anton tracking-wide text-xs uppercase">Alder</th>
            <th className="px-4 py-3 font-anton tracking-wide text-xs uppercase">Økter</th>
            <th className="px-4 py-3 font-anton tracking-wide text-xs uppercase">Dager / timer</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-kilsvart-50/30" : "bg-white"}>
              <td className="px-4 py-3 font-bold font-anton">Nivå {r.level}</td>
              <td className="px-4 py-3 text-kilsvart-600">{r.age} år</td>
              <td className="px-4 py-3 text-kilsvart-600">{r.sessions}</td>
              <td className="px-4 py-3 text-kilsvart-600">{r.days}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ── Resource grid ───────────────────────────────────────── */

export function ResourceGrid({
  items,
  theme = "darkSoft",
}: {
  items: Array<{ title: string; desc: string; url: string }>
  theme?: UTheme
}) {
  const t = UTHEME[theme]
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {items.map((r, i) => (
        <a
          key={i}
          href={r.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-4 rounded-lg border border-kilsvart-50 hover:shadow-md transition-all group"
        >
          <h5 className={cn("font-semibold text-kilsvart transition-colors", `group-hover:${t.tagText}`)}>
            {r.title}
          </h5>
          <p className="text-kilsvart-400 text-sm mt-1">{r.desc}</p>
        </a>
      ))}
    </div>
  )
}