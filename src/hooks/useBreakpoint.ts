import { useMemo } from "react";
import { createBreakpoint } from "react-use";
import tailwind from "tailwindcss/defaultTheme";

export const config = {
    sm: 0,
    md: Number.parseInt(tailwind.screens.sm),
    lg: Number.parseInt(tailwind.screens.md),
    xl: Number.parseInt(tailwind.screens.lg),
};

const useBreakpoint = () => {
    const breakpoint = createBreakpoint(config)();

    const isMobile = useMemo(() => {
        return breakpoint === "md" || breakpoint === "sm";
    }, [breakpoint]);

    const isTablet = useMemo(() => {
        return (
            breakpoint === "md" || breakpoint === "sm" || breakpoint === "lg"
        );
    }, [breakpoint]);

    return { isTablet, isMobile, breakpoint };
};

export default useBreakpoint;
