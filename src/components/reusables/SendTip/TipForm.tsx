import { useRef, type JSX } from "react";
import SelectCurrency from "@/components/reusables/SelectCurrency";
import {
  Box,
  Button,
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
import { VscCircleFilled } from "react-icons/vsc";
import { pasteFromClipboard } from "@/utils/formatText";
import { useWallet } from "@/hooks/useWallet";
import { useSendTip } from "@/hooks/useSendTip";
import { Controller, useForm, useWatch } from "react-hook-form";
import { usePreference } from "@/hooks/usePreference";
import { cryptoCurrencyOptions } from "@/constants/currencies";
import { ClipboardIcon } from "../icon";
import { useWalletBalances } from "@/hooks/useWalletBalances";
import { useCoinPrices } from "@/hooks/useCoinPrices";

interface TipFormProps {
  children?: React.ReactNode;
  border?: boolean;
  btnText: string;
  setStep?: React.Dispatch<React.SetStateAction<number>>
  margintop?: number;
  btnPaddingY?: number;
  btnFontSize?: string;
}

const TipForm = ({ border = true, btnText, setStep, margintop = 16, btnPaddingY = 4, btnFontSize = "md" }: TipFormProps): JSX.Element => {

  const { preference } = usePreference();
  const {isConnected} = useWallet();
  const {updateSendTipForm, sendTipForm} = useSendTip();
  const {balances} = useWalletBalances();
  const { getPrice } = useCoinPrices();

  const amountInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<ISendTip>({
    defaultValues: {
      coin: sendTipForm.coin,
      amount: sendTipForm.amount,
      recipientAddress: sendTipForm.recipientAddress,
      note: sendTipForm.note,
      anonymous: sendTipForm.anonymous,
    }
  });

  const selectedCoin = useWatch({ control, name: "coin" });
  const currentBalance = balances[selectedCoin as keyof typeof balances];

  const onSubmit = (data: ISendTip) => {
    updateSendTipForm(data);
    if(setStep) {
      setStep(2)
    }
  };

  const pasteTag = async () => {
    const text = await pasteFromClipboard();
    if (text) setValue("recipientAddress", text);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
            borderColor={errors.amount ? "red.400" :"bgPrimary"}
            gap={6}
            w="full"
          >
            <HStack justify="space-between" align="center" w="full">
              <Text fontSize="sm" color="textSecondary">
                Tip
              </Text>
              <Field.Root invalid={!!errors.coin} w="fit">
                <Controller
                  name="coin"
                  control={control}
                  render={({ field }) => (
                    <SelectCurrency currencies={cryptoCurrencyOptions} onValueChange={(value) => field.onChange(value)}  />
                  )}
                />
              </Field.Root>
            </HStack>
            <HStack justify="space-between" align="center" w="full">
              <Field.Root invalid={!!errors.amount}>
                <Controller
                  name="amount"
                  control={control}
                  rules={{ required: "Amount is required" }}
                  render={({ field }) => (
                    <NumberInput.Root
                      variant="borderless"
                      value={field.value}
                      onValueChange={(e) => field.onChange(e.value)}
                    >
                      <NumberInput.Input placeholder="0.00" autoFocus ref={amountInputRef} />
                    </NumberInput.Root>
                  )}
                />
                {errors.amount && <Field.ErrorText>{errors.amount.message}</Field.ErrorText>}
              </Field.Root>
              <HStack align="center" gap={2}>
                <Box cursor="pointer" onClick={() => setValue("amount", preference.minTipAmount)}>
                  <Tag.Root variant="roundTag" colorPalette="orange">
                    <Tag.StartElement>
                      <VscCircleFilled />
                    </Tag.StartElement>
                    <Tag.Label>Min</Tag.Label>
                  </Tag.Root>
                </Box>
                <Box cursor="pointer" onClick={() => setValue("amount", currentBalance?.formatted ?? "0")}>
                  <Tag.Root variant="roundTag" colorPalette="green">
                    <Tag.StartElement>
                      <VscCircleFilled />
                    </Tag.StartElement>
                    <Tag.Label>Max</Tag.Label>
                  </Tag.Root>
                </Box>
              </HStack>
            </HStack>
            <HStack justify="space-between" align="center" w="full">
              <Text fontSize="sm" color="textSecondary">
                Bal:{" "}
                <Text as="span" color="textPrimary">
                  {currentBalance
                    ? Number(currentBalance.formatted).toFixed(4)
                    : "0"}{" "}
                  {currentBalance?.symbol}
                </Text>
              </Text>
              <Text fontSize="sm" color="textSecondary">
                 1 {currentBalance?.symbol} ≈ ${getPrice(selectedCoin).toLocaleString()} USD
              </Text>
            </HStack>
          </VStack>
        
        <Field.Root invalid={!!errors.recipientAddress}>
          <Field.Label color="textSecondary">Address</Field.Label>
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
                onClick={pasteTag}
              >
                <ClipboardIcon color="#292D32" />
                Paste
              </Button>
            }
          >
            <Input {...register("recipientAddress", { required: "Recipient address is required" })} placeholder="Add recipient address" />
          </InputGroup>
          {errors.recipientAddress && <Field.ErrorText>{errors.recipientAddress.message}</Field.ErrorText>}
        </Field.Root>
        <Field.Root>
          <Field.Label color="textSecondary">Message (Optional)</Field.Label>
          <Textarea maxH="5lh" h={28} placeholder="Add a note" {...register("note")} />
        </Field.Root>
      </VStack>
      <HStack justify="start" w="full" my={2} bg="transparent">
        <Controller
          name="anonymous"
          control={control}
          render={({ field }) => (
            <Field.Root invalid={!!errors.anonymous}>
              <Switch.Root 
                colorPalette="gray" 
                size="lg"
                name={field.name}
                checked={field.value}
                onCheckedChange={({ checked }) => field.onChange(checked)}
              >
                <Switch.HiddenInput onBlur={field.onBlur} />
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
            </Field.Root>
          )}
        />
      </HStack>
      <Button w="full" variant="formBtn" type="submit" mt={margintop} py={btnPaddingY} fontSize={btnFontSize} disabled={!isConnected}>
        {btnText}
      </Button>
    </form>
  );
};

export default TipForm;
