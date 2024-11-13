import express from 'express';

import { auth } from '../middleware/auth.md.js';
import { getAllBooks, deleteBook, createBook } from '../controllers/book.ct.js';

const router = express.Router();

router.get('/', auth, getAllBooks);
router.post('/', auth, createBook);

router.delete('/:id', auth, deleteBook);

export default router;
