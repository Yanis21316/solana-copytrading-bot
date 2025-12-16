import { listenWallet } from "./wssListener.js";

const wallets = new Set<string>();

export function addWallet(wallet: string) {
  if (wallets.has(wallet)) return;

  wallets.add(wallet);
  listenWallet(wallet);

  console.log("➕ Wallet surveillé :", wallet);
}