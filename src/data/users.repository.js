import { eq } from "drizzle-orm";
import { users } from "./schema.js";
import { getDb } from "./db.js";

export async function createUser(c, email, password) {
  const db = getDb(c);

  await db.insert(users).values({
    email,
    password,
  });
}

export async function findUserByEmail(c, email) {
  const db = getDb(c);

  const result = await db.select().from(users).where(eq(users.email, email));

  return result[0];
}
