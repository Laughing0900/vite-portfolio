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
      d="M12 0C12 6.6 6.6 12 0 12C6.6 12 12 17.4 12 24C12 17.4 17.4 12 24 12C17.4 12 12 6.6 12 0Z"
      fill="#343637"
    />
  </svg>
));
