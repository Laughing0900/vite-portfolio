import path from "path";
import MillionLint from "@million/lint";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths(),
        // MillionLint.vite()
    ],
    base: "/vite-portfolio/", // git repository name
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    build: {
        // rollupOptions: {
        //     external: ["react"],
        //     output: {
        //         globals: {
        //             react: "React",
        //         },
        //     },
        // },
    },
});
