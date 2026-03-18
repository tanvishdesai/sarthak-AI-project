import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { GraduationCap, BarChart2, History } from 'lucide-react';
import Dashboard from './components/Dashboard';
import HistoryTable from './components/HistoryTable';
import './index.css';

const Navigation = () => {
  const location = useLocation();
  
  return (
    <div className="nav-wrapper">
      <nav className="nav-header">
        <div className="nav-brand">
          <div className="nav-brand-icon-wrapper">
             <GraduationCap size={20} color="white" />
          </div>
          <span>EduPredict</span>
        </div>
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            <BarChart2 size={16} />
            Prediction
          </Link>
          <Link 
            to="/history" 
            className={`nav-link ${location.pathname === '/history' ? 'active' : ''}`}
          >
            <History size={16} />
            History
          </Link>
        </div>
      </nav>
    </div>
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
