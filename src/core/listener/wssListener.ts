const endpoint = process.env.QUICKNODE_WSS;

if (!endpoint) {
  console.error("❌ QUICKNODE_WSS non défini !");
  process.exit(1);
}

if (!endpoint.startsWith("wss://") && !endpoint.startsWith("http://") && !endpoint.startsWith("https://")) {
  console.error("❌ QUICKNODE_WSS invalide :", endpoint);
  process.exit(1);
}

const connection = new Connection(endpoint, { commitment: "processed" });

import { Connection, PublicKey } from "@solana/web3.js";

export function listenWallet(wallet: string) {
  const connection = new Connection(process.env.QUICKNODE_WSS!, { commitment: "processed" });
  const pubkey = new PublicKey(wallet);

  connection.onLogs(pubkey, (logs) => {
    if (!logs.signature) return;
    console.log("Transaction détectée:", logs.signature);
  });

  console.log("➕ Wallet surveillé :", wallet);
}