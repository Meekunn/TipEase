import { Box } from "@chakra-ui/react";
import type { ReactNode } from "react";

export const SpinnerRing = ({
  size = 80,
  children,
}: {
  size?: number;
  children?: ReactNode;
}) => (
  <Box position="relative" w={size} h={size} display="inline-block">
    <Box
      as="span"
      position="absolute"
      top={0}
      left={0}
      w="100%"
      h="100%"
      animation="spin 1.2s linear infinite"
    >
      <svg width="100%" height="100%" viewBox="0 0 80 80">
        <circle
          cx="40"
          cy="40"
          r="36"
          stroke="#444"
          strokeWidth="6"
          fill="none"
          opacity="0.15"
        />
        <circle
          cx="40"
          cy="40"
          r="36"
          stroke="url(#spinner-gradient)"
          strokeWidth="6"
          fill="none"
          strokeDasharray="226"
          strokeDashoffset="60"
        />
        <defs>
          <linearGradient id="spinner-gradient">
            <stop offset="0%" stopColor="#222" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#222" stopOpacity="0.6" />
            <stop offset="90%" stopColor="#222" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>
    </Box>
    <Box
      position="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {children}
    </Box>
  </Box>
);
