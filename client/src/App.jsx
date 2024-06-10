import React, { createContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginSignupPage from './Pages/LoginPage/LoginSignupPage';
import { QuizzieContextValues } from './quizzie_context/UseQuzzieContext';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './utils/ProtectedRoute';
import AnalyticsPage from './Pages/Analytics/AnalyticsPage';
import PlayQuizPage from './Pages/PlayQuizPage/PlayQuizPage';
import DashboardPage from './Pages/Dashboard/DashboardPage';
import CreateQuizPage from './Pages/CreateQuizPage/CreateQuizPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginSignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/analytics" element={<AnalyticsPage/>} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/createquiz" element={<CreateQuizPage />} />
        <Route path="/sharedQuiz/:id" element={<PlayQuizPage />}/>  
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
