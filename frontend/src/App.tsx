import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '@/pages/Home'
import Chat from '@/pages/Chat'
import Auth from '@/pages/Auth'

function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<Home />} />

      {/* Chat Route (now unprotected) */}
      <Route path="/chat" element={<Chat />} />

      {/* Auth Page */}
      <Route path="/sign-in/*" element={<Auth />} />

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App

