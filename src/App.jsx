import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import MiniBannerPromo from './components/MiniBannerPromo'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Planes from './pages/Planes'
import PlanesMunicipio from './pages/PlanesMunicipio'
import Cobertura from './pages/Cobertura'
import Contacto from './pages/Contacto'
import Pqr from './pages/Pqr'
import Nosotros from './pages/Nosotros'
import Politicas from './pages/Politicas'
import Login from './pages/Login'
import Dashboard from './pages/admin/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  )
}

function AppContent() {
  const location = useLocation()
  const isLoginPage = location.pathname === '/login'
  const isAdminPage = location.pathname.startsWith('/admin')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {!isLoginPage && <MiniBannerPromo />}
      {!isLoginPage && <Navbar />}
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/planes" element={<Planes />} />
          <Route path="/planes/:municipioId" element={<PlanesMunicipio />} />
          <Route path="/cobertura" element={<Cobertura />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/pqr" element={<Pqr />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/politicas" element={<Politicas />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      {!isLoginPage && <Footer />}
    </div>
  )
}
