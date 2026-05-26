import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AnimatePresence, LazyMotion, m } from "motion/react";
import { domAnimation } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

const route = [
  { label: "Home", href: "/" },
  { label: "Project", href: "/project" },
  { label: "Experience", href: "/experience" },
  { label: "More", href: "/more" },
];

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  }, []);

  const triggerNav = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleLinkClick = useCallback(() => {
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
  }, [isOpen, closeMenu]);

  // Focus trap when menu is open
  useEffect(() => {
    if (!isOpen || !menuRef.current) return;

    const menuEl = menuRef.current;
    const focusableElements = menuEl.querySelectorAll<HTMLElement>(
      "a[href], button:not([disabled])",
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
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
        variant="link"
        aria-expanded={isOpen}
        aria-controls="nav-menu"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        className="silkscreen pointer-events-auto absolute top-0 right-0 z-10"
      >
        {isOpen ? "Close" : "Menu"}
      </Button>

      <AnimatePresence mode="wait">
        {isOpen && (
          <LazyMotion features={domAnimation}>
            <m.dialog
              id="nav-menu"
              ref={menuRef}
              open
              aria-label="Navigation menu"
              className="relative flex h-full w-full flex-col items-center justify-center gap-10 border-0 bg-transparent p-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {route.map(({ label, href }) => (
                <m.div
                  key={label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                  className="pointer-events-auto"
                >
                  <Button
                    variant="link"
                    className="text-4xl"
                    onClick={handleLinkClick}
                  >
                    <Link to={href}>{label}</Link>
                  </Button>
                </m.div>
              ))}
            </m.dialog>
          </LazyMotion>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isOpen && (
          <LazyMotion features={domAnimation}>
            <m.div
              className="-z-10 pointer-events-auto absolute inset-0 origin-top-right bg-background"
              initial={{ scaleY: 0.2 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0.2 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              onClick={closeMenu}
            />
          </LazyMotion>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Nav;
