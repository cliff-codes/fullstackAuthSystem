
import React from 'react'
import {Typography, Box} from '@mui/material'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'

const Header = () => {
  const {currentUser} = useSelector((state) => state.user)
  return (
    <Box display={'flex'} justifyContent={'space-between'} p={'16px'} bgcolor={'lightBlue'} alignItems={'center'}>
        <Typography>Auth App</Typography>
        <Box display={'flex'} gap={'8px'} alignItems={'center'}>
            <Typography>
              <Link to={'/home'} style={{textDecoration: "none", color:"inherit"}}>
                Home
              </Link>
            </Typography>
            <Typography>
              <Link to={'/about'} style={{textDecoration: "none", color:"inherit"}}>
                About
              </Link>
            </Typography>
           {
            currentUser ? <Link to={'/profile'}><Box><img width={'40px'} height={'40px'} style={{borderRadius: "50%"}} src= {`${currentUser.profilePicture}`} /></Box></Link> : <Typography>
            <Link to={'/sign-in'} style={{textDecoration: "none", color:"inherit"}}>
              Sign-in
            </Link>
          </Typography>
           }
        </Box>
    </Box>
  )
}

export default Header