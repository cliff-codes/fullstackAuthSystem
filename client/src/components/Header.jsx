
import React from 'react'
import {Typography, Box} from '@mui/material'

const Header = () => {
  return (
    <Box display={'flex'} justifyContent={'space-between'} p={'16px'} bgcolor={'lightBlue'}>
        <Typography>Auth App</Typography>
        <Box display={'flex'} gap={'8px'}>
            <Typography>Home</Typography>
            <Typography>Sign-up</Typography>
            <Typography>Sign-in</Typography>
        </Box>
    </Box>
  )
}

export default Header