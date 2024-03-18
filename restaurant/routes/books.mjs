import express from 'express';

import booksController from '../controller/booksController.mjs';


const router = express.Router();

router.get('/', booksController.getBooks)

export default router;