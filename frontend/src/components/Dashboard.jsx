import React, { useState } from 'react';
import axios from 'axios';
import PredictionForm from './PredictionForm';
import ResultCard from './ResultCard';
import { Activity } from 'lucide-react';

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handlePredict = async (formData) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await axios.post('http://localhost:8000/api/predict', formData);
      // Faking a slightly longer loading state for nice UI effect
      setTimeout(() => {
        setResult(response.data);
        setLoading(false);
      }, 800);
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
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
          <Activity size={36} color="#4F46E5" />
          AI Performance Predictor
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          Enter the student's academic metrics to predict their final outcome using our advanced Machine Learning algorithm.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-start' }}>
        {/* Form Section */}
        <div style={{ flex: '1 1 500px', maxWidth: '600px', width: '100%' }}>
          <PredictionForm onPredict={handlePredict} loading={loading} />
          {error && (
            <div className="alert-danger" style={{ marginTop: '1rem' }}>
              {error}
            </div>
          )}
        </div>

        {/* Result Section */}
        <div className="animate-delay-1" style={{ flex: '1 1 400px', maxWidth: '500px', width: '100%' }}>
          <ResultCard result={result} loading={loading} onReset={resetPrediction} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
