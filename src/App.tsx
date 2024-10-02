import { lazy, Suspense } from "react";
import { createHashRouter, Navigate, RouterProvider } from "react-router-dom";
import ProjectDetailsSkeleton from "@/components/projectDetails/skeletons/projectDetailsSkeletons";
import LandingPage from "@/pages/landing";

const ProjectPage = lazy(() => import("./pages/projects"));

function App() {
    const router = createHashRouter([
        {
            path: "/",
            element: (
                <Suspense fallback={<div />}>
                    <LandingPage />
                </Suspense>
            ),
        },
        {
            path: "/projects/",
            element: <Navigate to="/vite-portfolio" />,
        },
        {
            path: "/projects/:id",
            element: (
                <Suspense fallback={<ProjectDetailsSkeleton />}>
                    <ProjectPage />
                </Suspense>
            ),
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
