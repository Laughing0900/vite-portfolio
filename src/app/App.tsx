import Layout from "@/components/layout/Layout";
import { lazy, Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Lazy load all pages for better code splitting
const HomePage = lazy(() => import("@/pages/Home"));
const ProjectPage = lazy(() => import("@/pages/Project"));
const ExperiencePage = lazy(() => import("@/pages/Experience"));
const NotFoundPage = lazy(() => import("@/pages/NotFound"));
const GlassHeroPage = lazy(() => import("@/pages/GlassHeroPage"));

// Simple loading fallback
const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
  </div>
);

const router = createBrowserRouter([
  {
    path: "/glass-hero",
    element: (
      <Suspense fallback={<PageLoader />}>
        <GlassHeroPage />
      </Suspense>
    ),
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "project",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProjectPage />
          </Suspense>
        ),
      },
      {
        path: "experience",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ExperiencePage />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<PageLoader />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
