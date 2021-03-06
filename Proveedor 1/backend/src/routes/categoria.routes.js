import { Router } from 'express';
import {
    getCategories,
    insertCategory,
    deleteCategory,
    updateCategory,
} from '../controllers/categoria.controller';

const router = Router()

router.get('/categories', getCategories)
router.post('/categories', insertCategory)
router.delete('/categories', deleteCategory)
router.put('/categories', updateCategory)

export default router