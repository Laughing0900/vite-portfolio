import { cn } from "@/lib/utils";
import * as React from "react";

export type WheelSelectOption = {
  label: string;
  value: string;
};

type RawOption = WheelSelectOption | string;

export interface WheelSelectProps {
  /** Options to display. Plain strings are treated as both label and value. */
  options: RawOption[];
  /** Currently selected value (controlled). */
  value?: string;
  /** Called with the new value when the selection changes. */
  onValueChange?: (value: string) => void;
  /**
   * How many options to show on each side of the selected one. Purely a count
   * gate — it hides options past this distance without changing the spacing of
   * the ones that remain.
   */
  maxVisible?: number;
  /** Angle (deg) of the first step away from center; later steps shrink by `falloff`. */
  step?: number;
  /** Hard cap: options whose angle would exceed this are hidden. */
  maxAngle?: number;
  /**
   * Radius of the dial, in px: every label's inner (left) edge is placed this
   * far from the shared center, at its angle. The selected label sits at the
   * rightmost point of the arc.
   */
  radius?: number;
  /**
   * Weights how the angular budget is distributed across the steps. Each step
   * away from the center gets `falloff` times the previous step's angle, so the
   * options nearest the current selection are spaced furthest apart and distant
   * ones compress toward `maxAngle`. 1 = uniform spacing; <1 = fisheye.
   */
  falloff?: number;
  className?: string;
}

function normalize(options: RawOption[]): WheelSelectOption[] {
  return options.map((o) =>
    typeof o === "string" ? { label: o, value: o } : o,
  );
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

/**
 * Cumulative angle of the m-th step from center as a multiple of the first
 * step — a geometric series with ratio `falloff`. Each step away from center
 * is `falloff`× the previous, so nearer options spread out and far ones bunch.
 */
function cumulativeWeight(m: number, falloff: number) {
  if (falloff === 1) return m;
  return (1 - falloff ** m) / (1 - falloff);
}

export function WheelSelect({
  options,
  value,
  onValueChange,
  maxVisible = 4,
  step = 18,
  maxAngle = 120,
  radius = 80,
  falloff = 0.9,
  className,
}: WheelSelectProps) {
  const items = React.useMemo(() => normalize(options), [options]);

  // Angle of the option n steps from center. Independent of maxVisible, so
  // revealing/hiding outer options never shifts the inner ones.
  const rawAngle = React.useCallback(
    (n: number) => step * cumulativeWeight(Math.abs(n), falloff),
    [step, falloff],
  );
  const angleForStep = React.useCallback(
    (n: number) => Math.sign(n) * Math.min(rawAngle(n), maxAngle),
    [rawAngle, maxAngle],
  );
  // Hidden when past the count gate or beyond the angular cap.
  const isHidden = React.useCallback(
    (n: number) => Math.abs(n) > maxVisible || rawAngle(n) > maxAngle,
    [maxVisible, rawAngle, maxAngle],
  );

  // Drag distance that advances one step ≈ the arc length of the first
  // (widest) step near the center.
  const dragStep = (radius * angleForStep(1) * Math.PI) / 180;

  // Resolve the selected index from the controlled value, defaulting to the
  // first item. Falls back to internal state when used uncontrolled.
  const controlledIndex = items.findIndex((o) => o.value === value);
  const [internalIndex, setInternalIndex] = React.useState(
    controlledIndex >= 0 ? controlledIndex : 0,
  );
  const selectedIndex = controlledIndex >= 0 ? controlledIndex : internalIndex;

  const select = React.useCallback(
    (next: number) => {
      const clamped = clamp(next, 0, items.length - 1);
      if (clamped === selectedIndex) return;
      setInternalIndex(clamped);
      onValueChange?.(items[clamped].value);
    },
    [items, onValueChange, selectedIndex],
  );

  // Vertical drag → each rowHeight of travel moves the selection one step.
  // Pointer capture is taken lazily once a real drag begins, so a plain tap
  // still reaches an option's onClick handler.
  const dragState = React.useRef<{
    startY: number;
    startIndex: number;
    captured: boolean;
  } | null>(null);

  const onPointerDown = (e: React.PointerEvent) => {
    dragState.current = {
      startY: e.clientY,
      startIndex: selectedIndex,
      captured: false,
    };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const drag = dragState.current;
    if (!drag) return;
    const dy = e.clientY - drag.startY;
    if (!drag.captured) {
      if (Math.abs(dy) < 4) return;
      e.currentTarget.setPointerCapture(e.pointerId);
      drag.captured = true;
    }
    // Dragging down reveals earlier items (content follows the pointer).
    select(drag.startIndex - Math.round(dy / dragStep));
  };

  const endDrag = (e: React.PointerEvent) => {
    const drag = dragState.current;
    dragState.current = null;
    if (drag?.captured && e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      select(selectedIndex + 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      select(selectedIndex - 1);
    }
  };

  const activeId = `wheel-option-${selectedIndex}`;

  return (
    <div
      role="listbox"
      tabIndex={0}
      aria-activedescendant={activeId}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onKeyDown={onKeyDown}
      className={cn("relative touch-none select-none outline-none", className)}
      style={{ cursor: "grab" }}
    >
      {items.map((opt, i) => {
        const n = i - selectedIndex;
        const hidden = isHidden(n);
        const angle = angleForStep(n);
        const isSelected = n === 0;
        return (
          <span
            key={opt.value}
            id={`wheel-option-${i}`}
            role="option"
            aria-selected={isSelected}
            onClick={() => select(i)}
            className={cn(
              "absolute inline-block cursor-pointer whitespace-nowrap leading-none text-foreground left-0 top-1/2",
              "transition-all duration-300 ease-out",
            )}
            style={{
              transform: `translateY(-50%) rotate(${angle}deg)`,
              transformOrigin: `-${radius}px center`,
              fontSize: isSelected ? 16 : 12,
              fontWeight: isSelected ? 500 : 400,
              opacity: hidden ? 0 : isSelected ? 1 : 0.6,
              filter: `blur(${(Math.abs(angle) / 180) * 4}px)`,
            }}
          >
            {opt.label}
          </span>
        );
      })}
    </div>
  );
}
