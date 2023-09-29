import { Box, Button, InputBase, Typography, CircularProgress } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInFailure, signInStart, singInSuccess } from '../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'


const Signin = () => {
    const [formData, setFormData] = useState({})
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {loading, error} = useSelector(state => state.user)

    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.id]: e.target.value
        })
    }
    console.log(formData) 
 
    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            dispatch(signInStart())
            const res = await fetch('/api/auth/Signin', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(formData)})
            const data = await res.json() 
            console.log(data)
            if(data.success === false){
                dispatch(signInFailure(data.message))
                return
            }
            dispatch(singInSuccess(data))
            navigate('/')
            
        } catch (error) {
            dispatch(signInFailure(error))
            console.log(error)
        }
    }

  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} mt={'32px'}>
        <Typography pb={'8px'} variant='h4'>Sign-In</Typography>
        <form style={{
            display: "flex",
            flexDirection: "column",
            width: "300px",
            gap: "8px"
        }} onSubmit={handleSubmit}>

            <InputBase sx={{bgcolor: 'lightgrey', borderRadius: "5px", p: "8px"}}placeholder='Email' id='email'
            onChange={handleChange}
            />

            <InputBase type='password' sx={{bgcolor: 'lightgrey', borderRadius: "5px", p: "8px"}}placeholder='Password' id='password'
            onChange={handleChange}
            />   

            <Button 
                disabled = {loading}
                type='submit' sx={{
                bgcolor: 'darkslateblue',
                color: "white",
                "&:hover" : {
                    color: "darkslateblue"
                }
            }}>
                {
                  loading ? <CircularProgress/> : <Typography>sign-in</Typography>
                }
            </Button>
        </form>

        <div style={{borderRadius: "2px",marginTop: "8px", padding: "8px 8px", backgroundColor: 'lightcoral'}}>{
            error ?  <Typography>
            {error}
            </Typography> || <Typography>
                'Something went wrong'
            </Typography> : null
        }</div>

        <Typography mt={'32px'}>Don't have an account</Typography>
        <Link to={'/sign-up'} style={{textDecoration: "none"}}>
            <span>Sign up</span>
        </Link>
    </Box>
  )
}

export default Signin