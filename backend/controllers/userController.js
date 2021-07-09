import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const authUser = asyncHandler(async(req, res)=>{
    const {email , password} = req.body
    // res.send({email, password})
    const user = await User.findOne({email})

    if (user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: null
        })
    }else {
        res.status(400)
        throw new Error('Invalid user data')
      }

})


export {authUser}