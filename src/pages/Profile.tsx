import {
  Avatar,
  Button,
  Box,
  Center,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
  Tabs,
} from "@chakra-ui/react";
import { GoArrowLeft } from "react-icons/go";
import ProfileImage from "@/assets/profile-image.jpg";
import CoverImage from "@/assets/cover-image.jpg";
import { copyToClipboard, truncateWalletAddress } from "@/utils/formatText";
import { CopyIcon } from "@/components/reusables/icon";
import ProfileTab from "@/components/reusables/ProfileTab";
import PreferenceTab from "@/components/reusables/PreferenceTab";

const Profile = () => {
  return (
    <VStack p={0} >
      <Center
        bg="white"
        pt={9}
        w={{base: "full", md: "794px"}}
        display="flex"
        flexDirection="column"
        gap={32}
        mb={{base: 6, md: 4}}
      >
        <VStack gap={6} w="full">
          <HStack gap={{base: 1, md: 2}} w="full" justify="start">
            <IconButton
              aria-label="Copy Wallet Address"
              size={{base: "lg", md: "2xl"}}
              color="textPrimary"
              variant="ghost"
              _hover={{
                bgColor: "bgPrimary",
              }}
            >
              <GoArrowLeft />
            </IconButton>
            <HStack gap={2}>
              <Avatar.Root size={{base: "lg" , md: "2xl"}}>
                <Avatar.Fallback name="Person Name" />
                <Avatar.Image src={ProfileImage} objectPosition="bottom" />
              </Avatar.Root>
              <Text fontSize={{base: "md", md: "xl"}}>@ abí</Text>
            </HStack>
          </HStack>
          <VStack w="full" position="relative">
            <Box
              w="full"
              h={{base: "180px", md: "241px"}}
              background={`url(${CoverImage})`}
              backgroundPosition="top"
              backgroundSize="cover"
              backgroundRepeat="no-repeat"
              borderBottomRadius="xl"
            />
            <HStack
              w="full"
              justify="space-between"
              position="absolute"
              bottom={{base: "-80px", md: "-120px"}}
            >
              <HStack>
                <Image
                  boxSize={{base: 24, md: 36}}
                  borderRadius="full"
                  border={{base: "6px solid white", md: "10px solid white"}}
                  src={ProfileImage}
                  objectFit="cover"
                  objectPosition="bottom"
                />
                <VStack align="start" gap={{base: 0, md: 1}} pt={{base: 4, md: 0}}>
                  <Text fontSize={{base: "md", md: "xl"}}>@ abí</Text>
                  <HStack gap={2}>
                    <Text color="textSecondary" fontSize={{base: "xs", md: "sm"}}>
                      {truncateWalletAddress(
                        "0x4aF934569203874072030Ed9e",
                        6,
                        8
                      )}
                    </Text>
                    <IconButton
                      aria-label="Copy Wallet Address"
                      size="sm"
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
                </VStack>
              </HStack>
              <Button variant="subtle" borderRadius="xl" size="sm">
                Edit profile
              </Button>
            </HStack>
          </VStack>
        </VStack>
        <Tabs.Root defaultValue="profile" w="full" variant="customLine">
          <Tabs.List>
            <Tabs.Trigger value="profile">Profile</Tabs.Trigger>
            <Tabs.Trigger value="preference">Preferences</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="profile" bg="bgSecondary" p={4}>
            <ProfileTab />
          </Tabs.Content>
          <Tabs.Content value="preference" bg="bgSecondary" p={4}>
            <PreferenceTab />
          </Tabs.Content>
        </Tabs.Root>
      </Center>
    </VStack>
  );
};

export default Profile;
