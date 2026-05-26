import { cn } from "@/lib/utils";
import { memo } from "react";

type LeftTitleCardProps = {
  title: string;
  className?: string;
};

const LeftTitleCard = memo(({ title, className }: LeftTitleCardProps) => {
  const headingId = `heading-${title.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <>
      <div
        id={headingId}
        className={cn(
          "sticky top-0 left-0 flex h-one-six-dvh items-end p-5 text-title",
          className,
        )}
      >
        <h2>{title}</h2>
      </div>
      <div className="-mt-one-six-dvh" />
    </>
  );
});

export default LeftTitleCard;
