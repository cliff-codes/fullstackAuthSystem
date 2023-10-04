import { Box, Button, ButtonBase, CircularProgress, InputBase, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase'
import { useDispatch } from 'react-redux'
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signOut, updateUserFailure, updateUserStart, updateUserSuccess } from '../redux/user/userSlice'


const Profile = () => {
  const {currentUser} = useSelector(state => state.user)
  const fileRef = useRef(null)
  const [image, setImage ]= useState(undefined)
  const [uploadPercentage, setUploadPercentage] = useState(0)
  const [uploadError, setUploadError] = useState(false)
  const [formData, setFormData] = useState({})
  console.log(formData)
  const dispatch = useDispatch()
  

  useEffect(() => {
    if(image){
      handleProfilePicUpload(image)
      console.log(formData)
    }
  },[image])


  const handleProfilePicUpload = (image) => {
    console.log(image);
  
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
  
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadPercentage(Math.round(progress));
      },
      (error) => {
        setUploadError(true);
        console.error('Error uploading file:', error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormData({ ...formData, profilePicture: downloadUrl });
          console.log(formData);
        });
      }
    );
  };
  

  console.log(formData)

  const handleformData = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
    console.log(formData)
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const res = await fetch(`https://auth-backend-djmg.onrender.com/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json() 
      if(data.success === false){
        dispatch(updateUserFailure(data))
        return
      }
      dispatch(updateUserSuccess(data))
    } catch (error) {
      dispatch(updateUserFailure(error))
    }
  }  

  const handleDelete = async() => {
      try {
        console.log('working')
        dispatch(deleteUserStart())
        const res = await fetch(`https://auth-backend-djmg.onrender.com/api/user/delete/${currentUser._id}`, {
          method: 'DELETE'
        })
        const data = await res.json()
        if(data.success === false){
          dispatch(deleteUserFailure(data))
        }
        dispatch(deleteUserSuccess())
      } catch (error) {
        dispatch(deleteUserFailure(error))
      }
  }

  const handleSignout = async() => {
   try {
      await fetch('https://auth-backend-djmg.onrender.com/api/auth/signout')
      dispatch(signOut())
   } catch (error) {
      console.log(error)
   } 
  }

  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} mt={'32px'}>
      <Typography variant='h5'>Profile</Typography>
      <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: 'column', alignItems: "center", gap: "16px", marginTop: "32px"}}>
        <input type='file' ref={fileRef} hidden accept='image/*'
          onChange={(e) => {
            setImage(e.target.files[0]),
            handleformData(e)
          }}
        />
        <Box display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'}>
          <img onClick={() => fileRef.current.click()} width={'80px'} height={'80px'} style={{borderRadius: "50%", backgroundPosition: "center", backgroundSize: "cover"}} src={`${formData.profilePicture ||currentUser.profilePicture}`} />
          <div>
            {uploadError ? <span>
              <Typography color={'lightcoral'}>Error uploading image</Typography>
            </span>: uploadPercentage > 0 && uploadPercentage < 100 ? <Typography textAlign={'center'}> {`image uploading ${uploadPercentage}%`}</Typography>: uploadPercentage == 100 ?
            <Typography color={'lightgreen'}>image uploaded successfully</Typography> : null
          }
          </div>
        </Box>
        <Box display={'flex'} flexDirection={'column'}>
          <InputBase defaultValue={currentUser.username} id='username'  sx={{borderRadius: "4px",minWidth: "300px",bgcolor: "lightgrey", mb: "8px", p:"8px"}} onChange={handleformData} placeholder='username'/>
          <InputBase defaultValue={currentUser.email} id='email'  sx={{borderRadius: "4px",minWidth: "300px",bgcolor: "lightgrey", mb: "8px", p:"8px"}} onChange={handleformData} placeholder='email'/>
          <InputBase id='password'  sx={{borderRadius: "4px",minWidth: "300px",bgcolor: "lightgrey", mb: "8px", p:"8px"}} onChange={handleformData} placeholder='password'/>
        </Box>
        <Button onClick={handleSubmit} type='submit' sx={{bgcolor:'#040720',color: 'white', width: "100%", ":hover": {
          color: '#040720',
          // border: "1px solid #040720"
        }}}>update</Button>
        <Box width={'100%'} display={'flex'} justifyContent={'space-between'}>
          <ButtonBase onClick={handleDelete} sx={{color:'lightcoral', fontWeight: '600'}}>Delete Account</ButtonBase>
          <ButtonBase onClick={handleSignout} sx={{color:'lightcoral', fontWeight: '600'}}>Sign out</ButtonBase>
        </Box>
      </form>
    </Box>
  )
}

export default Profile