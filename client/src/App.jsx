
import { Box } from '@mui/system'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Profile from './pages/Profile'
import Header from './components/Header'
const App = () => {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element = {<Home/>} />
        <Route path='/sign-up' element = {<Signup/>} />
        <Route path='/sign-in' element = {<Signin/>} />
        <Route path='/profile' element = {<Profile/>} />
      </Routes>
    </Router>
  )
}

export default App