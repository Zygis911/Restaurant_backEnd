import express from "express";
const router = express.Router();

import userController from "../controller/userController.mjs";

import menuController from "../controller/menuController.mjs";

router.get("/", menuController.getMenuItems);

router.get("/:id", menuController.readMenuItemById);

router.post("/register", menuController.createMenuItem);

router.delete("/:id", menuController.deleteMenuItem);

router.put("/:id", menuController.updateMenuItem);

export default router;
