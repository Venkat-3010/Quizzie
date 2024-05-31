import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage/HomePage';
import LoginSignupPage from './Pages/LoginSignupPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginSignupPage />} />
        <Route path="/home" element={<HomePage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
