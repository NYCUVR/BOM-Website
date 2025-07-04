import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { MotionConfig, AnimatePresence } from 'framer-motion';
import MainLayout from './components/MainLayout';
import Homepage from './pages/Homepage';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import VehicleSpecPage from './pages/VehicleSpecPage';
import PartnersPage from './pages/PartnersPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
// We will import other pages here as we create them

function AppRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Homepage />}/>
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/specs" element={<VehicleSpecPage />} />
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="/contact" element={<ContactPage />} />
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
  );
}

function App() {
  return (
    <Router basename="/">
      <MotionConfig transition={{ duration: 0.5, ease: 'easeInOut' }}>
        <ScrollToTop />
        <MainLayout>
          <AppRoutes />
        </MainLayout>
      </MotionConfig>
    </Router>
  );
}

export default App;
