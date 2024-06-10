import { createBreakpoint } from "react-use";
import tailwind from "tailwindcss/defaultTheme";

export const breakpoints = {
    sm: 0,
    md: Number.parseInt(tailwind.screens.sm),
    lg: Number.parseInt(tailwind.screens.md),
    xl: Number.parseInt(tailwind.screens.lg),
};

const useBreakpoint = createBreakpoint(
    breakpoints
) as () => keyof typeof breakpoints;

export default useBreakpoint;
