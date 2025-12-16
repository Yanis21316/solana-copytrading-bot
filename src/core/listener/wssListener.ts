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