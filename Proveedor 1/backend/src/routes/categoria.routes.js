import { Router } from 'express';
import { getCategories, insertCategory } from '../controllers/categoria.controller';

const router = Router()

router.get('/categories', getCategories)
router.post('/categories', insertCategory)
// router.put('/products', )
// router.delete('/products', )

export default router