// src/lib/analytics.ts
import { track } from "@vercel/analytics/react";

export type AnalyticsEventName =
  | "page_view"
  | "scroll_depth"
  | "match_modal_open"
  | "match_modal_close"
  | "match_refresh"
  | "match_filter_change"
  | "match_filter_clear"
  | "error_retry"
  | "error_dismiss";

type TrackPayload = Parameters<typeof track>[1];

export function trackEvent(name: AnalyticsEventName, payload?: TrackPayload) {
  track(name, payload);
}

// // src/lib/analytics.ts
// import { track } from "@vercel/analytics/react";

// export type AnalyticsEventName =
//   | "page_view"
//   | "scroll_depth"
//   | "match_modal_open"
//   | "match_modal_close";

// // 👇 Henter riktig payload-type direkte fra track-funksjonen
// type TrackPayload = Parameters<typeof track>[1];

// export function trackEvent(
//   name: AnalyticsEventName,
//   payload?: TrackPayload
// ) {
//   track(name, payload);
// }