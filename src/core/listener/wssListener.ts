import { Connection, PublicKey } from "@solana/web3.js";
import { COMMITMENT } from "../../config/constants.js";
import { handleTransaction } from "../detector/tradeDetector.js";

const connection = new Connection(
  process.env.QUICKNODE_WSS!,
  { commitment: COMMITMENT }
);

export function listenWallet(wallet: string) {
  const pubkey = new PublicKey(wallet);

  connection.onLogs(pubkey, (logs) => {
    if (!logs.signature) return;
    handleTransaction(logs.signature);
  });
}