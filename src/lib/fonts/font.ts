import { K2D } from "next/font/google";
import localFont from "next/font/local";

export const cyborg = localFont({
    src: "./Cyborg.woff2",
    display: "swap",
    variable: "--font-cyborg",
});

export const k2d = K2D({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
    display: "swap",
    variable: "--font-k2d",
});
