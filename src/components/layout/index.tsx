import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Container } from "@chakra-ui/react";
import { Toaster } from "@/components/ui/toaster";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Container
      minH="100vh"
      w="full"
      display="flex"
      flexDirection="column"
    >
      <Toaster />
      <Navbar />
      <Container w="full" flex={1} pt="91px">
        {children}
      </Container>
      <Footer />
    </Container>
  );
};

export default Layout;
