import express from 'express'
const router = express.Router()
import {authUser, getUserProfile , registerUser, updateUserProfile, getUsers} from '../controllers/userController.js'
import {protect,admin} from '../middleware/authMeddleware.js'

router.post('/login',authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.route('/').post(registerUser).get(protect,admin, getUsers)



export default router