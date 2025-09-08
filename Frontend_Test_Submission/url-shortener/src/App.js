import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StatsPage from './pages/StatsPage';
import RedirectHandler from './components/RedirectHandler';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/stats/:code" element={<StatsPage />} />
        <Route path="/r/:code" element={<RedirectHandler />} />
      </Routes>
    </Router>
  );
}

export default App;
