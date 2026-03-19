import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "./components/ui/provider.tsx";
import { RouterProvider } from "react-router";
import router from "./router/index.tsx";
import { WalletProvider } from "./context/WalletContext.tsx";
import { SendTipProvider } from "./context/SendTipContext.tsx";
import { PreferenceProvider } from "./context/PreferenceContext.tsx";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "./lib/wagmi.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <WalletProvider>
            <SendTipProvider>
              <PreferenceProvider>
                <RouterProvider router={router} />
              </PreferenceProvider>
            </SendTipProvider>
          </WalletProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </Provider>
  </StrictMode>
);
