import express from 'express'
const router = express.Router()
import {getProduct, getProductById, deleteProduct, createProduct, updateProduct} from '../controllers/productController.js'
import {protect,admin} from '../middleware/authMeddleware.js'

router.route('/').get(getProduct).post(protect, admin, createProduct)
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct)




export default router