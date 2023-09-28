import { Box, Button, FormControl, InputBase, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} mt={'32px'}>
        <Typography pb={'8px'} variant='h4'>Signup</Typography>
        <form style={{
            display: "flex",
            flexDirection: "column",
            width: "300px",
            gap: "8px"
        }}>
            <InputBase sx={{bgcolor: 'lightgrey', borderRadius: "5px", p: "8px"}}placeholder='Username' id='username'/>

            <InputBase sx={{bgcolor: 'lightgrey', borderRadius: "5px", p: "8px"}}placeholder='Email' id='email'/>

            <InputBase sx={{bgcolor: 'lightgrey', borderRadius: "5px", p: "8px"}}placeholder='Password' id='password'/>   

            <Button sx={{
                bgcolor: 'darkslateblue',
                color: "white",
                "&:hover" : {
                    color: "darkslateblue"
                }
            }}>Sign up</Button>
        </form>
        <Typography mt={'32px'}>Have an account</Typography>
        <Link to={'/sign-in'} style={{textDecoration: "none"}}>
            <span>Sign in</span>
        </Link>
    </Box>
  )
}

export default Signup