import data from "@/components/experience/constants/legacy";
import { Timeline } from "@/components/ui/aceternity/timeline";
import LeftTitleCard from "@/components/views/LeftTitleCard";
import { memo } from "react";
const Experience = memo(() => {
  return (
    <section id="experience">
      <LeftTitleCard title="Experience" />
      <div className="container mx-auto">
        <Timeline data={data} />
      </div>
    </section>
  );
});

export default Experience;
