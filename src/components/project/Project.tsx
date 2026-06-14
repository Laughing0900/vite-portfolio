import ParallaxList from "@/components/project/ParallaxList";
import { WheelSelect } from "@/components/ui/wheel-select";
import LeftMenu from "@/components/views/LeftMenu";
import LeftTitleCard from "@/components/views/LeftTitleCard";
import { useMotionValueEvent, useScroll } from "motion/react";
import { memo, useCallback, useMemo, useRef, useState } from "react";
import PreviewCard from "./PreviewCard";
import { projects as projectRecords } from "./constants/ProjectHistories";
const Project = memo(() => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const projects = projectRecords;
  // const projects = projectRecords.slice(0, );
  const pageSize = projects.length > 1 ? 1 / (projects.length - 1) : 1;
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const newIndex = Math.max(
      0,
      Math.min(Math.round(latest / pageSize), projects.length - 1),
    );
    // Bail out early so scroll frames without an index change skip the re-render
    setSelectedIndex((prev) => (prev === newIndex ? prev : newIndex));
  });

  const options = useMemo(
    () => projects.map(({ id, name }) => ({ label: name, value: id })),
    [projects],
  );

  // Picking on the wheel scrolls to that project's section; the scroll
  // listener above then drives `selectedIndex` back into the wheel's `value`.
  const handleValueChange = useCallback((id: string) => {
    document
      .getElementById(`${id}-project`)
      ?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const project = useMemo(
    () => projects[selectedIndex],
    [projects, selectedIndex],
  );

  return (
    <section id="project" className="pb-one-six-dvh">
      <LeftTitleCard title="Projects" />

      <LeftMenu className="flex items-center">
        <WheelSelect
          options={options}
          value={project.id}
          onValueChange={handleValueChange}
          radius={80}
          falloff={0.9}
          className="h-max-container w-full"
        />
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
