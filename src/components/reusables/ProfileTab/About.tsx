import { HStack, Link, Text, VStack, Icon, IconButton, SkeletonText } from "@chakra-ui/react";
import { useState } from "react";
import { VscLink } from "react-icons/vsc";
import { TbBrandInstagramFilled } from "react-icons/tb";
import { FaXTwitter, FaTiktok } from "react-icons/fa6";
import { CopyIcon } from "../icon";
import { copyToClipboard } from "@/utils/formatText";
import { useGetUser } from "@/lib/queries";

const CHAR_LIMIT = 120;

const About = () => {

  const {data: user, isLoading} = useGetUser();
  const [expanded, setExpanded] = useState(false);

  const bio = user?.bio ?? "Edit your profile to add a bio"
  const profileLink = user?.tagName ? `tipease.com/${user.tagName}` : '';
  const hasSocials = !!(user?.instagram || user?.twitter || user?.tiktok);

  const isLong = bio.length > CHAR_LIMIT;
  const displayText =
    !expanded && isLong ? bio.slice(0, CHAR_LIMIT) + " ..." : bio;

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
        <SkeletonText noOfLines={3} w="full" />
        <SkeletonText noOfLines={1} w="48" />
        <SkeletonText noOfLines={1} w="32" />
      </VStack>
    );
  }

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
      <VStack gap={1} align="start" mt={2} w="full">
        <Text color="textSecondary" fontSize="xs">
          Profile Link
        </Text>
        <HStack>
          <Icon size="md">
            <VscLink />
          </Icon>
          <Link variant="underline" fontSize="sm" color="blue.500">
            {profileLink}
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
      {hasSocials && (
        <VStack gap={2} align="start" fontSize="sm" w="full">
          <Text color="textSecondary" fontSize="xs">Socials</Text>
          <HStack gap={4}>
            {user?.instagram && (
              <Link href={user.instagram} target="_blank">
                <Icon size="md" color="textLight"><TbBrandInstagramFilled /></Icon>
              </Link>
            )}
            {user?.twitter && (
              <Link href={user.twitter} target="_blank">
                <Icon size="md" color="textLight"><FaXTwitter /></Icon>
              </Link>
            )}
            {user?.tiktok && (
              <Link href={user.tiktok} target="_blank">
                <Icon size="md" color="textLight"><FaTiktok /></Icon>
              </Link>
            )}
          </HStack>
        </VStack>
      )}
    </VStack>
  );
};

export default About;
