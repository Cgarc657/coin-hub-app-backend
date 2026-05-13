import { and, eq } from "drizzle-orm";
import { favorites } from "./schema.js";
import { getDb } from "./db.js";
import { getCoinById } from "./coinStore.js";

export async function getFavoritesByUser(c, userId) {
  const db = getDb(c);

  const userFavorites = await db
    .select()
    .from(favorites)
    .where(eq(favorites.userId, userId));

  return userFavorites.map((favorite) => {
    const coin = getCoinById(favorite.coinId);

    return {
      ...favorite,
      ...coin,
    };
  });
}

export async function addFavorite(c, userId, coinId) {
  const db = getDb(c);

  await db.insert(favorites).values({
    userId,
    coinId,
  });
}

export async function removeFavorite(c, userId, coinId) {
  const db = getDb(c);

  await db
    .delete(favorites)
    .where(and(eq(favorites.userId, userId), eq(favorites.coinId, coinId)));
}
