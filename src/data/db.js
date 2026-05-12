import { drizzle } from "drizzle-orm/d1";

export function getDb(c) {
  return drizzle(c.env.coin_hub_db);
}
