import React, { useState } from 'react';
import axios from 'axios';
import PredictionForm from './PredictionForm';
import ResultCard from './ResultCard';
import { Activity, Sparkles } from 'lucide-react';

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handlePredict = async (formData) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      // Connect to backend API
      const response = await axios.post('http://localhost:8000/api/predict', formData);
      // Faking a slightly longer loading state for nice UI effect
      setTimeout(() => {
        setResult(response.data);
        setLoading(false);
      }, 1200);
    } catch (err) {
      console.error(err);
      setError('Failed to connect to the prediction server. Please ensure the backend is running.');
      setLoading(false);
    }
  };

  const resetPrediction = () => {
    setResult(null);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '3rem', padding: '1rem 0 4rem 0' }}>
      
      {/* Hero Section */}
      <div style={{ textAlign: 'center', marginBottom: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'linear-gradient(to right, rgba(37, 99, 235, 0.1), rgba(16, 185, 129, 0.1))', padding: '0.5rem 1rem', borderRadius: '9999px', color: 'var(--primary)', fontWeight: 600, fontSize: '0.875rem', marginBottom: '1.5rem' }}>
           <Sparkles size={16} /> powered by Machine Learning
        </div>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', color: '#0F172A', lineHeight: 1.1, letterSpacing: '-0.04em' }}>
          AI Performance <br /> Predictor
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '650px', margin: '0 auto', lineHeight: 1.6 }}>
          Leverage our advanced predictive model to accurately forecast student academic outcomes based on continuous learning metrics.
        </p>
      </div>

      {/* Main Grid Layout (Bento Box) */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 420px)', 
        gap: '2rem', 
        alignItems: 'stretch',
        width: '100%',
        maxWidth: '1100px',
        margin: '0 auto'
      }}>
        
        {/* Form Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
          <PredictionForm onPredict={handlePredict} loading={loading} />
          
          {error && (
            <div className="premium-card animate-fade-in" style={{ padding: '1.5rem', background: '#FEF2F2', borderColor: '#FCA5A5', color: '#B91C1C', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ background: '#FEE2E2', padding: '0.5rem', borderRadius: '50%' }}>
                 <Activity size={24} color="#DC2626" />
              </div>
              <div>
                <h4 style={{ fontWeight: 700, marginBottom: '0.25rem' }}>Connection Error</h4>
                <p style={{ fontSize: '0.9rem' }}>{error}</p>
              </div>
            </div>
          )}
        </div>

        {/* Result Column */}
        <div className="animate-delay-1" style={{ height: '100%' }}>
          <ResultCard result={result} loading={loading} onReset={resetPrediction} />
        </div>
      </div>

      {/* Responsive adjustments */}
      <style>{`
        @media (max-width: 860px) {
          div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
          }
          div[style*="minmax(0, 420px)"] {
             max-width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
