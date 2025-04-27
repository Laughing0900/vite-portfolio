import { scrollAtom } from "@/atoms/scrollAtom";
import type { Projects } from "@/components/project/constants/ProjectHistories";
import { cn } from "@/lib/utils";
import { useAtomValue } from "jotai";
import { motion } from "motion/react";

type PreviewCardProps = {
  project: Projects;
};

const PreviewCard = ({
  project: { previewImageId, name },
}: PreviewCardProps) => {
  const onScroll = useAtomValue(scrollAtom);

  return (
    <motion.div
      className={cn(
        "absolute top-0 right-0 z-10 h-full w-1/2 transition-opacity duration-250 max-md:hidden",
      )}
      style={{
        opacity: onScroll ? 0.7 : 1,
      }}
    >
      <div className="background-radial sticky top-0 right-0 grid h-dvh w-full place-items-center">
        <div
          className=" absolute aspect-13/9 w-4/5 origin-right"
          style={{
            background:
              "repeating-linear-gradient(60deg, transparent,transparent 15px,var(--accent) 0,var(--accent) 30px)",
          }}
        >
          <motion.img
            src={`https://res.cloudinary.com/dicmdiiov/image/upload/f_auto,c_limit,w_3840,q_auto/v1/Pawn/portfolio/project/${previewImageId}`}
            alt={`${name} preview`}
            className="h-full w-full object-cover delay-75 duration-150"
            style={{
              opacity: onScroll ? 0 : 1,
              scaleX: onScroll ? 0.95 : 1,
              translateX: onScroll ? 10 : 0,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default PreviewCard;
