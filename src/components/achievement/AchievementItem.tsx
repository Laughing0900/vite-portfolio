import { scrollAtom } from "@/atoms/scrollAtom";
import { cn } from "@/lib/utils";
import { useAtomValue } from "jotai";
import { AnimatePresence, motion } from "motion/react";
import { useMemo } from "react";

interface AchievementItemProps {
  item: {
    title: string;
    institution: string;
    imageId: string;
  };
  index: number;
  side: "academic" | "credentials";
  onMouseEnter: (side: "academic" | "credentials", imageId: string) => void;
  onMouseLeave: () => void;
  onMouseMove: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const AchievementItem = ({
  item,
  index,
  side,
  onMouseEnter,
  onMouseLeave,
  onMouseMove,
}: AchievementItemProps) => {
  const onScroll = useAtomValue(scrollAtom);

  const headline = useMemo(() => {
    if (side === "academic") {
      return "//";
    }

    return index !== undefined
      ? index + 1 < 10
        ? `0${index + 1}`
        : index + 1
      : "00";
  }, [side, index]);

  return (
    <div
      key={item.title}
      className={cn(
        "relative flex h-fit min-h-40 flex-col p-5 md:p-10 lg:cursor-pointer",
        side === "academic" ? "lg:items-end" : "",
      )}
      onMouseEnter={() => onMouseEnter(side, item.imageId)}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
    >
      <span className="text-base">{headline}</span>
      <span className="mt-1 nd:text-nowrap text-balance text-4xl md:overflow-clip md:text-ellipsis">
        {item.institution}
      </span>
      <span className="text-sm">{item.title}</span>
      <AnimatePresence>
        {!onScroll && (
          <motion.div
            layout
            className={cn(
              "absolute bottom-0 left-0 w-full border-accent border-b-2 transition-all duration-100 ease-in-out-circ",
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: index * 0.05 } }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
