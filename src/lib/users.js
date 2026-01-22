// src/lib/users.js

export const users = [
  {
    email: "admin@blog.com",
    password: "admin123",
    role: "admin",
  },
  {
    email: "author@blog.com",
    password: "author123",
    role: "author",
  },
  {
    email: "viewer@blog.com",
    password: "viewer123",
    role: "viewer",
  },
];

// simple lookup by email + password
export function findUser(email, password) {
  return users.find(
    (user) => user.email === email && user.password === password
  );
}
