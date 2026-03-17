import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { GraduationCap, BarChart2, History } from 'lucide-react';
import Dashboard from './components/Dashboard';
import HistoryTable from './components/HistoryTable';
import './index.css';

const Navigation = () => {
  const location = useLocation();
  
  return (
    <nav className="nav-header">
      <div className="nav-brand">
        <GraduationCap size={32} color="#60A5FA" />
        <span>EduPredict</span>
      </div>
      <div className="nav-links">
        <Link 
          to="/" 
          className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
        >
          <BarChart2 size={20} />
          Prediction
        </Link>
        <Link 
          to="/history" 
          className={`nav-link ${location.pathname === '/history' ? 'active' : ''}`}
        >
          <History size={20} />
          History
        </Link>
      </div>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <Navigation />
      <div className="layout-container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/history" element={<HistoryTable />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
