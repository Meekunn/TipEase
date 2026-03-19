import { useState } from "react";
import {
  Button,
  HStack,
  IconButton,
  Image,
  Dialog,
  Float,
  Circle,
  Box,
  Stack,
  Drawer,
} from "@chakra-ui/react";
import { NavLink } from "react-router";
import { GoBell } from "react-icons/go";
import logo from "@/assets/icons/logo.svg";
import { EmptyWalletIcon } from "@/components/reusables/icon";
import ConnectWalletDialog from "@/components/reusables/ConnectWalletDialog";
import MobileNavbar from "./MobileNavbar";
import { CgMenuRightAlt } from "react-icons/cg";
import { useWallet } from "@/hooks/useWallet";
import WalletConnected from "./WalletConnected";
import "./navbar.css";

const Navbar = () => {
  
  const {wallet, isConnected} = useWallet()

  const [open, setOpen] = useState(false)
  const [isNotification] = useState(false);

  const isWalletConnected = isConnected;

  return (
    <HStack
      justify="space-between"
      align="center"
      w="full"
      borderBottom="1px solid"
      borderColor="bgSecondary"
      bg="white"
      zIndex={999}
      px={{base: 6,  md: 32}}
      py={6}
      position="fixed"
      top={0}
      left={0}
    >
      <Image src={logo} alt="TipEase Logo" />
      <HStack gap={2} align="center" display={{base: 'none', md: "flex"}}>
        <Button
          asChild
          variant="navBtnLink"
          borderTopLeftRadius="xl"
          borderBottomLeftRadius="xl"
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
        <Button asChild variant="navBtnLink">
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
          borderTopRightRadius="xl"
          borderBottomRightRadius="xl"
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
      </HStack>
      <HStack gap={2} align="center">
        <IconButton
          aria-label="Notifications"
          borderRadius="md"
          bgColor="bgSecondary"
          color="textPrimary"
          _hover={{
            bgColor: "bgPrimary",
          }}
        >
          <Box position="relative">
            {isNotification && (
              <Float placement="top-end">
                <Circle size="4" bg="red" color="white" fontSize="xs">
                  3
                </Circle>
              </Float>
            )}
            <GoBell />
          </Box>
        </IconButton>
        <Stack display={{base: "flex", md: "none"}}>
          {isWalletConnected ? (
            <WalletConnected isMobileNav wallet={wallet} />
          ): ( 
            <ConnectWalletDialog>
              <Dialog.Trigger asChild>
                <IconButton aria-label="Connect Wallet" borderRadius="lg">
                  <EmptyWalletIcon />
                </IconButton>
              </Dialog.Trigger>
            </ConnectWalletDialog>
          )}
        </Stack>
        <Stack display={{base: "none", md: "flex"}}>
           {isWalletConnected ? (
            <WalletConnected wallet={wallet} />
          ) : (
            <ConnectWalletDialog>
              <Dialog.Trigger asChild>
                <Button borderRadius="lg">
                  Connect <EmptyWalletIcon />
                </Button>
              </Dialog.Trigger>
            </ConnectWalletDialog>
          )}
        </Stack>
        <MobileNavbar 
          open={open} 
          setOpen={setOpen} 
          isWalletConnected={isWalletConnected}
          wallet={wallet!}
          triggerElement={
            <Drawer.Trigger asChild display={{md: "none"}}>
              <IconButton>
                <CgMenuRightAlt />
              </IconButton>
            </Drawer.Trigger>
          }
        />
      </HStack>
    </HStack>
  );
};

export default Navbar;
