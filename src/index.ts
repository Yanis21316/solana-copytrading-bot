import { bot } from "./telegram/bot.js";
import { listenWallet } from "./core/listener/wssListener.js";

console.log("🚀 SOLANA COPY TRADING BOT STARTED");

const vars = ["MASTER_WALLET","TG_TOKEN","CHAT_ID","QUICKNODE_WSS"];
vars.forEach(v => {
  if (!process.env[v]) {
    console.error(`❌ Variable ${v} manquante !`);
    process.exit(1);
  }
});

// Test Telegram
bot.sendMessage(process.env.CHAT_ID!, "✅ Bot connecté et prêt !");

// Démarre l'écoute du wallet
listenWallet(process.env.MASTER_WALLET!);