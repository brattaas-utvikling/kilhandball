// src/lib/useScrollDepth.ts
import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

type Depth = 25 | 50 | 75 | 100;

export function useScrollDepth(page: string, isPraktisk: boolean) {
  const firedRef = useRef<Record<Depth, boolean>>({
    25: false,
    50: false,
    75: false,
    100: false,
  });

  useEffect(() => {
    // Reset når page endres (viktig for SPA)
    firedRef.current = { 25: false, 50: false, 75: false, 100: false };

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const percent = (scrollTop / docHeight) * 100;

      const thresholds: Depth[] = [25, 50, 75, 100];
      for (const t of thresholds) {
        if (!firedRef.current[t] && percent >= t) {
          firedRef.current[t] = true;

          trackEvent("scroll_depth", {
            page,
            depth: t,
            // Ekstra hint for praktisk-info (lett å filtrere)
            category: isPraktisk ? "praktisk" : "default",
          });
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // kall én gang i tilfelle siden allerede er scrollet
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [page, isPraktisk]);
}
// // src/lib/useScrollDepth.ts
// import { useEffect, useRef } from "react";
// import { track } from "@vercel/analytics/react";

// export function useScrollDepth(page: string, enabled: boolean) {
//   const fired = useRef({ 25: false, 50: false, 75: false, 100: false });

//   useEffect(() => {
//     fired.current = { 25: false, 50: false, 75: false, 100: false };
//   }, [page]);

//   useEffect(() => {
//     if (!enabled) return;

//     const onScroll = () => {
//       const docHeight = document.documentElement.scrollHeight - window.innerHeight;
//       if (docHeight <= 0) return;

//       const percent = (window.scrollY / docHeight) * 100;
//       (Object.keys(fired.current) as Array<"25" | "50" | "75" | "100">).forEach((k) => {
//         const threshold = Number(k) as 25 | 50 | 75 | 100;
//         if (!fired.current[threshold] && percent >= threshold) {
//           fired.current[threshold] = true;
//           track("scroll_depth", { page, depth: threshold });
//         }
//       });
//     };

//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, [enabled, page]);
// }

// // src/lib/useScrollDepth.ts
// import { useEffect, useRef } from "react";
// import { track } from "@vercel/analytics/react";

// export function useScrollDepth(page: string, enabled: boolean) {
//   const fired = useRef({ 25: false, 50: false, 75: false, 100: false });

//   useEffect(() => {
//     if (!enabled) return;

//     const onScroll = () => {
//       const docHeight = document.documentElement.scrollHeight - window.innerHeight;
//       if (docHeight <= 0) return;

//       const percent = (window.scrollY / docHeight) * 100;

//       ([25, 50, 75, 100] as const).forEach((t) => {
//         if (!fired.current[t] && percent >= t) {
//           fired.current[t] = true;
//           track("scroll_depth", { page, depth: t });
//         }
//       });
//     };

//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, [page, enabled]);
// }