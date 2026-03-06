import { HStack, Link, Text, VStack, Icon, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { VscLink } from "react-icons/vsc";
import { TbBrandInstagramFilled } from "react-icons/tb";
import { FaXTwitter, FaTiktok } from "react-icons/fa6";
import { CopyIcon } from "../icon";
import { copyToClipboard } from "@/utils/formatText";

const CHAR_LIMIT = 120;

const bio =
  "Hi I'm Abi. Digital creator and blockchain enthusiast. w9hwhwfhfhwfwhgwhjej5u5eyjw4yjegiadngdnaghaegdnbeheghgwhfwfhwfbegghsukwjjnhdskaiolabhsjjhuyislodmnszhjsvznjksnj";

const About = () => {
  const [expanded, setExpanded] = useState(false);

  const isLong = bio.length > CHAR_LIMIT;
  const displayText =
    !expanded && isLong ? bio.slice(0, CHAR_LIMIT) + "..." : bio;

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
      <VStack gap={2} fontSize="sm" align="start" w="full">
        <Text color="textSecondary">About</Text>
        <Text mt={2} lineHeight="20px" w="full" wordBreak="break-word">
          {displayText}
        </Text>
        {isLong && (
          <Link
            as="button"
            variant="underline"
            fontSize="xs"
            color="blue.500"
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded ? "Show less" : "Show more"}
          </Link>
        )}
      </VStack>
      <VStack gap={1} align="start" mt={2}>
        <Text color="textSecondary" fontSize="xs">
          Profile Link
        </Text>
        <HStack>
          <Icon size="md">
            <VscLink />
          </Icon>
          <Link variant="underline" fontSize="sm" color="blue.500">
            tipease.com/abidemi
          </Link>
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
        </HStack>
      </VStack>
      <VStack gap={2} align="start" fontSize="sm">
        <Text color="textSecondary" fontSize="xs">
          Socials
        </Text>
        <HStack gap={4}>
          <Link asChild>
            <Icon size="md" color="textLight">
              <TbBrandInstagramFilled />
            </Icon>
          </Link>
          <Link asChild>
            <Icon size="md" color="textLight">
              <FaXTwitter />
            </Icon>
          </Link>
          <Link asChild>
            <Icon size="md" color="textLight">
              <FaTiktok />
            </Icon>
          </Link>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default About;
