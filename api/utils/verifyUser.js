import jwt from 'jsonwebtoken'
import { errorHandler } from './error.js'

export const verifyToken = (req,res, next) => {
    const token = req.cookies.access_token
    console.log(token)
    if(!token) return next(errorHandler(401,"Access denied"))

    jwt.verify(token, process.env.JWT_SECRET,(err,user) => {
        console.log('verifying')
        if(err) return next(403, "Token is not valid")
        req.user = user;
        next()
    })
}