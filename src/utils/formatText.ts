export const truncateWalletAddress = (
  str: string,
  firstChars: number = 6,
  lastChars: number = 4
): string => {
  if (!str || str.length <= firstChars + lastChars) {
    return str;
  }

  const firstPart = str.slice(0, firstChars);
  const lastPart = str.slice(-lastChars);

  return `${firstPart}...${lastPart}`;
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    // Use modern Clipboard API if available
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers or non-secure contexts
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);
      return successful;
    }
  } catch (error) {
    console.error("Failed to copy text to clipboard:", error);
    return false;
  }
};

export const hideValue = (value: string) => {
  const cleanValue = value.replace(/[,.$]/g, "");
  const len = cleanValue.length;
  return "*".repeat(len);
};
