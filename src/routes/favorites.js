import { Hono } from "hono";
import {
  listFavoritesByUser,
  addFavorite,
  removeFavorite,
} from "../data/favoriteStore.js";
import { parseJsonBody } from "../utils/body.js";
import { ApiError } from "../utils/errors.js";
import { sendCollection, sendResource } from "../utils/response.js";
import { parseIdParam } from "../utils/validation.js";

const favorites = new Hono();

favorites.get("/", (c) => {
  const userId = Number(c.req.query("userId"));

  const data = listFavoritesByUser(userId);

  return sendCollection(c, data);
});

favorites.post("/", async (c) => {
  const payload = await parseJsonBody(c);

  const userId = Number(payload.userId);

  if (!payload.coinId) {
    throw new ApiError(400, "BAD_REQUEST", "coinId is required.");
  }

  const favorite = addFavorite(userId, Number(payload.coinId));

  if (!favorite) {
    throw new ApiError(409, "CONFLICT", "Coin already favorited.");
  }

  return sendResource(c, favorite, 201);
});

favorites.delete("/:coinId", (c) => {
  const userId = Number(c.req.query("userId"));
  const coinId = parseIdParam(c.req.param("coinId"));

  const removed = removeFavorite(userId, coinId);

  if (!removed) {
    throw new ApiError(404, "NOT_FOUND", "Favorite not found.");
  }

  return c.body(null, 204);
});

export default favorites;
