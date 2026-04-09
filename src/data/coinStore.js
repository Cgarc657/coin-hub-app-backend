const seededAt = new Date().toISOString();

let coins = [
  {
    id: 1,
    name: "Bitcoin",
    symbol: "BTC",
    price: 68000,
    change24h: 2.4,
    created_at: seededAt,
    updated_at: seededAt,
  },
  {
    id: 2,
    name: "Ethereum",
    symbol: "ETH",
    price: 3500,
    change24h: -1.1,
    created_at: seededAt,
    updated_at: seededAt,
  },
  {
    id: 3,
    name: "Solana",
    symbol: "SOL",
    price: 120,
    change24h: 4.8,
    created_at: seededAt,
    updated_at: seededAt,
  },
];

let nextCoinId = 4;
