import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Container } from "@chakra-ui/react";
import { WalletProvider } from "@/context/WalletContext";
import { SendTipProvider } from "@/context/SendTipContext";
import { PreferenceProvider } from "@/context/PreferenceContext";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <WalletProvider>
      <SendTipProvider>
        <PreferenceProvider>
          <Container
            minH="100vh"
            w="full"
            display="flex"
            flexDirection="column"
          >
            <Navbar />
            <Container w="full" flex={1} pt="91px">
              {children}
            </Container>
            <Footer />
          </Container>
        </PreferenceProvider>
      </SendTipProvider>
    </WalletProvider>
  );
};

export default Layout;
