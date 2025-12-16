type Trade = {
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

  getLastTrade() {
    return this.trades[this.trades.length - 1];
  },

  getPNL() {
    const totalPNL = this.trades.reduce((acc, t) => acc + t.pnl, 0);
    return totalPNL;
  },

  getWallets() {
    return this.wallets;
  }
};