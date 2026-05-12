import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import type { RefObject } from "react";

type GlassHeroOverlayProps = {
  sourceRef: RefObject<HTMLDivElement | null>;
  className?: string;
};

/**
 * DOM layer placed under the WebGL canvas. The same pixels are rasterized
 * into a plane inside the R3F scene so MeshTransmissionMaterial can refract them.
 */
export function GlassHeroOverlay({
  sourceRef,
  className,
}: GlassHeroOverlayProps) {
  return (
    <>
      <div
        ref={sourceRef}
        id="glass-hero-source"
        aria-hidden="true"
        className={cn(
          "pointer-events-none fixed inset-0 z-0 overflow-hidden",
          "bg-gradient-to-b from-[#030407] via-[#070910] to-[#030407]",
          className,
        )}
      >
        <div className="flex min-h-dvh flex-col items-center justify-center px-6 pb-32 text-center">
          <motion.h1
            className="max-w-[min(1180px,90vw)] font-black font-sans text-[clamp(2.5rem,8.8vw,6.5rem)] text-[rgba(248,249,253,0.96)] leading-[0.95] tracking-tight [text-shadow:0_0_34px_rgba(255,255,255,0.2)]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Designed in glass.
          </motion.h1>
          <motion.p
            className="mt-8 max-w-lg text-pretty font-sans text-lg text-white/65 md:text-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.65,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            High-index transmission, chromatic dispersion, and parallax
            tilt—built for a premium product reveal.
          </motion.p>
        </div>
      </div>

      <nav
        className="pointer-events-none fixed top-[clamp(14px,3vw,28px)] right-[clamp(16px,4vw,44px)] left-[clamp(16px,4vw,44px)] z-40 flex items-center justify-between gap-4 font-sans text-sm text-white/78"
        aria-label="Glass hero"
      >
        <span className="font-medium uppercase tracking-wide">Glass / R3F</span>
        <a
          className="pointer-events-auto rounded-md border border-white/22 bg-white/8 px-3 py-2 text-white backdrop-blur-md transition-colors hover:bg-white/12"
          href="https://github.com/stas4000/liquid-glass-paralax"
          target="_blank"
          rel="noreferrer"
        >
          Reference
        </a>
      </nav>

      <div className="pointer-events-none fixed right-0 bottom-[clamp(16px,3.5vh,28px)] left-0 z-40 flex justify-center px-4">
        <motion.div
          className="pointer-events-auto flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25 }}
        >
          <button
            type="button"
            className="rounded-md border border-white/22 bg-white/10 px-5 py-3 font-medium font-sans text-sm text-white backdrop-blur-md transition-colors hover:bg-white/16"
          >
            View work
          </button>
          <button
            type="button"
            className="rounded-md border border-cyan-300/35 bg-cyan-400/15 px-5 py-3 font-medium font-sans text-cyan-50 text-sm backdrop-blur-md transition-colors hover:bg-cyan-400/25"
          >
            Get in touch
          </button>
        </motion.div>
      </div>
    </>
  );
}
