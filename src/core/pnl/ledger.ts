export type Trade = {
  mint: string;
  side: "BUY" | "SELL";
  sizeSol: number;
  price: number;
  pnl: number;
  timestamp: number;
};

export const ledger = {
  trades: [] as Trade[],
  wallets: [] as string[],

  addTrade(trade: Trade) {
    this.trades.push(trade);
    if (!this.wallets.includes(trade.mint)) this.wallets.push(trade.mint);
  },

  getLastTrade(): Trade | null {
    return this.trades[this.trades.length - 1] || null;
  },

  getPNL(): number {
    return this.trades.reduce((acc, t) => acc + t.pnl, 0);
  },

  getWallets(): string[] {
    return this.wallets;
  }
};