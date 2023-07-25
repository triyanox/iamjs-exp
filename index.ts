import express from "express";
import roleManager, { admin, user } from "./roles";
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get(
  "/users",
  roleManager.check({
    actions: ["read", "ban"],
    resources: "users",
    role: "user",
    strict: true,
  }),
  (req, res) => {
    res.send("Users");
  }
);

app.get(
  "/pages",
  roleManager.check({
    actions: "list",
    resources: "allpages",
    construct: true,
    data: async () => admin.toObject(),
    strict: true,
  }),
  (req, res) => {
    res.send("Pages");
  }
);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
