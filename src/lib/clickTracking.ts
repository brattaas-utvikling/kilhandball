// src/lib/clickTracking.ts
import { track } from "@vercel/analytics/react";

export function trackClick(params: {
  page: string;
  component: string;     // f.eks. "MatchCard", "HeroKamper", "PraktiskInfoNav"
  action: string;        // f.eks. "open_modal", "cta_click", "expand"
  label?: string;        // f.eks. "KIL vs Elverum"
  id?: string;           // f.eks. matchId / slug
}) {
  track("click", params);
}