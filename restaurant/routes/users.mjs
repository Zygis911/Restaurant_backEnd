import express from "express";

import { validate } from "../middleware/schemaValidator.mjs"; 

import userController from "../controller/userController.mjs";

import {userValidationSchema, updateUserFieldsValidationSchema, validateUserId, loginValidationSchema} from '../validators/userValidator.mjs'

import { validationResult } from "express-validator";

import passport from '../strategeis/auth.mjs'

import jwt from 'jsonwebtoken'

import { isUser } from "../middleware/roleCheck.mjs";


const router = express.Router();

router.get("/", userController.getUsers);

router.post("/register", userValidationSchema, (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
     next();
}, userController.createUser);

router.post('/login', validate(loginValidationSchema), passport.authenticate('local', {session: false}),  (req, res) => {
    const token = jwt.sign({ id: req.user.id, role:  req.user.role }, 'secret', {expiresIn: '1h'} )
    res.status(200).json({message: "Logged", token})
} ,   userController.login)

router.post('/logout', userController.logout)

router.get("/:id", validate(validateUserId, userValidationSchema), userController.getUserById);

router.put("/:id", validate(validateUserId, userValidationSchema), userController.updateUser);

router.delete("/:id", userController.deleteUser);

router.post('/:userId/reservations/:bookId', passport.authenticate('jwt', { session: false }) , isUser, userController.createReservation);


export default router;
