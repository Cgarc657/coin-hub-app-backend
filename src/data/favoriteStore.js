let favorites = [];

let nextFavoriteId = 1;

function clone(item) {
  return { ...item };
}

function nowIso() {
  return new Date().toISOString();
}

export function listFavoritesByUser(userId) {
  return favorites.filter((favorite) => favorite.userId === userId).map(clone);
}

export function addFavorite(userId, coinId) {
  const existing = favorites.find(
    (favorite) => favorite.userId === userId && favorite.coinId === coinId,
  );

  if (existing) {
    return null;
  }

  const timestamp = nowIso();

  const favorite = {
    id: nextFavoriteId,
    userId,
    coinId,
    created_at: timestamp,
    updated_at: timestamp,
  };

  nextFavoriteId += 1;
  favorites.push(favorite);

  return clone(favorite);
}

export function removeFavorite(userId, coinId) {
  const startSize = favorites.length;

  favorites = favorites.filter(
    (favorite) => !(favorite.userId === userId && favorite.coinId === coinId),
  );

  return favorites.length !== startSize;
}
