import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv' 
import userRoutes from './routes/userRoute.js'
import authRouter from './routes/auth.js'
import cookieParser from 'cookie-parser'
dotenv.config()

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to mongoDB')
}).catch(err => {
    console.log(err)  
})

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use("/api/user", userRoutes)
app.use('/api/auth', authRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal server error'
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    })
})
 
app.listen(3000, () => {
    console.log('server listening on port 3000')
})