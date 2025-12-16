import TelegramBot from "node-telegram-bot-api";

export const bot = new TelegramBot(process.env.TG_TOKEN!, { polling: true });

// Commande /start
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "👋 Salut ! Bot actif !");
});

// Commande /status
bot.onText(/\/status/, (msg) => {
  bot.sendMessage(msg.chat.id, "✅ Bot actif, mode TEST");
});