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
  {
    id: 4,
    name: "Cardano",
    symbol: "ADA",
    price: 0.62,
    change24h: 1.8,
    created_at: seededAt,
    updated_at: seededAt,
  },
  {
    id: 5,
    name: "XRP",
    symbol: "XRP",
    price: 0.58,
    change24h: -0.9,
    created_at: seededAt,
    updated_at: seededAt,
  },
  {
    id: 6,
    name: "Dogecoin",
    symbol: "DOGE",
    price: 0.14,
    change24h: 3.2,
    created_at: seededAt,
    updated_at: seededAt,
  },
  {
    id: 7,
    name: "Litecoin",
    symbol: "LTC",
    price: 84.5,
    change24h: -1.5,
    created_at: seededAt,
    updated_at: seededAt,
  },
  {
    id: 8,
    name: "Binance Coin",
    symbol: "BNB",
    price: 590,
    change24h: 0.7,
    created_at: seededAt,
    updated_at: seededAt,
  },
  {
    id: 9,
    name: "Avalanche",
    symbol: "AVAX",
    price: 36.2,
    change24h: 2.1,
    created_at: seededAt,
    updated_at: seededAt,
  },
  {
    id: 10,
    name: "Chainlink",
    symbol: "LINK",
    price: 16.4,
    change24h: 2.7,
    created_at: seededAt,
    updated_at: seededAt,
  },
  {
    id: 11,
    name: "Polkadot",
    symbol: "DOT",
    price: 7.8,
    change24h: -1.9,
    created_at: seededAt,
    updated_at: seededAt,
  },
  {
    id: 12,
    name: "Shiba Inu",
    symbol: "SHIB",
    price: 0.000024,
    change24h: 5.1,
    created_at: seededAt,
    updated_at: seededAt,
  },
  {
    id: 13,
    name: "Toncoin",
    symbol: "TON",
    price: 6.3,
    change24h: 3.4,
    created_at: seededAt,
    updated_at: seededAt,
  },
  {
    id: 14,
    name: "TRON",
    symbol: "TRX",
    price: 0.12,
    change24h: -0.6,
    created_at: seededAt,
    updated_at: seededAt,
  },
  {
    id: 15,
    name: "Near Protocol",
    symbol: "NEAR",
    price: 5.9,
    change24h: 4.2,
    created_at: seededAt,
    updated_at: seededAt,
  },
];

let nextCoinId = 16;

function clone(item) {
  return { ...item };
}

function nowIso() {
  return new Date().toISOString();
}

export function listCoins() {
  return coins.map(clone);
}

export function getCoinById(id) {
  const coin = coins.find((item) => item.id === id);
  return coin ? clone(coin) : null;
}

export function createCoin(input) {
  const timestamp = nowIso();

  const coin = {
    id: nextCoinId,
    name: input.name.trim(),
    symbol: input.symbol.trim(),
    price: Number(input.price),
    change24h: Number(input.change24h),
    created_at: timestamp,
    updated_at: timestamp,
  };

  nextCoinId += 1;
  coins.push(coin);

  return clone(coin);
}

export function updateCoin(id, input) {
  const index = coins.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  const current = coins[index];

  const updated = {
    ...current,
    ...("name" in input ? { name: input.name.trim() } : {}),
    ...("symbol" in input ? { symbol: input.symbol.trim() } : {}),
    ...("price" in input ? { price: Number(input.price) } : {}),
    ...("change24h" in input ? { change24h: Number(input.change24h) } : {}),
    updated_at: nowIso(),
  };

  coins[index] = updated;
  return clone(updated);
}

export function deleteCoin(id) {
  const startSize = coins.length;
  coins = coins.filter((item) => item.id !== id);

  return coins.length !== startSize;
}
