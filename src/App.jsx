import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Homepage from './pages/Homepage';
import AboutPage from './pages/AboutPage';
import CarPage from './pages/CarPage';
import ServicesPage from './pages/ServicesPage';
import PartnersPage from './pages/PartnersPage';
import NewsPage from './pages/NewsPage';
import ContactPage from './pages/ContactPage';
// We will import other pages here as we create them

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/car" element={<CarPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* Other routes will be added here */}
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
