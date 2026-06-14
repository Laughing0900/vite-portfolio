import { useSyncExternalStore } from "react";

// Single MediaQueryList shared by every subscriber — `getSnapshot` runs on
// every render, so creating a fresh MQL there allocates per render for nothing.
let mq: MediaQueryList | undefined;
function getMq() {
  mq ??= window.matchMedia("(prefers-reduced-motion: reduce)");
  return mq;
}

function subscribe(cb: () => void) {
  const query = getMq();
  query.addEventListener("change", cb);
  return () => query.removeEventListener("change", cb);
}

function getSnapshot() {
  return getMq().matches;
}

export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
