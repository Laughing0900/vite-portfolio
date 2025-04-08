import Layout from "@/components/layout/Layout";
import HomePage from "@/pages/Home";
import NotFoundPage from "@/pages/NotFound";
import { ReactLenis } from "lenis/react";
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
  return (
    <ReactLenis root>
      <RouterProvider router={router} />
    </ReactLenis>
  );
}

export default App;
