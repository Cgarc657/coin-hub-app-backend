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
