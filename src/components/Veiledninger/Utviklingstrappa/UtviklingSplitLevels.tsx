// src/components/sections/UtviklingSplitLevels.tsx
import * as React from "react"
import { cn } from "@/lib/utils"
import { UTHEME, type UTheme } from "./theme"
import { FordypningButton } from "./DeepDiveModal"
import { Collapse } from "./Collapse"


export type DeepDiveRef = {
  label: string
  modalId: string
}

export type LevelItemGroup = { heading: string; subItems: string[] }
export type LevelItem = string | LevelItemGroup

export type UtviklingLevel = {
  level: number
  age: string
  sub: string
  items: LevelItem[]
  deepDives?: DeepDiveRef[]
}

/** Flatten items to a list of { text, groupHeading?, isFirstInGroup? } for numbered rendering */
type FlatItem = { text: string; groupHeading?: string; isFirstInGroup?: boolean }
function flattenItems(items: LevelItem[]): FlatItem[] {
  const out: FlatItem[] = []
  for (const item of items) {
    if (typeof item === "string") {
      out.push({ text: item })
    } else {
      item.subItems.forEach((sub, i) => {
        out.push({ text: sub, groupHeading: item.heading, isFirstInGroup: i === 0 })
      })
    }
  }
  return out
}

type Props = {
  title: string
  tagLabel: string
  levels: UtviklingLevel[]
  theme?: UTheme
  className?: string
  onOpenModal?: (modalId: string, theme: UTheme) => void
}

function pad2(n: number) {
  return String(n).padStart(2, "0")
}

function PatternOverlay({ size = 32 }: { size?: number }) {
  const uri = `url("data:image/svg+xml,%3Csvg width='${size}' height='${size}' viewBox='0 0 ${size} ${size}' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M${size / 2} ${size / 2}h${size / 2}v${size / 2}H${size / 2}z'/%3E%3C/g%3E%3C/svg%3E")`
  return <div aria-hidden className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: uri }} />
}

/** Handle arrow keys on tabs per WAI-ARIA tabs pattern */
function useTabKeyboard(count: number, setActive: (i: number) => void) {
  return React.useCallback(
    (e: React.KeyboardEvent, currentIndex: number) => {
      let next: number | null = null

      if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (currentIndex + 1) % count
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (currentIndex - 1 + count) % count
      else if (e.key === "Home") next = 0
      else if (e.key === "End") next = count - 1

      if (next !== null) {
        e.preventDefault()
        setActive(next)

        // Focus the new tab button
        const tablist = (e.target as HTMLElement).closest('[role="tablist"]')
        if (tablist) {
          const buttons = tablist.querySelectorAll<HTMLButtonElement>('[role="tab"]')
          buttons[next]?.focus()
        }
      }
    },
    [count, setActive]
  )
}

function ItemsList({
  items,
  theme,
  variant,
}: {
  items: LevelItem[]
  theme: UTheme
  variant: "mobile" | "desktop"
}) {
  const t = UTHEME[theme]
  const flat = React.useMemo(() => flattenItems(items), [items])

  const cols =
    variant === "mobile"
      ? "grid-cols-[3px_32px_1fr] gap-3"
      : "grid-cols-[4px_40px_1fr] gap-4"

  const numSize =
    variant === "mobile"
      ? "text-base"
      : "text-lg lg:text-[22px]"

  const ml =
    variant === "mobile"
      ? "ml-[44px]"
      : "ml-[56px]"

  const liPad =
    variant === "mobile"
      ? "py-3.5"
      : "py-3.5 lg:py-4"

  const bodyText =
    variant === "mobile"
      ? "text-sm"
      : "text-sm lg:text-[15px]"

  return (
    <ol className="divide-y divide-kilsvart-50">
      {flat.map((fi, i) => {
        const opacity = 0.15 + (i / Math.max(1, flat.length - 1)) * 0.85
        return (
          <li
            key={i}
            className={cn(liPad, fi.isFirstInGroup && i > 0 && "border-t-2 border-kilsvart-100")}
          >
            {fi.isFirstInGroup && (
              <p className={cn("mb-2 text-[11px] font-bold uppercase tracking-wider text-kilsvart-400", ml, variant === "desktop" && "lg:text-xs")}>
                {fi.groupHeading}
              </p>
            )}

            <div className={cn("grid items-stretch", cols)}>
              <span aria-hidden className={cn(variant === "mobile" ? "rounded-sm" : "rounded", t.stripe)} style={{ opacity }} />
              <span
                aria-hidden
                className={cn("flex items-center justify-center font-anton leading-none text-kilsvart-100", numSize)}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className={cn("m-0 flex items-center leading-relaxed text-kilsvart-600", bodyText)}>{fi.text}</p>
            </div>
          </li>
        )
      })}
    </ol>
  )
}

export function UtviklingSplitLevels({
  title,
  tagLabel,
  levels,
  theme = "red",
  className,
  onOpenModal,
}: Props) {
  const t = UTHEME[theme]
  const [active, setActive] = React.useState(0)
  const c = levels[active]
  const handleKeyDown = useTabKeyboard(levels.length, setActive)

  const baseId = React.useMemo(() => title.replace(/\s+/g, "-").toLowerCase(), [title])
  const tabId = (i: number) => `utv-tab-${baseId}-${i}`
  const panelId = (i: number) => `utv-panel-${baseId}-${i}`

  const renderDeepDives = (level: UtviklingLevel, visible: boolean) => {
    const hasDives = !!(level.deepDives?.length && onOpenModal)
    if (!visible || !hasDives) return null

    return (
      <div className="mt-5 pt-5 border-t border-kilsvart-50">
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-kilsvart-300 mb-3">Fordypning</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {level.deepDives!.map((dd) => (
            <FordypningButton
              key={dd.modalId}
              label={dd.label}
              onClick={() => onOpenModal!(dd.modalId, theme)}
              theme={theme}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <section className={cn("w-full bg-white text-kilsvart", className)}>
      <header className="flex items-center justify-between border-b border-kilsvart-50 px-5 py-4 sm:px-8 sm:py-5">
        <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-kilsvart-400 sm:text-[11px] sm:tracking-[0.35em]">
          {title}
        </span>
        <span
          className={cn(
            "text-[10px] font-semibold uppercase tracking-[0.3em] sm:text-[11px] sm:tracking-[0.35em]",
            t.tagText
          )}
        >
          {tagLabel}
        </span>
      </header>

      {/* ── MOBILE ── */}
      <div className="sm:hidden">
        <div className={cn("relative overflow-hidden bg-gradient-to-br px-5 pb-7 pt-8 text-white", t.panel)}>
          <PatternOverlay size={32} />
          <div className="relative z-10">
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-anton text-[72px] leading-none tracking-[-0.08em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.15)]">
                {pad2(c.level)}
              </span>
              <div className="text-right">
                <p className="m-0 text-[11px] font-medium tracking-[0.08em] text-white/70">{c.age}</p>
                <p className="m-0 mt-1 font-anton text-[18px] uppercase tracking-[0.04em] min-h-[2.6em]">{c.sub}</p>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-1.5">
              {levels.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Gå til nivå ${levels[i].level}`}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
                    i === active ? "w-6 bg-white" : "w-2 bg-white/30"
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        <div role="tablist" aria-label="Nivåer" className="flex overflow-x-auto items-end border-b border-kilsvart-100 px-3">
          {levels.map((l, i) => (
            <button
              key={l.level}
              id={tabId(i)}
              role="tab"
              aria-selected={i === active}
              aria-controls={panelId(i)}
              tabIndex={i === active ? 0 : -1}
              type="button"
              onClick={() => setActive(i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className={cn(
                "shrink-0 whitespace-nowrap px-4 py-2.5 text-xs font-semibold",
                "rounded-t-lg border border-b-0 transition-colors duration-200",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                t.focus,
                i === active
                  ? cn("bg-white border-kilsvart-100 -mb-px z-10", t.tagText)
                  : "bg-kilsvart-50/50 border-transparent text-kilsvart-400"
              )}
            >
              Nivå {l.level}
            </button>
          ))}
        </div>

        {/* CSS-only dynamic height + animation */}
        <div className="px-5 pb-14 pt-4">
          {levels.map((level, li) => (
            <Collapse key={level.level} open={li === active}>
              <div id={panelId(li)} role="tabpanel" aria-labelledby={tabId(li)}>
                <ItemsList items={level.items} theme={theme} variant="mobile" />
                {renderDeepDives(level, li === active)}
              </div>
            </Collapse>
          ))}
        </div>
      </div>

      {/* ── TABLET + DESKTOP ── */}
      <div className="hidden sm:block">
        <div className="grid grid-cols-1 sm:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          {/* Aside column */}
          <div className={cn("relative overflow-hidden bg-gradient-to-b", t.panel)}>
            <PatternOverlay size={40} />
            <div className="sticky top-0 relative z-10 flex flex-col items-center text-center text-white px-4 py-10 lg:px-6 lg:py-14">
              <div className="font-anton leading-none tracking-[-0.08em] text-[100px] lg:text-[140px] drop-shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
                {pad2(c.level)}
              </div>
              <p className="mt-1 text-[13px] font-medium tracking-[0.08em] text-white/70">{c.age}</p>
              <p className="mt-3 font-anton text-base uppercase tracking-[0.05em] lg:text-lg min-h-[2.8em] lg:min-h-[3em]">
                {c.sub}
              </p>
              <div className="mt-8 flex items-center justify-center gap-2">
                {levels.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Gå til nivå ${levels[i].level}`}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
                      i === active ? "w-7 bg-white" : "w-2 bg-white/30"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="px-6 lg:px-10">
            <div role="tablist" aria-label="Nivåer" className="flex items-end gap-0 border-b border-kilsvart-100">
              {levels.map((l, i) => (
                <button
                  key={l.level}
                  id={tabId(i)}
                  role="tab"
                  aria-selected={i === active}
                  aria-controls={panelId(i)}
                  tabIndex={i === active ? 0 : -1}
                  type="button"
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className={cn(
                    "relative px-5 py-2.5 text-xs font-semibold tracking-wide transition-colors lg:px-6 lg:py-3 lg:text-[13px]",
                    "rounded-t-lg border border-b-0",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                    t.focus,
                    i === active
                      ? cn("bg-white border-kilsvart-100 -mb-px z-10", t.tagText)
                      : "bg-kilsvart-50/50 border-transparent text-kilsvart-400 hover:text-kilsvart-600 hover:bg-kilsvart-50"
                  )}
                >
                  Nivå {l.level}
                </button>
              ))}
            </div>

            <div className="py-7 lg:py-10">
              {/* CSS-only dynamic height + animation */}
              {levels.map((level, li) => (
                <Collapse key={level.level} open={li === active}>
                  <div id={panelId(li)} role="tabpanel" aria-labelledby={tabId(li)}>
                    <ItemsList items={level.items} theme={theme} variant="desktop" />
                    {renderDeepDives(level, li === active)}
                  </div>
                </Collapse>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


// import * as React from "react"
// import { cn } from "@/lib/utils"
// import { UTHEME, type UTheme } from "./theme"
// import { FordypningButton } from "./DeepDiveModal"

// export type DeepDiveRef = {
//   label: string
//   modalId: string
// }

// export type LevelItemGroup = { heading: string; subItems: string[] }
// export type LevelItem = string | LevelItemGroup

// export type UtviklingLevel = {
//   level: number
//   age: string
//   sub: string
//   items: LevelItem[]
//   deepDives?: DeepDiveRef[]
// }

// /** Flatten items to a list of { text, groupHeading?, isFirst? } for numbered rendering */
// type FlatItem = { text: string; groupHeading?: string; isFirstInGroup?: boolean }
// function flattenItems(items: LevelItem[]): FlatItem[] {
//   const out: FlatItem[] = []
//   for (const item of items) {
//     if (typeof item === "string") {
//       out.push({ text: item })
//     } else {
//       item.subItems.forEach((sub, i) => {
//         out.push({ text: sub, groupHeading: item.heading, isFirstInGroup: i === 0 })
//       })
//     }
//   }
//   return out
// }

// type Props = {
//   title: string
//   tagLabel: string
//   levels: UtviklingLevel[]
//   theme?: UTheme
//   className?: string
//   onOpenModal?: (modalId: string, theme: UTheme) => void
// }

// function pad2(n: number) {
//   return String(n).padStart(2, "0")
// }

// function PatternOverlay({ size = 32 }: { size?: number }) {
//   const uri = `url("data:image/svg+xml,%3Csvg width='${size}' height='${size}' viewBox='0 0 ${size} ${size}' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M${size / 2} ${size / 2}h${size / 2}v${size / 2}H${size / 2}z'/%3E%3C/g%3E%3C/svg%3E")`
//   return <div aria-hidden className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: uri }} />
// }

// /** Handle left/right arrow keys on tabs per WAI-ARIA tabs pattern */
// function useTabKeyboard(count: number, setActive: (i: number) => void) {
//   return React.useCallback(
//     (e: React.KeyboardEvent, currentIndex: number) => {
//       let next: number | null = null
//       if (e.key === "ArrowRight" || e.key === "ArrowDown") {
//         next = (currentIndex + 1) % count
//       } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
//         next = (currentIndex - 1 + count) % count
//       } else if (e.key === "Home") {
//         next = 0
//       } else if (e.key === "End") {
//         next = count - 1
//       }
//       if (next !== null) {
//         e.preventDefault()
//         setActive(next)
//         // Focus the new tab button
//         const tablist = (e.target as HTMLElement).closest('[role="tablist"]')
//         if (tablist) {
//           const buttons = tablist.querySelectorAll<HTMLButtonElement>('[role="tab"]')
//           buttons[next]?.focus()
//         }
//       }
//     },
//     [count, setActive]
//   )
// }

// export function UtviklingSplitLevels({ title, tagLabel, levels, theme = "red", className, onOpenModal }: Props) {
//   const t = UTHEME[theme]
//   const [active, setActive] = React.useState(0)
//   const c = levels[active]
//   const handleKeyDown = useTabKeyboard(levels.length, setActive)

//   const baseId = React.useMemo(() => title.replace(/\s+/g, "-").toLowerCase(), [title])
//   const tabId = (i: number) => `utv-tab-${baseId}-${i}`
//   const panelId = (i: number) => `utv-panel-${baseId}-${i}`

//   /** Max deep-dive rows across all levels (for reserving height) */
//   const maxDeepDiveRows = React.useMemo(() => {
//     let max = 0
//     for (const level of levels) {
//       if (!level.deepDives?.length) continue
//       const rows = Math.ceil(level.deepDives.length / 2)
//       if (rows > max) max = rows
//     }
//     return max
//   }, [levels])

//   /** Active level: real buttons. Inactive: lightweight spacer with same height. */
//   const renderDeepDives = (level: UtviklingLevel, visible: boolean) => {
//     const anyLevelHasDives = maxDeepDiveRows > 0
//     if (!anyLevelHasDives) return null

//     const hasDives = !!(level.deepDives?.length && onOpenModal)
//     // Each button row ≈ 36px. Label + padding ≈ 32px.
//     const placeholderH = 32 + maxDeepDiveRows * 36

//     if (!visible) {
//       return <div className="mt-5 pt-5" style={{ height: placeholderH }} aria-hidden />
//     }

//     if (!hasDives) {
//       return <div className="mt-5 pt-5" style={{ height: placeholderH }} aria-hidden />
//     }

//     return (
//       <div className="mt-5 pt-5 border-t border-kilsvart-50">
//         <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-kilsvart-300 mb-3">Fordypning</p>
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
//           {level.deepDives!.map((dd) => (
//             <FordypningButton
//               key={dd.modalId}
//               label={dd.label}
//               onClick={() => onOpenModal!(dd.modalId, theme)}
//               theme={theme}
//             />
//           ))}
//         </div>
//       </div>
//     )
//   }

//   return (
//     <section className={cn("w-full bg-white text-kilsvart", className)}>
//       <header className="flex items-center justify-between border-b border-kilsvart-50 px-5 py-4 sm:px-8 sm:py-5">
//         <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-kilsvart-400 sm:text-[11px] sm:tracking-[0.35em]">
//           {title}
//         </span>
//         <span className={cn("text-[10px] font-semibold uppercase tracking-[0.3em] sm:text-[11px] sm:tracking-[0.35em]", t.tagText)}>
//           {tagLabel}
//         </span>
//       </header>

//       {/* ── MOBILE ── */}
//       <div className="sm:hidden">
//         <div className={cn("relative overflow-hidden bg-gradient-to-br px-5 pb-7 pt-8 text-white", t.panel)}>
//           <PatternOverlay size={32} />
//           <div className="relative z-10">
//             <div className="flex items-baseline justify-between gap-4">
//               <span className="font-anton text-[72px] leading-none tracking-[-0.08em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.15)]">
//                 {pad2(c.level)}
//               </span>
//               <div className="text-right">
//                 <p className="m-0 text-[11px] font-medium tracking-[0.08em] text-white/70">{c.age}</p>
//                 <p className="m-0 mt-1 font-anton text-[18px] uppercase tracking-[0.04em] min-h-[2.6em]">{c.sub}</p>
//               </div>
//             </div>
//             <div className="mt-5 flex items-center gap-1.5">
//               {levels.map((_, i) => (
//                 <button
//                   key={i}
//                   type="button"
//                   onClick={() => setActive(i)}
//                   aria-label={`Gå til nivå ${levels[i].level}`}
//                   className={cn(
//                     "h-1.5 rounded-full transition-all duration-300",
//                     "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
//                     i === active ? "w-6 bg-white" : "w-2 bg-white/30"
//                   )}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>

//         <div role="tablist" aria-label="Nivåer" className="flex overflow-x-auto items-end border-b border-kilsvart-100 px-3">
//           {levels.map((l, i) => (
//             <button
//               key={l.level}
//               id={tabId(i)}
//               role="tab"
//               aria-selected={i === active}
//               aria-controls={panelId(i)}
//               tabIndex={i === active ? 0 : -1}
//               type="button"
//               onClick={() => setActive(i)}
//               onKeyDown={(e) => handleKeyDown(e, i)}
//               className={cn(
//                 "shrink-0 whitespace-nowrap px-4 py-2.5 text-xs font-semibold",
//                 "rounded-t-lg border border-b-0 transition-colors duration-200",
//                 "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
//                 t.focus,
//                 i === active
//                   ? cn("bg-white border-kilsvart-100 -mb-px z-10", t.tagText)
//                   : "bg-kilsvart-50/50 border-transparent text-kilsvart-400"
//               )}
//             >
//               Nivå {l.level}
//             </button>
//           ))}
//         </div>

//         {/* Grid-stack: all panels rendered, tallest sets height, only active visible */}
//         <div className="grid px-5 pb-14 pt-4" style={{ gridTemplateColumns: "1fr" }}>
//           {levels.map((level, li) => (
//             <div
//               key={level.level}
//               id={panelId(li)}
//               role="tabpanel"
//               aria-labelledby={tabId(li)}
//               className={li === active ? "" : "invisible"}
//               style={{ gridRow: 1, gridColumn: 1 }}
//             >
//               <ol className="divide-y divide-kilsvart-50">
//                 {(() => {
//                   const flat = flattenItems(level.items)
//                   return flat.map((fi, i) => {
//                     const opacity = 0.15 + (i / Math.max(1, flat.length - 1)) * 0.85
//                     return (
//                       <li key={i} className={cn("py-3.5", fi.isFirstInGroup && i > 0 && "border-t-2 border-kilsvart-100")}>
//                         {fi.isFirstInGroup && (
//                           <p className="mb-2 ml-[44px] text-[11px] font-bold uppercase tracking-wider text-kilsvart-400">{fi.groupHeading}</p>
//                         )}
//                         <div className="grid grid-cols-[3px_32px_1fr] gap-3">
//                           <span aria-hidden className={cn("rounded-sm", t.stripe)} style={{ opacity }} />
//                           <span aria-hidden className="flex items-center justify-center font-anton text-base leading-none text-kilsvart-100">
//                             {String(i + 1).padStart(2, "0")}
//                           </span>
//                           <p className="m-0 flex items-center text-sm leading-relaxed text-kilsvart-600">{fi.text}</p>
//                         </div>
//                       </li>
//                     )
//                   })
//                 })()}
//               </ol>
//               {renderDeepDives(level, li === active)}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ── TABLET + DESKTOP ── */}
//       <div className="hidden sm:block">
//         <div className="grid grid-cols-1 sm:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
//           {/* Aside column: bg stretches full height, content is sticky */}
//           <div className={cn("relative overflow-hidden bg-gradient-to-b", t.panel)}>
//             <PatternOverlay size={40} />
//             <div className="sticky top-0 relative z-10 flex flex-col items-center text-center text-white px-4 py-10 lg:px-6 lg:py-14">
//                 <div className="font-anton leading-none tracking-[-0.08em] text-[100px] lg:text-[140px] drop-shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
//                   {pad2(c.level)}
//                 </div>
//                 <p className="mt-1 text-[13px] font-medium tracking-[0.08em] text-white/70">{c.age}</p>
//                 <p className="mt-3 font-anton text-base uppercase tracking-[0.05em] lg:text-lg min-h-[2.8em] lg:min-h-[3em]">{c.sub}</p>
//                 <div className="mt-8 flex items-center justify-center gap-2">
//                   {levels.map((_, i) => (
//                     <button
//                       key={i}
//                       type="button"
//                       onClick={() => setActive(i)}
//                       aria-label={`Gå til nivå ${levels[i].level}`}
//                       className={cn(
//                         "h-2 rounded-full transition-all duration-300",
//                         "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
//                         i === active ? "w-7 bg-white" : "w-2 bg-white/30"
//                       )}
//                     />
//                   ))}
//                 </div>
//             </div>
//           </div>

//           <div className="px-6 lg:px-10">
//             {/* Skilleark tabs: active tab sits on top of the border line */}
//             <div role="tablist" aria-label="Nivåer" className="flex items-end gap-0 border-b border-kilsvart-100">
//               {levels.map((l, i) => (
//                 <button
//                   key={l.level}
//                   id={tabId(i)}
//                   role="tab"
//                   aria-selected={i === active}
//                   aria-controls={panelId(i)}
//                   tabIndex={i === active ? 0 : -1}
//                   type="button"
//                   onClick={() => setActive(i)}
//                   onKeyDown={(e) => handleKeyDown(e, i)}
//                   className={cn(
//                     "relative px-5 py-2.5 text-xs font-semibold tracking-wide transition-colors lg:px-6 lg:py-3 lg:text-[13px]",
//                     "rounded-t-lg border border-b-0",
//                     "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
//                     t.focus,
//                     i === active
//                       ? cn("bg-white border-kilsvart-100 -mb-px z-10", t.tagText)
//                       : "bg-kilsvart-50/50 border-transparent text-kilsvart-400 hover:text-kilsvart-600 hover:bg-kilsvart-50"
//                   )}
//                 >
//                   Nivå {l.level}
//                 </button>
//               ))}
//             </div>

//             <div className="py-7 lg:py-10">
//             <div className="grid" style={{ gridTemplateColumns: "1fr" }}>
//               {levels.map((level, li) => (
//                 <div
//                   key={level.level}
//                   id={panelId(li)}
//                   role="tabpanel"
//                   aria-labelledby={tabId(li)}
//                   className={li === active ? "" : "invisible"}
//                   style={{ gridRow: 1, gridColumn: 1 }}
//                 >
//                   <ol className="divide-y divide-kilsvart-50">
//                     {(() => {
//                       const flat = flattenItems(level.items)
//                       return flat.map((fi, i) => {
//                         const opacity = 0.15 + (i / Math.max(1, flat.length - 1)) * 0.85
//                         return (
//                           <li key={i} className={cn("py-3.5 lg:py-4", fi.isFirstInGroup && i > 0 && "border-t-2 border-kilsvart-100")}>
//                             {fi.isFirstInGroup && (
//                               <p className="mb-2 ml-[56px] text-[11px] font-bold uppercase tracking-wider text-kilsvart-400 lg:text-xs">{fi.groupHeading}</p>
//                             )}
//                             <div className="grid grid-cols-[4px_40px_1fr] items-stretch gap-4">
//                               <span aria-hidden className={cn("rounded", t.stripe)} style={{ opacity }} />
//                               <span aria-hidden className="flex items-center justify-center font-anton text-lg leading-none text-kilsvart-100 lg:text-[22px]">
//                                 {String(i + 1).padStart(2, "0")}
//                               </span>
//                               <p className="m-0 flex items-center text-sm leading-relaxed text-kilsvart-600 lg:text-[15px]">{fi.text}</p>
//                             </div>
//                           </li>
//                         )
//                       })
//                     })()}
//                   </ol>
//                   {renderDeepDives(level, li === active)}
//                 </div>
//               ))}
//             </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }