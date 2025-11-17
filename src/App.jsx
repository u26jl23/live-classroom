import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import { useTranslation } from "react-i18next";

import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import DashboardPage from './pages/DashboardPage'

export default function App() {
  const {t} = useTranslation()
  return (
    <Router style={{padding: '10px', background: '#eee', marginBottom: '20px'}}>
      <nav >
        <Link to='/login' style={{ marginRight: '10px' }}>{t('nav.login')}</Link>
        <Link to='/signup' style={{ marginRight: '10px' }}>{t('nav.signup')}</Link>
        <Link to='/dashboard'>{t('nav.dashboard')}</Link>
      </nav>

      {/* {Setups} */}
      <div style={{padding: '20px'}}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/" element={<h2>Welcome! Please click Login above.</h2>} />
        </Routes>
      </div>
    </Router>
  )
}


