import { Box, Button, InputBase, Typography, CircularProgress } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInFailure, signInStart, singInSuccess } from '../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import OAuth from '../components/OAuth'


const Signin = () => {
    const [formData, setFormData] = useState({})
    const [formDataIsValid,setFormDataIsValid] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {loading, error} = useSelector(state => state.user)

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value})
    }
 
    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            dispatch(signInStart())
            const res = await fetch('https://auth-backend-djmg.onrender.com/api/auth/Signin', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(formData)})
            const data = await res.json() 
           
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

     //check if formData is not empty or not
     function isObjectNotEmpty(obj) {
        if (!obj || typeof obj !== 'object') {
          return false; // Not an object or object is null/undefined
        }
      
        return Object.values(obj).every(value => {
          // Check if the value is not null, undefined, an empty string, or an empty array
          return value !== null && value !== undefined &&
                 !(typeof value === 'string' && value.trim() === '') &&
                 !(Array.isArray(value) && value.length === 0);
        });
    }

    useEffect(() => {
        setFormDataIsValid(isObjectNotEmpty(formData))
    },[formData])

  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} mt={'32px'}>
        <Typography pb={'8px'} variant='h4'>Sign-In</Typography>
        <form style={{
            display: "flex",
            flexDirection: "column",
            width: "300px",
            gap: "8px"
        }} onSubmit={handleSubmit}>

            <InputBase type='email' sx={{bgcolor: 'lightgrey', borderRadius: "5px", p: "8px"}}placeholder='Email' id='email'
            onChange={handleChange}
            />

            <InputBase type='password' sx={{bgcolor: 'lightgrey', borderRadius: "5px", p: "8px"}}placeholder='Password' id='password'
            onChange={handleChange}
            />   

            <Button 
                disabled = {loading || !formDataIsValid}
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
            <OAuth/>
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