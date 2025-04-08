import { cn } from "@/lib/utils";
import { memo } from "react";

type RightTitleCardProps = {
  title: string;
  className?: string;
};

const RightTitleCard = memo(({ title, className }: RightTitleCardProps) => {
  return (
    <>
      <div
        className={cn(
          "sticky top-0 flex h-one-six-dvh w-full items-end p-5 text-title",
          className,
        )}
      >
        <div className="absolute right-0 px-5">
          <h2>{title}</h2>
        </div>
      </div>
      <div className="-mt-one-six-dvh" />
    </>
  );
});

export default RightTitleCard;
