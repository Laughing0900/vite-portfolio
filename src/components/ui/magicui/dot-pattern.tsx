import { cn } from "@/lib/utils";
import type React from "react";
import { useId } from "react";

/**
 *  DotPattern Component Props
 *
 * @param {number} [width=16] - The horizontal spacing between dots
 * @param {number} [height=16] - The vertical spacing between dots
 * @param {number} [x=0] - The x-offset of the entire pattern
 * @param {number} [y=0] - The y-offset of the entire pattern
 * @param {number} [cx=1] - The x-offset of individual dots
 * @param {number} [cy=1] - The y-offset of individual dots
 * @param {number} [cr=1] - The radius of each dot
 * @param {string} [className] - Additional CSS classes to apply to the SVG container
 */
interface DotPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  cx?: number;
  cy?: number;
  cr?: number;
  className?: string;
  [key: string]: unknown;
}

/**
 * DotPattern Component
 * adapted from https://magicui.design/docs/components/dot-pattern
 *
 * A React component that creates a static dot pattern background using a
 * single SVG <pattern>, so the browser tiles it natively — two DOM nodes
 * regardless of viewport size, and no resize listener needed.
 *
 * @component
 *
 * @see DotPatternProps for the props interface.
 *
 * @example
 * // Basic usage
 * <DotPattern />
 *
 * // With custom spacing
 * <DotPattern width={20} height={20} className="opacity-50" />
 */

export function DotPattern({
  width = 20,
  height = 20,
  x = 0,
  y = 0,
  cx = 2,
  cy = 2,
  cr = 1,
  className,
  ...props
}: DotPatternProps) {
  const patternId = useId();

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full",
        className,
      )}
      {...props}
    >
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          x={x}
          y={y}
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx={cx + cx / 2}
            cy={cy + cy / 2}
            r={cr}
            fill="#FFFFFF22"
            className="text-neutral-400/80"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
