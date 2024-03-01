import React from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage } from "./components/pages/HomePage";
import { ShowPage } from "./components/pages/Show";
import BaseLayout from "./components/layouts/BaseLayout";
import { CreateProposalPage } from "components/pages/CreateProposal";

import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { WagmiProvider } from "wagmi";
import { arbitrum, mainnet, sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient()

const projectId = process.env.REACT_APP_WAGMI_PROJECT_ID;

const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [arbitrum, mainnet, sepolia];
const config = defaultWagmiConfig({
  // @ts-ignore
  chains, // required
  projectId, // required
  metadata, // required
  enableWalletConnect: true, // Optional - true by default
  enableInjected: true, // Optional - true by default
  enableEIP6963: true, // Optional - true by default
  enableCoinbase: true, // Optional - true by default
});

// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

export function ContextProvider({ children }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

function App() {
  const router = createBrowserRouter([
    {
      path: "frontend",
      element: <BaseLayout children={<HomePage />} />,
    },
    {
      path: "show",
      element: <BaseLayout children={<ShowPage />} />,
    },
    {
      path: "create",
      element: <BaseLayout children={<CreateProposalPage />} />,
    },
  ]);

  const children = (
    <div>
      <RouterProvider router={router} />
    </div>
  );

  return ContextProvider({ children });
  // < div >
  // <RouterProvider router={router} />
  // </div >
}

export default App;
