import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Field,
  HStack,
  IconButton,
  Input,
  InputGroup,
  SkeletonText,
  Switch,
  Text,
  VStack,
} from "@chakra-ui/react";
import { TbEdit } from "react-icons/tb";
import { CopyIcon, EmptyWalletIcon } from "../icon";
import { copyToClipboard } from "@/utils/formatText";
import { useWallet } from "@/hooks/useWallet";
import { useGetUser } from "@/lib/queries";
import { useUpdateUser } from "@/lib/mutations";
import ConnectWalletDialog from "../ConnectWalletDialog";

const WalletSummary = () => {

  const {data: user, isLoading} = useGetUser();
  const { mutate: updateUser, isPending } = useUpdateUser();
  const { wallet, isConnected } = useWallet();

  const [isEditingTag, setIsEditingTag] = useState(false);
  const [tagName, setTagName] = useState("");

  const walletAddress = wallet?.walletAddress ?? ""

  useEffect(() => {
    if (user?.tagName) setTagName(user.tagName);
  }, [user?.tagName]);

  const handleSaveTagName = () => {
    updateUser(
      { tagName },
      {
        onSuccess: () => setIsEditingTag(false),
        onError: () => console.error('Failed to update tag name'),
      }
    );
  };

  if (!isConnected) {
    return(
    <VStack
      bg="white"
      border="0.6px solid"
      borderColor="bgPrimary"
      p={6}
      gap={5}
      borderRadius="xl"
      w="full"
      align="center"
    >
      <Text fontSize="sm" textAlign="center">You need to connect your wallet to view your wallet summary</Text>
      <ConnectWalletDialog>
        <Dialog.Trigger asChild>
          <Button borderRadius="lg">
            Connect Wallet <EmptyWalletIcon />
          </Button>
        </Dialog.Trigger>
      </ConnectWalletDialog>
    </VStack>
    )
  }

  if (isLoading) {
    return (
    <VStack
      bg="white"
      border="0.6px solid"
      borderColor="bgPrimary"
      p={4}
      gap={6}
      borderRadius="xl"
      w="full"
      align="start"
    >
      <Text fontSize="sm">Wallet Summary</Text>
      <SkeletonText noOfLines={5} w="full" gap={2} />
    </VStack>
    )
  };

  return (
    <VStack
      bg="white"
      border="0.6px solid"
      borderColor="bgPrimary"
      p={4}
      gap={6}
      borderRadius="xl"
      w="full"
      align="start"
    >
      <Text fontSize="sm">Wallet Summary</Text>
      <VStack gap={4} align="start">
        <Field.Root>
          <Field.Label color="textSecondary" fontSize="xs">
            Tag Name
          </Field.Label>
          <InputGroup
            flex="1"
            endElement={
              <Button
                borderRadius="2xl"
                py={1}
                h="fit-content"
                px={2}
                gap={1}
                bgColor="bgSecondary"
                color="textPrimary"
                fontSize="2xs"
                _hover={{ bgColor: "bgPrimary" }}
                onClick={() => {
                  if (isEditingTag) {
                    handleSaveTagName();
                  } else {
                    setIsEditingTag(true);
                  }
                }}
                loading={isPending}                
              >
                <TbEdit />
                {isEditingTag ? "Save" : "Edit"}
              </Button>
            }
          >
            <Input
              placeholder="Add tag"
              fontSize="2xs"
              value={tagName}
              disabled={!isEditingTag}
              onChange={(e) => setTagName(e.target.value)}
            />
          </InputGroup>
        </Field.Root>
        <Field.Root>
          <Field.Label color="textSecondary" fontSize="xs">
            Connected Wallet
          </Field.Label>
          <InputGroup
            flex="1"
            endElement={
              <IconButton
                aria-label="Copy Profile Link"
                size="sm"
                variant="ghost"
                p={0}
                mx={2}
                _hover={{
                  bgColor: "bgPrimary",
                }}
                onClick={() => copyToClipboard(walletAddress)}
              >
                <CopyIcon />
              </IconButton>
            }
          >
            <Input
              disabled
              placeholder="Connected Wallet Address"
              fontSize="2xs"
              color="textSecondary"
              value={walletAddress}
              _disabled={{
                bg: "bgSecondary",
                color: "textSecondary",
              }}
            />
          </InputGroup>
        </Field.Root>
        <VStack gap={2} align="start">
          <Text fontSize="xs" color="textSecondary">
            Display wallet address in profile
          </Text>
          <HStack w="full" justify="space-between">
            <Switch.Root
              colorPalette="gray"
              size="lg"
              w="full"
              justifyContent="space-between"
              checked={user?.showWalletAddress ?? true}
              onCheckedChange={({ checked }) =>
                updateUser({ showWalletAddress: checked })
              }
            >
              <Switch.HiddenInput />
              <Switch.Label fontSize="xs" lineHeight="16px">
                Show a shortened version of your wallet address on your public
                profile
              </Switch.Label>
              <Switch.Control>
                <Switch.Thumb />
                <Switch.Indicator />
              </Switch.Control>
            </Switch.Root>
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default WalletSummary;
