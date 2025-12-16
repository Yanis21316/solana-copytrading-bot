import TelegramBot from "node-telegram-bot-api";
import { ENV } from "../config/env.js";

export const bot = new TelegramBot(ENV.TG_TOKEN, { polling: true });