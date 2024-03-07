import express from "express";

import session from "./middleware/session.mjs";

import usersRouter from "./routes/index.mjs";

import fs from "fs";

import path, { dirname } from "path";

import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const router = express.Router();

const app = express();

app.use(session);

const requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};

app.get("/next", (req, res) => {
  res.send("hello world");
});

app.use(express.json());

app.use("/api/v1/library", requestTime, usersRouter);

// server indentifikavimas

const PORT = 3000;

// aplikacijos paleidimas

app.listen(PORT, () => {
  console.log("server is listening on port 3000");
});
