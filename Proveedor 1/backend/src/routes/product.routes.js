import { Router } from 'express';
import {
    getProducts,
    searchProduct,
    insertProduct,
    updateProduct,
    deleteProduct

} from '../controllers/product.controller';

const router = Router()

router.get('/products', getProducts)
router.get('/products/:id', searchProduct)
router.post('/products', insertProduct)
router.put('/products', updateProduct)
router.delete('/products', deleteProduct)

export default router