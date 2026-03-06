import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Container } from "@chakra-ui/react";
import { WalletProvider } from "@/context/WalletContext";
import { SendTipProvider } from "@/context/SendTipContext";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <WalletProvider>
      <SendTipProvider>
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
      </SendTipProvider>
    </WalletProvider>
  );
};

export default Layout;
