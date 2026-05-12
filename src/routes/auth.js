import { Hono } from "hono";
import { parseJsonBody } from "../utils/body.js";
import { ApiError } from "../utils/errors.js";
import { sendResource } from "../utils/response.js";

import { createUser, findUserByEmail } from "../data/users.repository.js";

const auth = new Hono();

auth.post("/register", async (c) => {
  const payload = await parseJsonBody(c);

  if (!payload.email || !payload.password) {
    throw new ApiError(400, "BAD_REQUEST", "Missing required fields.");
  }

  const existingUser = await findUserByEmail(c, payload.email);

  if (existingUser) {
    throw new ApiError(409, "CONFLICT", "Email already exists.");
  }

  await createUser(c, payload.email, payload.password);

  const user = await findUserByEmail(c, payload.email);

  return sendResource(c, user, 201);
});

auth.post("/login", async (c) => {
  const payload = await parseJsonBody(c);

  if (!payload.email || !payload.password) {
    throw new ApiError(400, "BAD_REQUEST", "Missing email or password.");
  }

  const user = await findUserByEmail(c, payload.email);

  if (!user || user.password !== payload.password) {
    throw new ApiError(401, "UNAUTHORIZED", "Invalid email or password.");
  }

  return sendResource(c, user);
});

export default auth;
