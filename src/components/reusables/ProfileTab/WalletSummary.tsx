import { useState } from "react";
import {
  Button,
  Field,
  HStack,
  IconButton,
  Input,
  InputGroup,
  Switch,
  Text,
  VStack,
} from "@chakra-ui/react";
import { TbEdit } from "react-icons/tb";
import { CopyIcon } from "../icon";
import { copyToClipboard } from "@/utils/formatText";

const WalletSummary = () => {
  const [tagName, setTagName] = useState("@abi");
  const [walletAddress, setWalletAddress] = useState(
    "0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
  );

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
      <Text fontSize="sm">Wallet</Text>
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
                onClick={() => console.log("clicked")}
              >
                <TbEdit />
                Edit
              </Button>
            }
          >
            <Input
              placeholder="Add tag"
              fontSize="2xs"
              value={tagName}
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
                onClick={() => {
                  copyToClipboard("tipease.com/abidemi");
                }}
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
              onChange={(e) => setWalletAddress(e.target.value)}
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
