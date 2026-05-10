const seededAt = new Date().toISOString();

let users = [];

let nextUserId = 1;

function clone(item) {
  return { ...item };
}

function nowIso() {
  return new Date().toISOString();
}

export function listUsers() {
  return users.map(clone);
}

export function getUserById(id) {
  const user = users.find((item) => item.id === id);
  return user ? clone(user) : null;
}

export function getUserByEmail(email) {
  const user = users.find(
    (item) => item.email.toLowerCase() === email.toLowerCase(),
  );

  return user ? clone(user) : null;
}

export function createUser(input) {
  const existingUser = getUserByEmail(input.email);

  if (existingUser) {
    return null;
  }

  const timestamp = nowIso();

  const user = {
    id: nextUserId,
    name: input.name.trim(),
    email: input.email.trim(),
    password: input.password.trim(),
    created_at: timestamp,
    updated_at: timestamp,
  };

  nextUserId += 1;
  users.push(user);

  return clone(user);
}
