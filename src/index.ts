import { addWallet } from "./core/listener/walletManager.js";
import "./telegram/bot.js";

console.log("🚀 SOLANA COPY TRADING BOT STARTED");

addWallet(process.env.MASTER_WALLET!);