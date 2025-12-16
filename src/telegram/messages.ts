import { bot } from "./bot.js";
import { ENV } from "../config/env.js";

export function notifyNewWallet(wallet: string, sol: number) {
  bot.sendMessage(
    ENV.CHAT_ID,
    `🆕 NOUVEAU SOUS-WALLET\n\n👛 ${wallet}\n💸 ${sol} SOL`
  );
}