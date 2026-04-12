import { Hono } from "hono";
import coins from "./routes/coins.js";
import { isApiError } from "./utils/errors.js";
import { sendError } from "./utils/response.js";
import { cors } from "hono/cors";

const app = new Hono();
const api = new Hono();

app.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PATCH", "DELETE"],
  }),
);

app.use("*", async (c, next) => {
  c.set("traceId", crypto.randomUUID());
  await next();
});

api.route("/coins", coins);

app.route("/api", api);

app.notFound((c) => {
  return sendError(c, 404, "NOT_FOUND", "Route not found.");
});

app.onError((error, c) => {
  if (isApiError(error)) {
    return sendError(c, error.status, error.code, error.message, error.details);
  }

  return sendError(
    c,
    500,
    "INTERNAL_SERVER_ERROR",
    "An unexpected server error occurred.",
  );
});

export default app;
