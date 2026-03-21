// import { usePreference } from "@/hooks/usePreference";
import { useUpdatePreferences } from "@/lib/mutations";
import { Field, NumberInput, Select, Text, Textarea, VStack, InputGroup, Switch, Button } from "@chakra-ui/react"
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { BiCaretDown, BiCaretUp } from "react-icons/bi";
import {currencyOptions} from "@/constants/currencies";
import { useGetPreferences } from "@/lib/queries";

const Payment = () => {
  const {data: preference} = useGetPreferences()
  const { mutate: updatePreference, isPending } = useUpdatePreferences();

  const {register, handleSubmit, formState: {errors}, reset, control} = useForm<IPreference>({
    defaultValues: preference,
  })

  useEffect(() => {
    if (preference) {
      reset(preference);
    }
  }, [preference, reset]);

  const onSubmit = (data: IPreference) => {
    updatePreference(
      {
        defaultCurrency: data.defaultCurrency,
        minTipAmount: data.minTipAmount,
        defaultThankYouMessage: data.defaultThankYouMessage,
        autoAcceptTips: data.autoAcceptTips,
      },
    );
  }  

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{width: "100%"}}>
      <VStack
        bg="white"
        border="0.6px solid"
        borderColor="bgPrimary"
        p={4}
        gap={4}
        borderRadius="xl"
        w="full"
        align="start"
      >
        <Text color="textPrimary">Payment Preferences</Text>
        <VStack gap={6} align="start" w="full">
          <Controller
            name="defaultCurrency"
            control={control}
            render={({ field }) => (
              <Select.Root
                collection={currencyOptions}
                value={[field.value]}
                onValueChange={({ value }) => field.onChange(value[0])}
              >
                <Select.HiddenSelect />
                <Select.Label color="textSecondary" fontSize="xs">Default Currency</Select.Label>
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText placeholder="Select currency" />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator>
                      <BiCaretDown />
                    </Select.Indicator>
                  </Select.IndicatorGroup>
                </Select.Control>
                <Select.Positioner>
                  <Select.Content>
                    {currencyOptions.items.map((currency) => (
                      <Select.Item item={currency} key={currency.value}>
                        {currency.label}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Select.Root>
            )}
          />
          <Field.Root invalid={!!errors.minTipAmount}>
            <Field.Label color="textSecondary" fontSize="xs">
              Minimum Tip Amount
            </Field.Label>
            <Controller
              name="minTipAmount"
              control={control}
              render={({ field }) => (
                  <InputGroup startElement="$">
                    <NumberInput.Root
                      value={field.value}
                      onValueChange={(e) => field.onChange(e.value)}
                      allowMouseWheel
                      w="full"
                      variant="outlineIcon"
                    >
                      <NumberInput.Control>
                        <NumberInput.IncrementTrigger>
                          <BiCaretUp />
                        </NumberInput.IncrementTrigger>
                        <NumberInput.DecrementTrigger>
                          <BiCaretDown />
                        </NumberInput.DecrementTrigger>
                      </NumberInput.Control>
                      <NumberInput.Input />
                    </NumberInput.Root>
                  </InputGroup>
              )}
            />
            {errors.minTipAmount && <Field.ErrorText>{errors.minTipAmount?.message}</Field.ErrorText>}
          </Field.Root>
          <Field.Root invalid={!!errors.defaultThankYouMessage}>
            <Field.Label color="textSecondary" fontSize="xs">Default Thank You Message</Field.Label>
            <Textarea maxH="5lh" h={28} placeholder="Add a note" fontSize={"xs"} {...register("defaultThankYouMessage")} />
            <Field.HelperText color="textSecondary" fontSize="2xs">This message will be sent automatically when you recieve a tip</Field.HelperText>
            {errors.defaultThankYouMessage && <Field.ErrorText>{errors.defaultThankYouMessage?.message}</Field.ErrorText>}
          </Field.Root>
          <VStack gap={2} align="start" w="full">
            <Text fontSize="xs" color="textSecondary">
              Auto - Accept Tips
            </Text>
            <Controller
              name="autoAcceptTips"
              control={control}
              render={({ field }) => (
                <Switch.Root
                  colorPalette="gray"
                  size="lg"
                  w="full"
                  justifyContent="space-between"
                  checked={field.value}
                  onCheckedChange={({ checked }) => field.onChange(checked)}
                >
                  <Switch.HiddenInput />
                  <Switch.Label fontSize="xs" lineHeight="16px">
                    Automatically accept all incoming tips.
                  </Switch.Label>
                  <Switch.Control>
                    <Switch.Thumb />
                    <Switch.Indicator />
                  </Switch.Control>
                </Switch.Root>
              )}
            />
          </VStack>
        </VStack>
        <Button w="full" variant="solid" type="submit" size="sm" borderRadius="4xl" mt={4} loading={isPending} loadingText="Give it a few seconds"> Save Preferences</Button>
      </VStack>
    </form>
  )
}
export default Payment;