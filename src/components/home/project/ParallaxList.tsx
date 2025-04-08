import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "motion/react";
import { memo, useRef } from "react";
import type { Projects } from "./constants/ProjectHistories";

type ParallaxListProps = {
  project: Projects;
  index: number;
};

const ParallaxList = memo(({ project, index }: ParallaxListProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], [-250, 250]);

  return (
    <div
      className="relative flex h-max-container items-end justify-end shadow-2xs md:items-center"
      ref={ref}
      id={`${project.id}-project`}
    >
      <motion.div
        className="-left-4 -z-10 absolute top-1/3 aspect-video w-4/5 md:hidden"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { duration: 0.125, ease: "easeOut" },
        }}
        exit={{ opacity: 0, transition: { duration: 0.05 } }}
      >
        <img
          src={`https://res.cloudinary.com/dicmdiiov/image/upload/f_auto,c_limit,w_3840,q_auto/v1/Pawn/portfolio/project/${project.previewImageId}`}
          alt={`${project.name} preview`}
          className="h-full w-full object-cover"
        />
      </motion.div>

      <motion.div
        initial={{ visibility: "hidden" }}
        animate={{ visibility: "visible" }}
        style={{ y }}
        className={cn(
          "-translate-y-1/2 -right-10 absolute top-1/2 flex flex-col items-end pr-5 text-6xl",
          "md:top-1/4 md:right-0 md:pr-10",
        )}
      >
        <p>#{index}</p>
        <h2 className="text-right text-4xl">{project.name}</h2>
        <div className="-translate-y-1/2 absolute top-[1ch] right-0 h-6 w-6 translate-x-1/2 rotate-45 rounded-full border-4 border-primary max-md:hidden" />
      </motion.div>
      <p
        className={cn(
          "-mr-10 max-w-3/4 text-balance pr-5 text-right text-base text-shadow-base",
          "md:-mr-0 md:pr-10",
        )}
      >
        {project.shorts}
      </p>
    </div>
  );
});

export default ParallaxList;
