import express from "express";

import userController from "../controller/userController.mjs";

const router = express.Router();

// users
router.get("/", userController.getUsers);

router.post('/register', userController.createUser);

router.get('/:id', userController.getUserById);

router.put('/:id', userController.updateUser);

router.delete('/', userController.deleteUser );

// menus 

router.get('/', userController.getMenuItems);

router.post('/', userController.createMenuItem);

router.get('/', userController.readMenuItemById);
export default router;