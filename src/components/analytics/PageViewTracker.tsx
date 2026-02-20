// // src/components/analytics/PageViewTracker.tsx
// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { track } from "@vercel/analytics/react";

// export function PageViewTracker() {
//   const location = useLocation();

//   useEffect(() => {
//     const page = location.pathname + location.search;
//     track("page_view", { page });
//   }, [location.pathname, location.search]);

//   return null;
// }

// src/components/analytics/PageViewTracker.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackEvent } from "@/lib/analytics";

export function PageViewTracker() {
  const location = useLocation();

  useEffect(() => {
    const page = location.pathname + location.search;

    trackEvent("page_view", {
      page,
      // valgfritt, men nyttig for debugging/segmentering:
      referrer: document.referrer || undefined,
    });
  }, [location.pathname, location.search]);

  return null;
}