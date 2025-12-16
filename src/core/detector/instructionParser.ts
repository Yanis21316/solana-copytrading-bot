import { ParsedTransactionWithMeta } from "@solana/web3.js";

export function parseSwap(tx: ParsedTransactionWithMeta) {
  for (const ix of tx.transaction.message.instructions) {
    if ("programId" in ix && ix.programId.toString().includes("JUP")) {
      return {
        type: "SWAP",
        side: "BUY",
        mint: "UNKNOWN",
        amountSol: 0.2
      };
    }
  }
  return null;
}