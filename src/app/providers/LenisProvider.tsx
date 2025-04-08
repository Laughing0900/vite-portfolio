import Lenis from "lenis";
import { ReactLenis } from "lenis/react";
import Snap from "lenis/snap";

declare global {
  interface Window {
    snap: Snap;
    lenis: Lenis;
  }
}

const lenis = new Lenis({ lerp: 0.25 });

const snap = new Snap(lenis, {
  type: "mandatory",
  velocityThreshold: 1,
});

window.lenis = lenis;
window.snap = snap;

snap.add(0, {
  index: 0,
}); // top

function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

interface LenisProviderProps {
  children: React.ReactNode;
}

function LenisProvider({ children }: LenisProviderProps) {
  return <ReactLenis root>{children}</ReactLenis>;
}

export default LenisProvider;
