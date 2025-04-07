import { cn } from "@/lib/utils";
import { memo } from "react";

const HeroBackground = memo(({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 160 90"
      height="100%"
      width="100%"
      // preserveAspectRatio="none"
      className={cn("p-2.5", className)}
    >
      <clipPath id="path" mask="url(#mask)">
        <rect x="10" y="0" width="60" height="50" rx="5" />
        <path d="M 70 30 L 75 30 A 5 5 0 0 1 70 25 L 70 30" />
        <rect x="10" y="30" width="80" height="50" rx="5" />
        <path d="M 90 40 L 95 40 A 5 5 0 0 1 90 35 L 90 40" />
        <rect x="10" y="40" width="90" height="50" rx="5" />
        {/* <path d="M 110 50 L 116 50 A 5 5 0 0 0 110 55 L 110 50" /> */}
      </clipPath>
      <image
        href="/images/hero-bg.webp"
        clipPath="url(#path)"
        width="100%"
        className="aspect-video object-contain "
      />

      <svg width="4" height="4" x="0" y="3" viewBox="0 0 24 24">
        <path
          d="M12 0C12 6.62742 6.62742 12 0 12C6.62742 12 12 17.3726 12 24C12 17.3726 17.3726 12 24 12C17.3726 12 12 6.62742 12 0Z"
          className="fill-accent"
        />
      </svg>
      <svg width="4" height="4" x="0" y="8" viewBox="0 0 24 24">
        <path
          d="M12 0C12 6.62742 6.62742 12 0 12C6.62742 12 12 17.3726 12 24C12 17.3726 17.3726 12 24 12C17.3726 12 12 6.62742 12 0Z"
          className="fill-accent"
        />
      </svg>
      <svg width="4" height="4" x="0" y="13" viewBox="0 0 24 24">
        <path
          d="M12 0C12 6.62742 6.62742 12 0 12C6.62742 12 12 17.3726 12 24C12 17.3726 17.3726 12 24 12C17.3726 12 12 6.62742 12 0Z"
          className="fill-primary"
        />
      </svg>
    </svg>
  );
});

export default HeroBackground;
