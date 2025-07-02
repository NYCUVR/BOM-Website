import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Homepage from './pages/Homepage';
import AboutPage from './pages/AboutPage';
import CarPage from './pages/CarPage';
// We will import other pages here as we create them

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/car" element={<CarPage />} />
          {/* Other routes will be added here */}
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
