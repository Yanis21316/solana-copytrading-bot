import { Connection, PublicKey } from "@solana/web3.js";

export function listenWallet(wallet: string) {
  const endpoint = process.env.QUICKNODE_WSS!;
  const connection = new Connection(endpoint, { commitment: "processed" });
  const pubkey = new PublicKey(wallet);

  connection.onLogs(pubkey, (logs) => {
    console.log("Transaction détectée:", logs.signature);
  });

  console.log("➕ Wallet surveillé :", wallet);
}