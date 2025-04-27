import { AchievementItem } from "@/components/home/achievement/AchievementItem";
import { AchievementPreview } from "@/components/home/achievement/components/AchievementPreview";
import { academic } from "@/components/home/achievement/constants/academic";
import { credentials } from "@/components/home/achievement/constants/credentials";
import LeftTitleCard from "@/components/views/LeftTitleCard";
import RightTitleCard from "@/components/views/RightTitleCard";
import { useMotionValue, useSpring } from "motion/react";
import { memo, useState } from "react";

const Achievement = memo(() => {
  const [selected, setSelected] = useState<null | {
    side: "academic" | "credentials";
    imageId: string;
  }>(null);

  const springConfig = { stiffness: 25 };
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const translateX = useSpring(x, springConfig);
  const translateY = useSpring(y, springConfig);

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (!event.currentTarget) {
      return;
    }
    const targetRect = event.currentTarget.getBoundingClientRect();
    const eventOffsetX = event.clientX - targetRect.left;
    const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2;
    x.set(offsetFromCenter);

    const eventOffsetY = event.clientY - targetRect.top;
    const offsetFromCenterY = (eventOffsetY - targetRect.height / 2) / 5;
    y.set(offsetFromCenterY);
  };

  const handleMouseEnter = (
    side: "academic" | "credentials",
    imageId: string,
  ) => {
    setSelected({ side, imageId });
  };

  const handleMouseLeave = () => {
    setSelected(null);
    x.set(0);
    y.set(0);
  };

  return (
    <section id="achievement" className="text-shadow-base">
      <LeftTitleCard title="Credentials" />
      <RightTitleCard title="Academic" className="max-lg:hidden" />

      <div className="container grid grid-cols-1 divide-accent lg:grid-cols-2 lg:divide-x-2">
        <AchievementPreview
          selected={selected}
          translateX={translateX}
          translateY={translateY}
        />

        <div className="flex flex-col">
          {credentials.map((item, index) => (
            <AchievementItem
              key={item.title}
              item={item}
              index={index}
              side="credentials"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
            />
          ))}
        </div>

        <div className="flex flex-col">
          {academic.map((item, index) => (
            <AchievementItem
              key={item.title}
              item={item}
              index={index}
              side="academic"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

export default Achievement;
