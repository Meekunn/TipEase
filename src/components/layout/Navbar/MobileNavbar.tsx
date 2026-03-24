import ConnectWalletDialog from "@/components/reusables/ConnectWalletDialog";
import { EmptyWalletIcon } from "@/components/reusables/icon";
import { Button, CloseButton, Drawer,  HStack,  Image, Portal, VStack } from "@chakra-ui/react"
import { type ReactNode } from "react"
import { NavLink } from "react-router";
import logo from "@/assets/icons/logo.svg";
import WalletConnected from "./WalletConnected";
import "./navbar.css";

interface MobileNavbarProps {
  triggerElement: ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isWalletConnected: boolean;
  wallet: IUser
}

const MobileNavbar = ({triggerElement, open, setOpen, isWalletConnected, wallet}: MobileNavbarProps) => {

  return (
    <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
      {triggerElement}
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner padding={2}>
          <Drawer.Content rounded="lg">
            <Drawer.Header>
              <Drawer.Title><Image src={logo} alt="TipEase Logo" /></Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <VStack align="start" w="full" gap={3}>
                <Button
                  asChild
                  variant="navBtnLink"
                  borderRadius="xl"
                  w="full"
                >
                  <NavLink
                    to="/profile"
                    className={({ isActive, isPending, isTransitioning }) =>
                      [
                        isPending ? "pending" : "",
                        isActive ? "active" : "",
                        isTransitioning ? "transitioning" : "",
                      ].join(" ")
                    }
                  >
                    Profile
                  </NavLink>
                </Button>
                <Button asChild variant="navBtnLink" borderRadius="xl"  w="full">
                  <NavLink
                    to="/"
                    className={({ isActive, isPending, isTransitioning }) =>
                      [
                        isPending ? "pending" : "",
                        isActive ? "active" : "",
                        isTransitioning ? "transitioning" : "",
                      ].join(" ")
                    }
                  >
                    Send a tip
                  </NavLink>
                </Button>
                <Button
                  asChild
                  variant="navBtnLink"
                  borderRadius="xl"
                   w="full"
                >
                  <NavLink
                    to="/support"
                    className={({ isActive, isPending, isTransitioning }) =>
                      [
                        isPending ? "pending" : "",
                        isActive ? "active" : "",
                        isTransitioning ? "transitioning" : "",
                      ].join(" ")
                    }
                  >
                    Support
                  </NavLink>
                </Button>
              </VStack>
            </Drawer.Body>
            <Drawer.Footer>
              {isWalletConnected ? (
                <WalletConnected wallet={wallet} addrFirstChars={10} addrLastChars={10} />
              ) : (
              <HStack w="full">
                <ConnectWalletDialog>
                  <Button borderRadius="lg" w="full">
                    Connect <EmptyWalletIcon />
                  </Button>
                </ConnectWalletDialog>
              </HStack>
              )}
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
} 

export default MobileNavbar