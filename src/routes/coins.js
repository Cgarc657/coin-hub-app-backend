import { Hono } from "hono";
import {
  listCoins,
  getCoinById,
  createCoin,
  updateCoin,
  deleteCoin,
} from "../data/coinStore.js";

import { parseJsonBody } from "../utils/body.js";
import { ApiError } from "../utils/errors.js";
import { sendCollection, sendResource } from "../utils/response.js";
import { parseIdParam } from "../utils/validation.js";

const coins = new Hono();

coins.get("/", (c) => {
  const data = listCoins();
  return sendCollection(c, data);
});

coins.post("/", async (c) => {
  const payload = await parseJsonBody(c);
  const coin = createCoin(payload);

  c.header("Location", `/api/coins/${coin.id}`);
  return sendResource(c, coin, 201);
});

coins.get("/search/:name", (c) => {
  const searchName = c.req.param("name").toLowerCase();

  const results = listCoins().filter((coin) =>
    coin.name.toLowerCase().includes(searchName),
  );

  return sendCollection(c, results);
});

coins.get("/:id", (c) => {
  const id = parseIdParam(c.req.param("id"));
  const coin = getCoinById(id);

  if (!coin) {
    throw new ApiError(404, "NOT_FOUND", "Coin not found.");
  }

  return sendResource(c, coin);
});

coins.patch("/:id", async (c) => {
  const id = parseIdParam(c.req.param("id"));
  const payload = await parseJsonBody(c);

  const updatedCoin = updateCoin(id, payload);

  if (!updatedCoin) {
    throw new ApiError(404, "NOT_FOUND", "Coin not found.");
  }

  return sendResource(c, updatedCoin);
});

coins.delete("/:id", (c) => {
  const id = parseIdParam(c.req.param("id"));
  const deleted = deleteCoin(id);

  if (!deleted) {
    throw new ApiError(404, "NOT_FOUND", "Coin not found.");
  }

  return c.body(null, 204);
});

export default coins;
