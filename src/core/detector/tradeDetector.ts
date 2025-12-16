import { Connection, SystemProgram } from "@solana/web3.js";
import { parseSwap } from "./instructionParser.js";
import { copyTrade } from "../engine/copyEngine.js";
import { addWallet } from "../listener/walletManager.js";
import { SUB_WALLET_DETECTION } from "../../config/constants.js";
import { notifyNewWallet } from "../../telegram/messages.js";

const conn = new Connection(process.env.QUICKNODE_WSS!);

export async function handleTransaction(signature: string) {
  const tx = await conn.getParsedTransaction(signature, {
    maxSupportedTransactionVersion: 0
  });

  if (!tx || !tx.meta) return;

  for (const ix of tx.transaction.message.instructions) {
    if (
      "programId" in ix &&
      ix.programId.equals(SystemProgram.programId) &&
      "parsed" in ix
    ) {
      const sol = ix.parsed.info.lamports / 1e9;

      if (
        SUB_WALLET_DETECTION.ENABLED &&
        sol >= SUB_WALLET_DETECTION.MIN_SOL &&
        sol <= SUB_WALLET_DETECTION.MAX_SOL
      ) {
        addWallet(ix.parsed.info.destination);
        notifyNewWallet(ix.parsed.info.destination, sol);
      }
    }
  }

  const trade = parseSwap(tx);
  if (trade) await copyTrade(trade);
}