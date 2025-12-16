import { bot } from "./telegram/bot.js";
import { listenWallet } from "./core/listener/wssListener.js";

process.on("uncaughtException", (err) => console.error("Erreur non capturée:", err));
process.on("unhandledRejection", (reason) => console.error("Promise rejetée:", reason));

console.log("🚀 SOLANA COPY TRADING BOT STARTED");

// Vérifie les variables
const vars = ["MASTER_WALLET", "TG_TOKEN", "CHAT_ID", "QUICKNODE_WSS"];
for (const v of vars) {
  if (!process.env[v]) {
    console.error(`⚠️ Variable ${v} manquante !`);
    process.exit(1);
  }
}

// Test Telegram
bot.sendMessage(process.env.CHAT_ID!, "✅ Bot connecté et prêt !");

// Démarrer l'écoute du wallet
listenWallet(process.env.MASTER_WALLET!);