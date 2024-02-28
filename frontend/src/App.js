import React from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage } from "./components/pages/HomePage";
import { ShowPage } from "./components/pages/Show";
import BaseLayout from "./components/layouts/BaseLayout";
import { CreateProposalPage } from "components/pages/CreateProposal";

function App() {
  const router = createBrowserRouter([
    {
      path: "frontend",
      element: <BaseLayout children={<HomePage />} />,
    },
    {
      path: "show",
      element: <ShowPage />,
    },
    {
      path: "create",
      element: <BaseLayout children={<CreateProposalPage />} />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
