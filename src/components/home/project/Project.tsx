import ParallaxList from "@/components/home/project/ParallaxList";
import LeftMenu from "@/components/views/LeftMenu";
import LeftTitleCard from "@/components/views/LeftTitleCard";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState, useCallback, useMemo, memo } from "react";
import PreviewCard from "./PreviewCard";
import { projects as projectRecords } from "./constants/ProjectHistories";

const Project = memo(() => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const projects = projectRecords.slice(0, 6);
  const pageSize = 1 / (projects.length - 1);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setSelectedIndex(Math.round(latest / pageSize));
  });

  const getLinkStyle = useCallback(
    (index: number) => ({
      color:
        index === selectedIndex
          ? "var(--foreground)"
          : "var(--secondary-foreground)",
    }),
    [selectedIndex],
  );

  const project = useMemo(
    () => projects[selectedIndex],
    [projects, selectedIndex],
  );

  return (
    <section id="project" className="pb-one-six-dvh">
      <LeftTitleCard title="Projects" />

      <LeftMenu className=" flex flex-col justify-center gap-4">
        {projects.map(({ id, name }, index) => (
          <motion.a
            key={`${id}-project`}
            href={`/#${id}-project`}
            className="cursor-pointer text-base leading-relaxed hover:underline"
            style={getLinkStyle(index)}
          >
            {name}
          </motion.a>
        ))}
      </LeftMenu>

      <PreviewCard project={project} />

      <div className="container z-10 grid grid-cols-1 md:grid-cols-2">
        <div className="snap-y snap-mandatory" ref={ref}>
          {projects.map((project, index) => (
            <ParallaxList
              key={project.previewImageId}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

export default Project;
