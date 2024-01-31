import React from 'react'
import {Routes,Route}from 'react-router-dom'
import HomePage from './pages/HomePage'
import Register from './pages/Register'
import Login from './pages/Login'
// import HomePage from './pages/homePage'
const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>


    </Routes>
    </>
  )
}

export default App