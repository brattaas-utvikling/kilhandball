// src/components/analytics/ScrollTracker.tsx
import { useLocation } from "react-router-dom";
import { useScrollDepth } from "@/lib/useScrollDepth";

export function ScrollTracker() {
  const { pathname, search } = useLocation();
  const page = pathname + search;

  const isPraktisk = pathname.startsWith("/praktisk-info/");
  useScrollDepth(page, isPraktisk);

  return null;
}


// // src/components/analytics/ScrollTracker.tsx
// import { useLocation } from "react-router-dom";
// import { useScrollDepth } from "@/lib/useScrollDepth";

// export function ScrollTracker() {
//   const { pathname, search } = useLocation();
//   const page = pathname + search;

//   const isPraktisk = pathname.startsWith("/praktisk-info/");
//   useScrollDepth(page, isPraktisk);

//   return null;
// }