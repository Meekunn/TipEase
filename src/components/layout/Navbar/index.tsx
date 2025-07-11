import { useState } from "react";
import {
  Button,
  HStack,
  IconButton,
  Image,
  Dialog,
  Avatar,
  Text,
  Float,
  Circle,
  Box,
} from "@chakra-ui/react";
import { NavLink } from "react-router";
import { GoBell } from "react-icons/go";
import logo from "@/assets/icons/logo.svg";
import "./navbar.css";
import { CopyIcon, EmptyWalletIcon } from "@/components/reusables/icon";
import ConnectWalletDialog from "@/components/reusables/ConnectWalletDialog";
import ProfileImage from "@/assets/profile-image.jpg";
import { copyToClipboard, truncateWalletAddress } from "@/utils/formatText";
import { TbCaretDownFilled } from "react-icons/tb";

const Navbar = () => {
  const [isWalletConnected] = useState(true);
  const [isNotification] = useState(true);

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
        {isWalletConnected ? (
          <HStack
            border="0.6px solid"
            borderColor="bgPrimary"
            bg="bgSecondary"
            px={2}
            py={1}
            gap={2}
            borderRadius="xl"
          >
            <HStack gap={2}>
              <Avatar.Root size="2xs">
                <Avatar.Fallback name="Person Name" />
                <Avatar.Image src={ProfileImage} objectPosition="bottom" />
              </Avatar.Root>
              <Text color="textLight" fontSize="xs">
                {truncateWalletAddress("0x4aF934569203874072030Ed9e")}
              </Text>
              <IconButton
                aria-label="Copy Wallet Address"
                size="xs"
                variant="ghost"
                p={0}
                _hover={{
                  bgColor: "bgPrimary",
                }}
                onClick={() => {
                  copyToClipboard("0x4aF934569203874072030Ed9e");
                }}
              >
                <CopyIcon />
              </IconButton>
            </HStack>
            <IconButton
              aria-label="Copy Wallet Address"
              size="xs"
              variant="ghost"
              color="textSecondary"
              _hover={{
                bgColor: "bgPrimary",
              }}
            >
              <TbCaretDownFilled />
            </IconButton>
          </HStack>
        ) : (
          <ConnectWalletDialog>
            <Dialog.Trigger asChild>
              <Button variant="subtle" borderRadius="lg">
                Connect <EmptyWalletIcon />
              </Button>
            </Dialog.Trigger>
          </ConnectWalletDialog>
        )}
      </HStack>
    </HStack>
  );
};

export default Navbar;
