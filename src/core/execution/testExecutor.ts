import { addTrade } from "../pnl/ledger.js";

export const TestExecutor = {
  async execute(order: any) {
    addTrade({
      ...order,
      price: Math.random(),
      fees: 0.000005
    });

    console.log("🧪 Trade simulé", order);
  }
};