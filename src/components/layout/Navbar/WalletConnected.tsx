import { CopyIcon } from "@/components/reusables/icon";
import { useWallet } from "@/hooks/useWallet";
import { copyToClipboard, truncateWalletAddress } from "@/utils/formatText";
import { Avatar, Button, HStack, IconButton, Portal, Popover, Text } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { TbCaretDownFilled } from "react-icons/tb";
import { VscDebugDisconnect } from "react-icons/vsc";

interface IWalletConnected {
  wallet: IWallet;
  isMobileNav?: boolean;
  addrFirstChars?: number;
  addrLastChars?: number
}

const WalletPopover = ({children}: {children: ReactNode}) => {

  const {deleteWallet} = useWallet()
  
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        {children}
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content w="fit">
            <Popover.Arrow />
            <Popover.Body >
              <Button colorPalette="red" variant="surface" onClick={deleteWallet}>Disconnect <VscDebugDisconnect /></Button>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  )
}


const WalletConnected = ({wallet, isMobileNav = false, addrFirstChars = 6, addrLastChars =  4}: IWalletConnected) => {
  return (
    <>
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
            <Avatar.Fallback name={wallet.name} />
            <Avatar.Image src={wallet.image} objectPosition="bottom" />
          </Avatar.Root>
          <Text color="textLight" fontSize="xs" display={isMobileNav ? "none": "inline-block"}>
            {truncateWalletAddress(wallet.address, addrFirstChars, addrLastChars)}
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
              copyToClipboard(wallet.address);
            }}
            display={isMobileNav ? "none": "inline-flex"}
          >
            <CopyIcon />
          </IconButton>
        </HStack>
        <WalletPopover>
          <IconButton
            aria-label="Open Options"
            size="xs"
            variant="ghost"
            color="textSecondary"
            _hover={{
              bgColor: "bgPrimary",
            }}
          >
            <TbCaretDownFilled />
          </IconButton>
        </WalletPopover>
      </HStack>
      
    </>
  )
}

export default WalletConnected