import { Button, HStack, IconButton, Image } from "@chakra-ui/react";
import { NavLink } from "react-router";
import { GoBell } from "react-icons/go";
import logo from "@/assets/icons/logo.svg";
import "./navbar.css";
import { EmptyWalletIcon } from "@/components/reusables/icon";

const Navbar = () => {
  return (
    <HStack
      justify="space-between"
      align="center"
      w="100%"
      borderBottom="1px solid"
      borderColor="bgSecondary"
      px={32}
      py={6}
    >
      <Image src={logo} alt="TipEase Logo" />
      <HStack gap={2} align="center">
        <Button
          asChild
          variant="navBtnLink"
          borderTopLeftRadius="xl"
          borderBottomLeftRadius="xl"
        >
          <NavLink
            to="/features"
            className={({ isActive, isPending, isTransitioning }) =>
              [
                isPending ? "pending" : "",
                isActive ? "active" : "",
                isTransitioning ? "transitioning" : "",
              ].join(" ")
            }
          >
            Features
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
          <GoBell />
        </IconButton>
        <Button variant="subtle" borderRadius="lg">
          Connect <EmptyWalletIcon />
        </Button>
      </HStack>
    </HStack>
  );
};

export default Navbar;
