import express from "express";
import usersRouter from "./users.mjs";
import menusRouter from './menus.mjs';
import authorsRouter from './author.mjs';
import booksRouter from './books.mjs'
const router = express.Router();

router.use('/users', usersRouter);

router.use('/menus', menusRouter);

router.use('/authors', authorsRouter)

router.use('/books', booksRouter )




export default router;