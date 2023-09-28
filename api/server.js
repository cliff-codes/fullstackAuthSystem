import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv' 
import userRoutes from './routes/userRoute.js'
import authRouter from './routes/auth.js'
dotenv.config()

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to mongoDB')
}).catch(err => {
    console.log(err)  
})

const app = express()
app.use(express.json())
app.use("/api/user", userRoutes)
app.use('/api/auth', authRouter)
 
app.listen(3000, () => {
    console.log('server listening on port 3000')
})