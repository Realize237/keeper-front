import { CookiesProvider } from 'react-cookie'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Subscriptions from './pages/Subscriptions'
import MainLayout from './layouts/MainLayout'

export default function App() {
  return (
    <CookiesProvider>
      <Router basename='/'>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Register />}  />
            <Route path="/login" element={<Login />} />
            <Route path="/subscriptions" element={<Subscriptions />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Router>
    </CookiesProvider>
  )
}
