import { cn } from "@/lib/utils";

type TitleProps = {
  title: string;
  description: string;
  className?: string;
};

const Title = ({ title, description, className }: TitleProps) => {
  return (
    <div className={cn("flex flex-col gap-1 p-5 md:p-10", className)}>
      <h5 className="text-title">{title}</h5>
      <p className="text-sm">{description}</p>
    </div>
  );
};

export default Title;
