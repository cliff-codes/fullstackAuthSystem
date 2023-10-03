import { Box, Typography, Container } from '@mui/material'
import React from 'react'

const About = () => {
  return (
    <Container maxWidth={'md'} >
    <Typography fontWeight={'600'} m={"16px"} variant='h5' fontSize={'24px'}>About</Typography>
    <Typography m={"16px"}>
    Authentication is a crucial aspect of web development, ensuring that users can securely interact with your application. In this guide, we'll walk you through the process of creating a Full-stack MERN (MongoDB, Express.js, React, Node.js) Authentication Application.
    </Typography>
</Container>
  )
}

export default About