import { Box, Button, InputBase, Typography, CircularProgress } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth'
import { singInSuccess } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'



const Signup = () => {
    const [formData, setFormData] = useState({})
    const [error, setError] = useState(false)
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.id]: e.target.value
        })
    }
    console.log(formData) 

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            setLoading(true)
            setError(false)
            const res = await fetch('https://auth-backend-djmg.onrender.com/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(formData)})
            const data = await res.json() 
            setLoading(false)
            dispatch(singInSuccess(data))
            navigate('/')
            console.log(data)
            if(data.statusCode === 500){
                setError(true)
            }else{
            }
        } catch (error) {
            setLoading(false)
            setError(true)
            console.log(error)
        }
    }

  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} mt={'32px'}>
        <Typography pb={'8px'} variant='h4'>Signup</Typography>
        <form style={{
            display: "flex",
            flexDirection: "column",
            width: "300px",
            gap: "8px"
        }} onSubmit={handleSubmit}>
            <InputBase sx={{bgcolor: 'lightgrey', borderRadius: "5px", p: "8px"}}placeholder='Username' id='username' 
            onChange={handleChange}
            />

            <InputBase sx={{bgcolor: 'lightgrey', borderRadius: "5px", p: "8px"}}placeholder='Email' id='email'
            onChange={handleChange}
            />

            <InputBase sx={{bgcolor: 'lightgrey', borderRadius: "5px", p: "8px"}}placeholder='Password' id='password'
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
                  loading ? <CircularProgress size={'16px'}/> : <Typography>sign-up</Typography>
                }
            </Button>
            <OAuth/>
            {
                error ? <Typography bgcolor={'lightcoral'} borderRadius={'2px'} textAlign={'center'} p={'8px 0'}>
                    Something is wrong
                </Typography> : null
            }
        </form>
        <Typography mt={'32px'}>Have an account</Typography>
        <Link to={'/sign-in'} style={{textDecoration: "none"}}>
            <span>Sign in</span>
        </Link>
    </Box>
  )
}

export default Signup