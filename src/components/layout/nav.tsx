import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
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
      <aside
        className={cn(
          "relative flex h-full w-full flex-col items-center justify-center gap-10",
          "text-4xl",
          "delay-75 duration-150",
        )}
      >
        {isOpen &&
          route.map(({ label, href }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: index * 0.1 + 0.1 }}
            >
              <Button
                variant={"link"}
                className="text-4xl"
                onClick={handleClick}
              >
                <Link to={href}>{label}</Link>
              </Button>
            </motion.div>
          ))}
      </aside>
      {isOpen && (
        <AnimatePresence>
          <motion.div
            className="-z-10 absolute inset-0 origin-top-right bg-background duration-150 ease-out"
            initial={{ scaleY: 0.2 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0.2 }}
          />
        </AnimatePresence>
      )}
    </div>
  );
};

export default Nav;
