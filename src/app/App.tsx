import Layout from "@/components/layout/Layout";
import HomePage from "@/pages/Home";
import NotFoundPage from "@/pages/NotFound";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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

export function AppRouter() {
  return <RouterProvider router={router} />;
}

function App() {
  return <AppRouter />;
}

export default App;
