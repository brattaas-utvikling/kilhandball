import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X, ChevronRight, Lightbulb } from "lucide-react"
import { cn } from "@/lib/utils"
import { UTHEME, type UTheme } from "./theme"

export type DeepDiveSection = {
  heading?: string
  text: string[]
  tip?: string
  list?: string[]
}

export type DeepDiveDoc = {
  id: string
  title: string
  sections: DeepDiveSection[]
}

type Props = {
  isOpen: boolean
  onClose: () => void
  doc: DeepDiveDoc
  theme?: UTheme
}

/**
 * Låser bakgrunn-scroll når modal er åpen.
 * Robust løsning (inkl iOS): body = position: fixed + top: -scrollY
 */
function useLockBodyScroll(isLocked: boolean) {
  React.useEffect(() => {
    if (!isLocked) return

    const scrollY = window.scrollY || document.documentElement.scrollTop || 0

    const body = document.body
    const prev = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
    }

    // Unngå layout-jump når scrollbar forsvinner (desktop)
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`

    body.style.position = "fixed"
    body.style.top = `-${scrollY}px`
    body.style.left = "0"
    body.style.right = "0"
    body.style.width = "100%"
    body.style.overflow = "hidden"

    return () => {
      // Restore styles
      body.style.position = prev.position
      body.style.top = prev.top
      body.style.left = prev.left
      body.style.right = prev.right
      body.style.width = prev.width
      body.style.overflow = prev.overflow
      body.style.paddingRight = prev.paddingRight

      // Restore scrollposisjon
      window.scrollTo(0, scrollY)
    }
  }, [isLocked])
}

export function DeepDiveModal({ isOpen, onClose, doc, theme = "red" }: Props) {
  const t = UTHEME[theme]

  useLockBodyScroll(isOpen)

  // Escape for å lukke
  React.useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={doc.title}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header – uses theme color */}
            <div className={cn("sticky top-0 z-10 px-6 py-4 flex items-center justify-between", t.modalHeader)}>
              <h3 className="font-anton text-xl text-white uppercase tracking-wide">{doc.title}</h3>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/20 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                aria-label="Lukk"
                type="button"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5 overflow-y-auto max-h-[calc(85vh-64px)]">
              {doc.sections.map((section, i) => (
                <div key={i} className={i > 0 ? "mt-6 pt-6 border-t border-kilsvart-50" : ""}>
                  {section.heading ? (
                    <h4 className="font-anton text-base uppercase tracking-wide text-kilsvart mb-3">{section.heading}</h4>
                  ) : null}

                  {section.text.map((p, j) => (
                    <p key={j} className="text-kilsvart-600 text-sm leading-relaxed mb-2">
                      {p}
                    </p>
                  ))}

                  {section.list ? (
                    <ul className="space-y-1.5 mt-3 mb-2">
                      {section.list.map((item, k) => (
                        <li key={k} className="flex items-start gap-2.5 text-sm text-kilsvart-600">
                          <span className={cn("w-1.5 h-1.5 rounded-full mt-1.5 shrink-0", t.stripe)} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {/* Tip box – full theme color */}
                  {section.tip ? (
                    <div className={cn("rounded-xl px-5 py-4 mt-4 flex items-start gap-3", t.calloutBg)}>
                      <Lightbulb className="w-5 h-5 text-white/80 shrink-0 mt-0.5" />
                      <p className="text-sm leading-relaxed text-white">
                        <strong className="font-bold">Øvelse/Tips:</strong> {section.tip}
                      </p>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function FordypningButton({
  label,
  onClick,
  theme = "red",
}: {
  label: string
  onClick: () => void
  theme?: UTheme
}) {
  const t = UTHEME[theme]
  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all text-xs font-medium group",
        "border-kilsvart-100 text-kilsvart-600 bg-white",
        "hover:border-current hover:bg-kilsvart-50/50",
        t.tagText.replace("text-", "hover:text-"),
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1",
        t.focus
      )}
    >
      <span>{label}</span>
      <ChevronRight className="w-3 h-3 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
    </button>
  )
}


// import * as React from "react"
// import { AnimatePresence, motion } from "framer-motion"
// import { X, ChevronRight, Lightbulb } from "lucide-react"
// import { cn } from "@/lib/utils"
// import { UTHEME, type UTheme } from "./theme"

// export type DeepDiveSection = {
//   heading?: string
//   text: string[]
//   tip?: string
//   list?: string[]
// }

// export type DeepDiveDoc = {
//   id: string
//   title: string
//   sections: DeepDiveSection[]
// }

// type Props = {
//   isOpen: boolean
//   onClose: () => void
//   doc: DeepDiveDoc
//   theme?: UTheme
// }

// export function DeepDiveModal({ isOpen, onClose, doc, theme = "red" }: Props) {
//   const t = UTHEME[theme]

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
//           onClick={onClose}
//           role="dialog"
//           aria-modal="true"
//           aria-label={doc.title}
//         >
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95, y: 20 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.95, y: 20 }}
//             transition={{ duration: 0.25 }}
//             className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Header – uses theme color */}
//             <div className={cn("sticky top-0 z-10 px-6 py-4 flex items-center justify-between", t.modalHeader)}>
//               <h3 className="font-anton text-xl text-white uppercase tracking-wide">{doc.title}</h3>
//               <button
//                 onClick={onClose}
//                 className="p-2 rounded-full hover:bg-white/20 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
//                 aria-label="Lukk"
//               >
//                 <X className="w-5 h-5 text-white" />
//               </button>
//             </div>

//             {/* Body */}
//             <div className="px-6 py-5 overflow-y-auto max-h-[calc(85vh-64px)]">
//               {doc.sections.map((section, i) => (
//                 <div key={i} className={i > 0 ? "mt-6 pt-6 border-t border-kilsvart-50" : ""}>
//                   {section.heading ? (
//                     <h4 className="font-anton text-base uppercase tracking-wide text-kilsvart mb-3">{section.heading}</h4>
//                   ) : null}

//                   {section.text.map((p, j) => (
//                     <p key={j} className="text-kilsvart-600 text-sm leading-relaxed mb-2">
//                       {p}
//                     </p>
//                   ))}

//                   {section.list ? (
//                     <ul className="space-y-1.5 mt-3 mb-2">
//                       {section.list.map((item, k) => (
//                         <li key={k} className="flex items-start gap-2.5 text-sm text-kilsvart-600">
//                           <span className={cn("w-1.5 h-1.5 rounded-full mt-1.5 shrink-0", t.stripe)} />
//                           {item}
//                         </li>
//                       ))}
//                     </ul>
//                   ) : null}

//                   {/* Tip box – full theme color */}
//                   {section.tip ? (
//                     <div className={cn("rounded-xl px-5 py-4 mt-4 flex items-start gap-3", t.calloutBg)}>
//                       <Lightbulb className="w-5 h-5 text-white/80 shrink-0 mt-0.5" />
//                       <p className="text-sm leading-relaxed text-white">
//                         <strong className="font-bold">Øvelse/Tips:</strong> {section.tip}
//                       </p>
//                     </div>
//                   ) : null}
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   )
// }

// export function FordypningButton({
//   label,
//   onClick,
//   theme = "red",
// }: {
//   label: string
//   onClick: () => void
//   theme?: UTheme
// }) {
//   const t = UTHEME[theme]
//   return (
//     <button
//       onClick={onClick}
//       type="button"
//       className={cn(
//         "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all text-xs font-medium group",
//         "border-kilsvart-100 text-kilsvart-600 bg-white",
//         "hover:border-current hover:bg-kilsvart-50/50",
//         t.tagText.replace("text-", "hover:text-"),
//         "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1",
//         t.focus
//       )}
//     >
//       <span>{label}</span>
//       <ChevronRight className="w-3 h-3 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
//     </button>
//   )
// }