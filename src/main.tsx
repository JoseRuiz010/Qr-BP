import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { LoginPage } from './pages/LoginPage.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  </BrowserRouter>
  </StrictMode>,
)
