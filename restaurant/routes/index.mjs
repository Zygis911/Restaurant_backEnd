import express from "express";

import usersRouter from "./users.mjs";
import menusRouter from './menus.mjs'

const router = express.Router();

router.use('/users', usersRouter);

router.use('/menus', menusRouter);

export default router;