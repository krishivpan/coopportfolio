import { useEffect, useState } from "react";

// Mirrors the mobile breakpoint in index.css: matches narrow-width phones
// in portrait AND short-height phones in landscape (touch devices only, so
// a short desktop browser window isn't mistaken for a phone).
export const MOBILE_QUERY = "(max-width: 640px), (max-height: 640px) and (pointer: coarse)";

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia(MOBILE_QUERY).matches);

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    const handleChange = () => setIsMobile(mql.matches);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  return isMobile;
}
