import React from 'react'
import {Routes,Route}from 'react-router-dom'
import HomePage from './pages/HomePage'
import Register from './pages/Register'
// import HomePage from './pages/homePage'
const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/register" element={<Register/>}/>

    </Routes>
    </>
  )
}

export default App