import { lazy } from "react";
import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from "react-router-dom";
import LandingPage from "@/pages/landing";

const ProjectPage = lazy(() => import("./pages/projects"));

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Navigate to="/vite-portfolio" />,
        },
        {
            path: "/vite-portfolio",
            element: <Navigate to="/vite-portfolio/" />,
        },
        {
            path: "/vite-portfolio/",
            element: <LandingPage />,
        },
        {
            path: "/vite-portfolio/projects/",
            element: <Navigate to="/vite-portfolio" />,
        },
        {
            path: "/vite-portfolio/projects/:id",
            element: <ProjectPage />,
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
