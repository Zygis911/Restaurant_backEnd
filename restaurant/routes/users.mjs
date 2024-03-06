import express from "express";

import { validate } from "../middleware/schemaValidator.mjs"; 

import userController from "../controller/userController.mjs";

import {userValidationSchema, updateUserFieldsValidationSchema, validateUserId} from '../validators/userValidator.mjs'



const router = express.Router();

// users
router.get("/", userController.getUsers);

router.post("/register", validate(userValidationSchema), userController.createUser);

router.get("/:id", validate(validateUserId, userValidationSchema), userController.getUserById);

router.put("/:id", validate(validateUserId, userValidationSchema), userController.updateUser);

router.delete("/", userController.deleteUser);

// menus



// router.post("/", userController.createMenuItem);

// router.get("/", userController.readMenuItemById);


// orders


export default router;
