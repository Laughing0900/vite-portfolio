import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";

const route = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Project",
    href: "/project",
  },
  {
    label: "Experience",
    href: "/experience",
  },
  {
    label: "More",
    href: "/more",
  },
];

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const triggerNav = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleClick = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <div className="fixed top-0 right-0 z-[100] h-full w-1/2">
      <Button
        onClick={triggerNav}
        variant={"link"}
        className="silkscreen absolute top-0 right-0 z-10"
      >
        {isOpen ? "Close" : "Menu"}
      </Button>
      {isOpen && (
        <aside
          className={cn(
            "relative flex h-full w-full flex-col items-center justify-center gap-10",
            "text-4xl",
          )}
        >
          <motion.div className="-z-10 absolute size-full origin-top-right animate-in bg-background" />
          {route.map(({ label, href }) => (
            <Button
              key={label}
              variant={"link"}
              className="text-4xl"
              onClick={handleClick}
            >
              <Link to={href}>{label}</Link>
            </Button>
          ))}
        </aside>
      )}
    </div>
  );
};

export default Nav;
