import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "./components/ui/provider.tsx";
import { RouterProvider } from "react-router";
import router from "./router/index.tsx";
import { WalletProvider } from "./context/WalletContext.tsx";
import { TipProvider } from "./context/TipContext.tsx";
import { PreferenceProvider } from "./context/PreferenceContext.tsx";
import { WagmiProvider } from "wagmi";
import { wagmiAdapter } from "./lib/wagmi.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <WagmiProvider config={wagmiAdapter.wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <WalletProvider>
            <TipProvider>
              <PreferenceProvider>
                <RouterProvider router={router} />
              </PreferenceProvider>
            </TipProvider>
          </WalletProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </Provider>
  </StrictMode>
);
