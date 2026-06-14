import { Star } from "@/assets/LayoutStar";
import { cn } from "@/lib/utils";

const BackgroundGraphic = () => {
  return (
    <div className={cn("pointer-events-none absolute inset-0 w-full")}>
      <div className="absolute top-1/6 left-0 h-0.5 w-dvw origin-right bg-accent" />
      <div className="absolute right-0 bottom-1/6 h-0.5 w-dvw origin-left bg-accent" />
      <div className="absolute top-0 left-1/6 h-full w-0.5 bg-accent delay-75 duration-300 ease-in-out-circ" />
      <div className="absolute right-1/6 bottom-0 h-full w-0.5 bg-accent duration-500 ease-in-out-circ" />
      <div>
        <Star className="-translate-x-[11px] -translate-y-[11px] absolute top-1/6 left-1/6" />
        <Star className="-translate-x-[11px] absolute bottom-1/6 left-1/6 translate-y-[11px]" />
        <Star className="-translate-y-[11px] absolute top-1/6 right-1/6 translate-x-[11px]" />
        <Star className="absolute right-1/6 bottom-1/6 translate-x-[11px] translate-y-[11px]" />
      </div>
    </div>
  );
};

export default BackgroundGraphic;
