import Lenis from "lenis";
import { ReactLenis } from "lenis/react";
import Snap from "lenis/snap";
import { useEffect } from "react";

declare global {
  interface Window {
    snap?: Snap;
    lenis?: Lenis;
  }
}

interface LenisProviderProps {
  children: React.ReactNode;
}

function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
    // Defer Lenis initialization until after mount
    const lenis = new Lenis({ lerp: 0.1 });

    const snap = new Snap(lenis, {
      type: "mandatory",
      debounce: 0,
      velocityThreshold: 1,
      duration: 1.5,
    });

    window.lenis = lenis;
    window.snap = snap;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <ReactLenis root>{children}</ReactLenis>;
}

export default LenisProvider;
