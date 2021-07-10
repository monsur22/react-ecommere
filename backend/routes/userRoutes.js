import express from 'express'
const router = express.Router()
import {authUser, getUserProfile , registerUser} from '../controllers/userController.js'
import {protect} from '../middleware/authMeddleware.js'

router.post('/login',authUser)
router.route('/profile').get(protect, getUserProfile)
router.post('/',registerUser)




export default router