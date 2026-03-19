import { Steps } from "@chakra-ui/react"
import { type JSX } from "react";
export interface CustomStepsProps {
  steps: {
    title: string;
    description: string;
    icon: JSX.Element;
  }[],
  currentStep: number;
  onStepChange?: (step: number) => void;
  setCurrentStep?: React.Dispatch<React.SetStateAction<number>>;
}

const CustomSteps = ({ steps, currentStep }: CustomStepsProps) => {

  return (
     <Steps.Root step={currentStep} count={steps.length} orientation="vertical" height="400px" gap={{base: 0, md: 8}} w="fit">
      <Steps.List>
        {steps.map((step, index) => (
          <Steps.Item key={index} index={index} >
            <Steps.Indicator>
              <Steps.Status incomplete={step.icon} complete={step.icon} />
            </Steps.Indicator>
            <Steps.Title fontSize="sm" mt={2.5} display={{base: "none", md: "inline-flex"}}>{step.title}</Steps.Title>
            <Steps.Separator
              top="2.5rem"
              w="4px"
              maxHeight="calc(100% - var(--chakra-sizes-4) - var(--steps-gutter) * 2)"
            />
          </Steps.Item>
        ))}
      </Steps.List>

       
    </Steps.Root>
  )
}

export default CustomSteps
