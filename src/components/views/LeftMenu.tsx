import { cn } from "@/lib/utils";
import { memo } from "react";
type LeftMenuProps = {
  children: React.ReactNode;
  className?: string;
};

const LeftMenu = ({ children, className }: LeftMenuProps) => {
  return (
    <>
      <div
        className={cn(
          "h-max-container w-1/6",
          "sticky top-1/6 left-0 p-5 max-lg:hidden",
          className,
        )}
      >
        {children}
      </div>
      <div className="-mt-max-container max-lg:hidden" />
    </>
  );
};

export default memo(LeftMenu);
