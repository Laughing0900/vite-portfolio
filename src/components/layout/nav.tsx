import { Button } from "@/components/ui/button";
import { AnimatePresence, LazyMotion, m } from "motion/react";
import { domAnimation } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
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
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    triggerRef.current?.focus();
  }, []);

  const triggerNav = useCallback(() => {
    setIsOpen((current) => !current);
  }, []);

  const handleClick = useCallback(() => {
    closeMenu();
  }, [closeMenu]);

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Focus trap when menu is open
  useEffect(() => {
    if (!isOpen || !menuRef.current) return;

    const focusableElements = menuRef.current.querySelectorAll<HTMLElement>(
      "a[href], button:not([disabled])",
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleTabKey);
    firstElement?.focus();

    return () => document.removeEventListener("keydown", handleTabKey);
  }, [isOpen]);

  return (
    <div className="pointer-events-none fixed top-0 right-0 z-[100] h-full w-1/2">
      <Button
        ref={triggerRef}
        onClick={triggerNav}
        variant={"link"}
        aria-expanded={isOpen}
        aria-controls="nav-menu"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        className="silkscreen pointer-events-auto absolute top-0 right-0 z-10"
      >
        {isOpen ? "Close" : "Menu"}
      </Button>
      <AnimatePresence>
        {isOpen && (
          <LazyMotion features={domAnimation}>
            <m.div
              id="nav-menu"
              ref={menuRef}
              role="dialog"
              aria-label="Navigation menu"
              className="relative flex h-full w-full flex-col items-center justify-center gap-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {route.map(({ label, href }) => (
                <m.div
                  key={label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                >
                  <Button
                    variant={"link"}
                    className="text-4xl"
                    onClick={handleClick}
                  >
                    <Link to={href}>{label}</Link>
                  </Button>
                </m.div>
              ))}
            </m.div>
          </LazyMotion>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isOpen && (
          <LazyMotion features={domAnimation}>
            <m.div
              className="-z-10 pointer-events-auto absolute inset-0 origin-top-right bg-background duration-150 ease-out"
              initial={{ scaleY: 0.2 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0.2 }}
              onClick={closeMenu}
            />
          </LazyMotion>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Nav;
