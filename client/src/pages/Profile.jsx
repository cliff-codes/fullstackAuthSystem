import { Box, Button, ButtonBase, InputBase, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
  const {currentUser} = useSelector(state => state.user)
  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} mt={'32px'}>
      <Typography variant='h5'>Profile</Typography>
      <form style={{display: "flex", flexDirection: 'column', alignItems: "center", gap: "16px", marginTop: "32px"}}>
        <Box>
          <img width={'80px'} height={'80px'} style={{borderRadius: "50%"}} src={`${currentUser.profilePicture}`} />
        </Box>
        <Box display={'flex'} flexDirection={'column'}>
          <InputBase defaultValue={currentUser.username} id='username'  sx={{borderRadius: "4px",minWidth: "300px",bgcolor: "lightgrey", mb: "8px", p:"8px"}} placeholder='username'/>
          <InputBase defaultValue={currentUser.email} id='email'  sx={{borderRadius: "4px",minWidth: "300px",bgcolor: "lightgrey", mb: "8px", p:"8px"}} placeholder='email'/>
          <InputBase id='password'  sx={{borderRadius: "4px",minWidth: "300px",bgcolor: "lightgrey", mb: "8px", p:"8px"}} placeholder='password'/>
        </Box>
        <Button sx={{bgcolor:'#040720',color: 'white', width: "100%", ":hover": {
          color: '#040720',
          // border: "1px solid #040720"
        }}}>update</Button>
        <Box width={'100%'} display={'flex'} justifyContent={'space-between'}>
          <ButtonBase sx={{color:'lightcoral', fontWeight: '600'}}>Delete Account</ButtonBase>
          <ButtonBase sx={{color:'lightcoral', fontWeight: '600'}}>Sign out</ButtonBase>
        </Box>
      </form>
    </Box>
  )
}

export default Profile