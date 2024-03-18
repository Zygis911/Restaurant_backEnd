import express from "express";

import booksController from "../controller/booksController.mjs";

const router = express.Router();

router.get("/", booksController.getBooks);

router.post("/", booksController.createBook);

router.get('/search', booksController.searchBookByTitle)

export default router;
