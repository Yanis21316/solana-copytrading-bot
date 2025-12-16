import { ledger } from "../pnl/ledger.js";
import { Connection, PublicKey, ParsedTransactionWithMeta } from "@solana/web3.js";

export function listenWallet(wallet: string) {
  const endpoint = process.env.QUICKNODE_WSS!;
  const connection = new Connection(endpoint, { commitment: "processed" });
  const pubkey = new PublicKey(wallet);

  connection.onLogs(pubkey, async (logs) => {
    if (!logs.signature) return;

    // Simule un trade détecté
    const trade = {
      mint: "ABC", // Simulé
      side: Math.random() > 0.5 ? "BUY" : "SELL",
      sizeSol: 0.1,
      price: Math.random() * 0.01,
      pnl: Math.random() * 0.001,
      timestamp: Date.now()
    };

    ledger.addTrade(trade);
    console.log("Trade détecté :", trade);
  });

  console.log("➕ Wallet surveillé :", wallet);
}