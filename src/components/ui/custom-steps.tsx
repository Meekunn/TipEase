import { Steps } from "@chakra-ui/react"
import type { JSX } from "react";

export interface CustomStepsProps {
  steps: {
    title: string;
    description: string;
    icon: JSX.Element;
  }[],
  currentStep: number;
  onStepChange?: (step: number) => void;
}

const CustomSteps = ({ steps, currentStep }: CustomStepsProps) => {
  return (
     <Steps.Root step={currentStep} count={steps.length} orientation="vertical" height="400px">
      <Steps.List>
        {steps.map((step, index) => (
          <Steps.Item key={index} index={index}>
            <Steps.Indicator>
              <Steps.Status incomplete={step.icon} complete={step.icon} />
            </Steps.Indicator>
            <Steps.Title>{step.title}</Steps.Title>
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

