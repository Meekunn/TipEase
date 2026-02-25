import { useEffect, useRef } from "react";
import { ClipboardIcon, UsdtIcon } from "@/components/reusables/icon";
import SelectCurrency from "@/components/reusables/SelectCurrency";
import {
  Button,
  createListCollection,
  Field,
  HStack,
  Input,
  InputGroup,
  NumberInput,
  Switch,
  Tag,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { RiVuejsLine, RiAngularjsLine } from "react-icons/ri";
import { VscCircleFilled } from "react-icons/vsc";

interface TipFormProps {
  children?: React.ReactNode;
  border?: boolean;
}

const TipForm = ({ children, border = true }: TipFormProps) => {
  const currencies = createListCollection({
    items: [
      { label: "USDT", value: "react", icon: <UsdtIcon /> },
      { label: "USDC", value: "vue", icon: <RiVuejsLine /> },
      { label: "TRX", value: "angular", icon: <RiAngularjsLine /> },
    ],
  });

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <VStack
        border={border ? "0.6px solid" : "none"}
        borderColor={border ? "bgPrimary" : "transparent"}
        borderRadius="xl"
        p={3}
        gap={8}
        w="full"
        bgColor="white"
      >
        <VStack
          bgColor="bgSecondary"
          p={4}
          borderRadius="xl"
          border="0.6px solid"
          borderColor="bgPrimary"
          gap={6}
          w="full"
        >
          <HStack justify="space-between" align="center" w="full">
            <Text fontSize="sm" color="textSecondary">
              Tip
            </Text>
            <SelectCurrency currencies={currencies} />
          </HStack>
          <HStack justify="space-between" align="center" w="full">
            <NumberInput.Root variant="borderless">
              <NumberInput.Input placeholder="0.00" ref={inputRef} />
            </NumberInput.Root>
            <HStack align="center" gap={2}>
              <Tag.Root variant="roundTag" colorPalette="orange">
                <Tag.StartElement>
                  <VscCircleFilled />
                </Tag.StartElement>
                <Tag.Label>Min</Tag.Label>
              </Tag.Root>
              <Tag.Root variant="roundTag" colorPalette="green">
                <Tag.StartElement>
                  <VscCircleFilled />
                </Tag.StartElement>
                <Tag.Label>Max</Tag.Label>
              </Tag.Root>
            </HStack>
          </HStack>
          <HStack justify="space-between" align="center" w="full">
            <Text fontSize="sm" color="textSecondary">
              Bal:{" "}
              <Text as="span" color="textPrimary">
                {" "}
                21.42313
              </Text>
            </Text>
            <Text fontSize="sm" color="textSecondary">
              1 USDT ≈ $1 USD
            </Text>
          </HStack>
        </VStack>
        <Field.Root>
          <Field.Label color="textSecondary">Tag</Field.Label>
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
                <ClipboardIcon color="#292D32" />
                Paste
              </Button>
            }
          >
            <Input placeholder="Add tag" />
          </InputGroup>
        </Field.Root>
        <Field.Root>
          <Field.Label color="textSecondary">Message (Optional)</Field.Label>
          <Textarea maxH="5lh" h={28} placeholder="Add a note" />
        </Field.Root>
      </VStack>
      <HStack justify="start" w="full" my={2} bg="transparent">
        <Switch.Root colorPalette="gray" size="lg">
          <Switch.HiddenInput />
          <Switch.Control>
            <Switch.Thumb />
            <Switch.Indicator
              fallback={
                <Text fontSize="2xs" color="textSecondary">
                  OFF
                </Text>
              }
            >
              <Text fontSize="2xs" color="white">
                ON
              </Text>
            </Switch.Indicator>
          </Switch.Control>
          <Switch.Label color="textSecondary">Remain anonymous</Switch.Label>
        </Switch.Root>
      </HStack>
      {children}
    </>
  );
};

export default TipForm;
