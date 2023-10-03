
import { Button } from '@mui/material'
import React from 'react'
import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth"
import {app} from '../firebase'
import { useDispatch } from 'react-redux'
import { singInSuccess } from '../redux/user/userSlice'
import {useNavigate} from 'react-router-dom'

const OAuth = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleGoogleAuth = async() => {
        try {
            console.log('working')
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const result = await signInWithPopup(auth,provider)
            console.log(result)
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL
                })
            })
            const data = await res.json()
            console.log(data)
            dispatch(singInSuccess(data))
            navigate('/home')
        } catch (error) {
            console.log("couldn't login with google")
        }
    }

  return (
    <Button sx={{
        bgcolor: "darkred",
        color: "white",
        "&:hover": {
            color: "white",
            bgcolor: "black",
            border: "1px solid black"
        }
    }
    }
        onClick = {handleGoogleAuth}
    >Continue with Google</Button>
  )
}

export default OAuth