import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Portfolio from "./Page/Portfolio";
import Dashboard from "./Page/Dashboard";
import Layout from "./Page/Layout";

const root = document.getElementById("root");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/portfolio",
        element: <Portfolio />,
      },
    ],
  },
]);

ReactDOM.createRoot(root).render(<RouterProvider router={router} />);
