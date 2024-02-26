import React from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage } from "./components/pages/HomePage";
import { ShowPage } from "./components/pages/Show";
import BaseLayout from "./components/layouts/BaseLayout";

function App() {
  const router = createBrowserRouter([
    {
      path: "frontend",
      element: <BaseLayout children={<HomePage />} />,
    },
    {
      path: "create",
      element: <div>World, Hello!!</div>,
    },
    {
      path: "show",
      element: <ShowPage />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
