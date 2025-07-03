import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MotionConfig, AnimatePresence } from 'framer-motion';
import MainLayout from './components/MainLayout';
import Homepage from './pages/Homepage';
import AboutPage from './pages/AboutPage';
import CarPage from './pages/CarPage';
import ProductsPage from './pages/ProductsPage';
import VehicleSpecPage from './pages/VehicleSpecPage';
import PartnersPage from './pages/PartnersPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import { Home } from 'lucide-react';
// We will import other pages here as we create them

function App() {
  return (
    <Router>
      <MotionConfig transition={{ duration: 0.5, ease: 'easeInOut' }}>
        <MainLayout>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Homepage />}/>
              <Route path="/about" element={<AboutPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/specs" element={<VehicleSpecPage />} />
              <Route path="/partners" element={<PartnersPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/car" element={<CarPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </AnimatePresence>
        </MainLayout>
      </MotionConfig>
    </Router>
  );
}

export default App;
