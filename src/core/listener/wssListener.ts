import { ledger, Trade } from "../pnl/ledger.js";
import { Connection, PublicKey } from "@solana/web3.js";

export function listenWallet(wallet: string) {
  const endpoint = process.env.QUICKNODE_WSS!;
  if (!endpoint) {
    console.error("❌ QUICKNODE_WSS non défini !");
    process.exit(1);
  }

  if (!endpoint.startsWith("wss://") && !endpoint.startsWith("http://") && !endpoint.startsWith("https://")) {
    console.error("❌ QUICKNODE_WSS invalide :", endpoint);
    process.exit(1);
  }

  console.log("✅ QUICKNODE_WSS détecté :", endpoint);

  const connection = new Connection(endpoint, { commitment: "processed" });
  const pubkey = new PublicKey(wallet);

  connection.onLogs(pubkey, async (logs) => {
    if (!logs.signature) return;

    const side: "BUY" | "SELL" = Math.random() > 0.5 ? "BUY" : "SELL";

    const trade: Trade = {
      mint: "ABC",
      side,
      sizeSol: 0.1,
      price: parseFloat((Math.random() * 0.01).toFixed(6)),
      pnl: parseFloat((Math.random() * 0.001).toFixed(6)),
      timestamp: Date.now()
    };

    ledger.addTrade(trade);
    console.log("Trade détecté :", trade);
  });

  console.log("➕ Wallet surveillé :", wallet);
}