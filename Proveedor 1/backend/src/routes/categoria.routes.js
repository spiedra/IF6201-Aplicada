import { Router } from 'express';
import {
    getCategories,
    insertCategory,
    updateCategory,
} from '../controllers/categoria.controller';

const router = Router()

router.get('/categories', getCategories)
router.post('/categories', insertCategory)
router.put('/categories', updateCategory)

export default router