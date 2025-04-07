import { memo } from "react";
export const Star = memo(({ className = "" }: { className?: string }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    aria-label="bg-star"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 0C12 6.62742 6.62742 12 0 12C6.62742 12 12 17.3726 12 24C12 17.3726 17.3726 12 24 12C17.3726 12 12 6.62742 12 0Z"
      fill="#343637"
    />
  </svg>
));
