import TelegramBot from "node-telegram-bot-api";
import { ledger } from "../core/pnl/ledger.js";

export const bot = new TelegramBot(process.env.TG_TOKEN!, { polling: true });

// /start
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "👋 Salut ! Bot actif !");
});

// /status
bot.onText(/\/status/, (msg) => {
  bot.sendMessage(msg.chat.id, "✅ Bot actif, mode TEST");
});

// /pnl
bot.onText(/\/pnl/, (msg) => {
  const pnl = ledger.getPNL();
  bot.sendMessage(msg.chat.id, `📊 PNL actuel : ${pnl.toFixed(6)} SOL`);
});

// /wallets
bot.onText(/\/wallets/, (msg) => {
  const wallets = ledger.getWallets();
  bot.sendMessage(msg.chat.id, `🪙 Wallets suivis : ${wallets.join(", ") || "Aucun"}`);
});

// /lasttrade
bot.onText(/\/lasttrade/, (msg) => {
  const trade = ledger.getLastTrade();
  if (!trade) return bot.sendMessage(msg.chat.id, "Aucun trade détecté.");
  bot.sendMessage(
    msg.chat.id,
    `📝 Dernier trade : ${trade.side} ${trade.sizeSol} SOL ${trade.mint} à $${trade.price}`
  );
});

// /stop
bot.onText(/\/stop/, (msg) => {
  bot.sendMessage(msg.chat.id, "🛑 Bot stoppé temporairement");
  process.exit(0); // Kill switch
});

// /help
bot.onText(/\/help/, (msg) => {
  bot.sendMessage(msg.chat.id, `
🛠️ Commandes disponibles :
/start - Démarrer le bot
/status - Vérifier l'état
/pnl - Voir PNL actuel
/wallets - Liste des wallets suivis
/lasttrade - Voir dernier trade
/stop - Stopper le bot
/help - Liste des commandes
  `);
});