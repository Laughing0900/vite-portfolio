import data from "@/components/home/experience/constants/legacy";
import { Timeline } from "@/components/ui/aceternity/timeline";
import LeftTitleCard from "@/components/views/LeftTitleCard";
import { memo, useEffect, useRef } from "react";
const Experience = memo(() => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) {
      return;
    }

    for (const exp of data) {
      window.snap.addElement(
        document.getElementById(`${exp.company}-experience`) as HTMLElement,
        {
          align: ["center", "center"],
        },
      );
    }
  }, []);

  return (
    <section id="experience" ref={container}>
      <LeftTitleCard title="Experience" />
      <div className="container mx-auto">
        <Timeline data={data} />
      </div>
    </section>
  );
});

export default Experience;
