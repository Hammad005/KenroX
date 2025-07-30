import React from 'react'
import {Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import LoadingSpinner from './components/LoadingSpinner'

const App = () => {
  // if (true) return <LoadingSpinner/>
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App