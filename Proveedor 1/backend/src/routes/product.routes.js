import { Router } from 'express';
import { getProducts, insertProduct } from '../controllers/product.controller';

const router = Router()

router.get('/products', getProducts)
router.post('/products', insertProduct)
// router.put('/products', )
// router.delete('/products', )

export default router