import { ledger, Trade } from "../pnl/ledger.js";

export async function executeTestTrade(order: {
  mint: string;
  side: "BUY" | "SELL";
  sizeSol: number;
  price: number;
}) {
  const trade: Trade = {
    mint: order.mint,
    side: order.side,
    sizeSol: order.sizeSol,
    price: order.price,
    pnl: 0, // Simulation, à calculer plus tard
    timestamp: Date.now()
  };

  ledger.addTrade(trade);
  console.log("Trade simulé ajouté :", trade);
  return { txid: "SIMULATED" };
}