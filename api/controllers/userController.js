import User from "../models/userModel.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'
export const test = (req,res) => {
    res.json({
        message: 'api is working'
    })
}

export const updateUser = async(req,res,next) => {
        if(req.params.id !== req.user.id){
            return next(errorHandler(401, "You can only update your account!"))
        }

    try {
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password,10)
        }
        

        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                profilePicture: req.body.profilePicture
            }
        },{new: true})
        const {password, ...rest} = updatedUser._doc
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async(req,res,next) => {
    console.log("working")
    if(req.params.id !== req.user.id){
        return next(errorHandler(401, "You can only delete your account!"))
    }
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("user successfully deleted")
    } catch (error) {
        next(error)
    }

}
 