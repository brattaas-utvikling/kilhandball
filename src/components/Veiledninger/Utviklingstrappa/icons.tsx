import * as React from "react"
import {
  Trophy,
  Heart,
  Target,
  TrendingUp,
  Dumbbell,
  Brain,
  Shield,
  Layers,
  Swords,
  Activity,
  GraduationCap,
  Link as LinkIcon,
} from "lucide-react"

export type UIconKey =
  | "trophy"
  | "heart"
  | "target"
  | "trendingUp"
  | "dumbbell"
  | "brain"
  | "shield"
  | "layers"
  | "swords"
  | "activity"
  | "graduationCap"
  | "link"

const ICON_MAP: Record<UIconKey, React.ComponentType<{ className?: string }>> = {
  trophy: Trophy,
  heart: Heart,
  target: Target,
  trendingUp: TrendingUp,
  dumbbell: Dumbbell,
  brain: Brain,
  shield: Shield,
  layers: Layers,
  swords: Swords,
  activity: Activity,
  graduationCap: GraduationCap,
  link: LinkIcon,
}

export function UIcon({ name, className }: { name: UIconKey; className?: string }) {
  const Icon = ICON_MAP[name]
  return <Icon className={className} aria-hidden />
}