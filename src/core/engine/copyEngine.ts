import { TestExecutor } from "../execution/testExecutor.js";
import { sizePosition } from "./positionSizer.js";

export async function copyTrade(trade: any) {
  await TestExecutor.execute({
    ...trade,
    sizeSol: sizePosition(trade.amountSol),
    slippage: 0.5
  });
}