import Layout from "@/components/layout/Layout";
import ExperiencePage from "@/pages/Experience";
import HomePage from "@/pages/Home";
import NotFoundPage from "@/pages/NotFound";
import ProjectPage from "@/pages/Project";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        errorElement: <NotFoundPage />,
        children: [
          {
            path: "/",
            element: <HomePage />,
          },
          {
            path: "/project",
            element: <ProjectPage />,
          },
          {
            path: "/experience",
            element: <ExperiencePage />,
          },
        ],
      },
    ],
  },
  {
    /**
     * @dev: 404 fallback
     */
    path: "*",
    element: <NotFoundPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
