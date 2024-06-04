import React, { createContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage/HomePage';
import LoginSignupPage from './Pages/LoginSignupPage';
import { QuizzieContextValues } from './quizzie_context/UseQuzzieContext';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './utils/ProtectedRoute';
import PlayModal from './components/ModalComponents/PlayModal/PlayModal';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginSignupPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/sharedQuiz/:id" element={<PlayModal />}/>  
      </Routes>
    </BrowserRouter>
  )
}

const QuizzieContext = createContext();

const Main = () => {
  const quizzieContextValues = QuizzieContextValues()
  return (
    <QuizzieContext.Provider value={quizzieContextValues}>
      <App />
      <ToastContainer />
    </QuizzieContext.Provider>
  )
}

export { App, Main, QuizzieContext }
