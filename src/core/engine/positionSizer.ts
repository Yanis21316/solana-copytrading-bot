import { LIMITS } from "../../config/limits.js";

export function sizePosition(sol: number) {
  return Math.min(sol, LIMITS.MAX_SOL_PER_TRADE);
}