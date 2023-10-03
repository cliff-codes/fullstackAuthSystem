import express from 'express'
import { signIn, signUp, google, signout } from '../controllers/authController.js'

const router = express.Router()

router.post('/signup',signUp)
router.post('/signin',signIn)
router.post('/google',google)
router.get('/signout', signout)

export default router