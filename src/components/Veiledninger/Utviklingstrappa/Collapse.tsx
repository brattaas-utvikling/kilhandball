// src/components/ui/Collapse.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

type Props = React.PropsWithChildren<{
  open: boolean
  className?: string
  innerClassName?: string
}>

export function Collapse({ open, className, innerClassName, children }: Props) {
  return (
    <div
      className={cn(
        "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        className
      )}
    >
      <div className={cn("min-h-0 overflow-hidden", innerClassName)}>{children}</div>
    </div>
  )
}
