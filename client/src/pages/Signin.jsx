import { Box, Button, InputBase, Typography, CircularProgress } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const Signin = () => {
    const [formData, setFormData] = useState({})
    const [error, setError] = useState(false)
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()


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
            const res = await fetch('/api/auth/Signin', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(formData)})
            const data = await res.json() 
            setLoading(false)
            console.log(data)
            if(data.success === false){
                setError(true)
            }else{
                navigate('/')
            }
        } catch (error) {
            setLoading(false)
            setError(true)
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
            {
                error ? <Typography bgcolor={'lightcoral'} borderRadius={'2px'} textAlign={'center'} p={'8px 0'}>
                    Something is wrong
                </Typography> : null
            }
        </form>
        <Typography mt={'32px'}>Don't have an account</Typography>
        <Link to={'/sign-up'} style={{textDecoration: "none"}}>
            <span>Sign up</span>
        </Link>
    </Box>
  )
}

export default Signin