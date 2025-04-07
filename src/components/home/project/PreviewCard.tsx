import { scrollAtom } from "@/atoms/scrollAtom";
import type { Projects } from "@/components/home/project/constants/ProjectHistories";
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
        "absolute top-0 right-0 z-10 h-full w-1/2 transition-opacity duration-500 max-md:hidden",
      )}
      style={{
        opacity: onScroll ? 0 : 1,
      }}
    >
      <div className="background-radial sticky top-0 right-0 grid h-dvh w-full place-items-center">
        <motion.div
          className="absolute aspect-square w-4/5 delay-75"
          style={{
            opacity: onScroll ? 0 : 1,
            scale: onScroll ? 0.98 : 1,
          }}
        >
          <img
            src={`https://res.cloudinary.com/dicmdiiov/image/upload/f_auto,c_limit,w_3840,q_auto/v1/Pawn/portfolio/project/${previewImageId}`}
            alt={`${name} preview`}
            className="h-full w-full object-contain"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PreviewCard;
