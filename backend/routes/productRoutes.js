import express from 'express'
const router = express.Router()
import {getProduct, getProductById, deleteProduct} from '../controllers/productController.js'
import {protect,admin} from '../middleware/authMeddleware.js'

router.route('/').get(getProduct)
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct)




export default router