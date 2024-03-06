import express from 'express'
const router = express.Router();

import userController from '../controller/userController.mjs';

router.get("/", userController.getMenuItems);

export default router