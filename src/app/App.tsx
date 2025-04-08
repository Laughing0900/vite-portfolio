import LenisProvider from "@/app/providers/LenisProvider";
import Layout from "@/components/layout/Layout";
import HomePage from "@/pages/Home";
import NotFoundPage from "@/pages/NotFound";
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
    <LenisProvider>
      <RouterProvider router={router} />
    </LenisProvider>
  );
}

export default App;
