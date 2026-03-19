import {
  useSendTransaction as useWagmiSendTx,
  // useWaitForTransactionReceipt,
} from "wagmi";
import { parseEther, parseUnits, encodeFunctionData } from "viem";
import { useCreateTip } from "@/lib/mutations";

// minimal ERC-20 ABI for transfer
const ERC20_ABI = [
  {
    name: "transfer",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
] as const;

export const useSendTipTransaction = () => {
  const { mutateAsync: sendTransactionAsync, isPending: isSending } =
    useWagmiSendTx();
  const { mutateAsync: createTip, isPending: isSaving } = useCreateTip();

  const sendTip = async ({
    coin,
    amount,
    recipientAddress,
    note,
    anonymous,
    tokenContract,
  }: {
    coin: string;
    amount: string;
    recipientAddress: `0x${string}`;
    note: string;
    anonymous: boolean;
    tokenContract?: `0x${string}`;
  }) => {
    let txHash: `0x${string}`;

    if (coin === "ethereum") {
      txHash = await sendTransactionAsync({
        to: recipientAddress,
        value: parseEther(amount),
      });
    } else {
      txHash = await sendTransactionAsync({
        to: tokenContract!,
        data: encodeFunctionData({
          abi: ERC20_ABI,
          functionName: "transfer",
          args: [recipientAddress, parseUnits(amount, 6)],
        }),
      });
    }

    console.log("txHash:", txHash);

    // save to backend after tx is submitted
    await createTip({
      coin,
      amount,
      recipientAddress,
      note,
      anonymous,
      txHash,
    });

    return txHash;
  };

  return {
    sendTip,
    isLoading: isSending || isSaving,
  };
};
