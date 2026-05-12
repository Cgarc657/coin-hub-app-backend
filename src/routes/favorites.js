import { Hono } from "hono";
import {
  getFavoritesByUser,
  addFavorite,
  removeFavorite,
} from "../data/favorites.repository.js";
import { parseJsonBody } from "../utils/body.js";
import { ApiError } from "../utils/errors.js";
import { sendCollection, sendResource } from "../utils/response.js";
import { parseIdParam } from "../utils/validation.js";

const favorites = new Hono();

favorites.get("/", async (c) => {
  const userId = Number(c.req.query("userId"));

  const data = await getFavoritesByUser(c, userId);

  return sendCollection(c, data);
});

favorites.post("/", async (c) => {
  const payload = await parseJsonBody(c);

  const userId = Number(payload.userId);

  if (!payload.coinId) {
    throw new ApiError(400, "BAD_REQUEST", "coinId is required.");
  }

  await addFavorite(c, userId, Number(payload.coinId));

  return sendResource(
    c,
    {
      userId,
      coinId: Number(payload.coinId),
    },
    201,
  );
});

favorites.delete("/:coinId", async (c) => {
  const userId = Number(c.req.query("userId"));
  const coinId = parseIdParam(c.req.param("coinId"));

  await removeFavorite(c, userId, coinId);

  return c.body(null, 204);
});

export default favorites;
