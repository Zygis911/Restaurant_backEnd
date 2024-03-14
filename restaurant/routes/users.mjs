import express from "express";

// import { validate } from "../middleware/schemaValidator.mjs"; 

import userController from "../controller/userController.mjs";

// import {userValidationSchema, updateUserFieldsValidationSchema, validateUserId} from '../validators/userValidator.mjs'



const router = express.Router();

router.get("/", userController.getUsers);

// router.post("/register", validate(userValidationSchema), userController.createUser);

// router.post('/login', userController.login)

// router.post('/logout', userController.logout)

// router.get("/:id", validate(validateUserId, userValidationSchema), userController.getUserById);

// router.put("/:id", validate(validateUserId, userValidationSchema), userController.updateUser);

// router.delete("/:id", userController.deleteUser);


export default router;
