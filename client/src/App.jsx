
import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Profile from './pages/Profile'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import About from './pages/About'
const App = () => {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element = {<Home/>} />
        <Route path='/sign-up' element = {<Signup/>} />
        <Route path='/sign-in' element = {<Signin/>} />
        <Route path='/about' element = {<About/>} />
        <Route element = {<PrivateRoute/>}>
          <Route path='/profile' element = {<Profile/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App