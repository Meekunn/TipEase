import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  truncateWalletAddress,
  copyToClipboard,
  pasteFromClipboard,
  hideValue,
} from "./formatText";

// truncateWalletAddress
describe("truncateWalletAddress", () => {
  it("truncates a long address with default chars", () => {
    expect(truncateWalletAddress("0x4aF934569203874072030Ed9e")).toBe(
      "0x4aF9...Ed9e",
    );
  });

  it("truncates with custom firstChars and lastChars", () => {
    expect(truncateWalletAddress("0x4aF934569203874072030Ed9e", 4, 6)).toBe(
      "0x4a...30Ed9e",
    );
  });

  it("returns the original string if shorter than firstChars + lastChars", () => {
    expect(truncateWalletAddress("0x4aF9", 6, 4)).toBe("0x4aF9");
  });

  it("returns empty string if input is empty", () => {
    expect(truncateWalletAddress("")).toBe("");
  });
});

// hideValue
describe("hideValue", () => {
  it("replaces digits with asterisks", () => {
    expect(hideValue("1234")).toBe("****");
  });

  it("strips $ , . before counting", () => {
    expect(hideValue("$1,234.56")).toBe("******");
  });

  it("handles empty string", () => {
    expect(hideValue("")).toBe("");
  });
});

// copyToClipboard
describe("copyToClipboard", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("copies text using Clipboard API when available", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });
    Object.defineProperty(window, "isSecureContext", {
      value: true,
      configurable: true,
    });

    const result = await copyToClipboard("0x4aF934...");
    expect(writeText).toHaveBeenCalledWith("0x4aF934...");
    expect(result).toBe(true);
  });

  it("returns false when clipboard API throws", async () => {
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: vi.fn().mockRejectedValue(new Error("denied")) },
      configurable: true,
    });
    Object.defineProperty(window, "isSecureContext", {
      value: true,
      configurable: true,
    });

    const result = await copyToClipboard("0x4aF934...");
    expect(result).toBe(false);
  });
});

// pasteFromClipboard
describe("pasteFromClipboard", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("reads text using Clipboard API when available", async () => {
    const readText = vi.fn().mockResolvedValue("0xPastedAddress");
    Object.defineProperty(navigator, "clipboard", {
      value: { readText },
      configurable: true,
    });
    Object.defineProperty(window, "isSecureContext", {
      value: true,
      configurable: true,
    });

    const result = await pasteFromClipboard();
    expect(result).toBe("0xPastedAddress");
  });

  it("returns null when clipboard API throws", async () => {
    Object.defineProperty(navigator, "clipboard", {
      value: { readText: vi.fn().mockRejectedValue(new Error("denied")) },
      configurable: true,
    });
    Object.defineProperty(window, "isSecureContext", {
      value: true,
      configurable: true,
    });

    const result = await pasteFromClipboard();
    expect(result).toBeNull();
  });
});
