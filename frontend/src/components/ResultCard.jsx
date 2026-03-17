import React from 'react';
import { Award, AlertTriangle, RefreshCw, BarChart } from 'lucide-react';

const ResultCard = ({ result, loading, onReset }) => {
  if (loading) {
    return (
      <div className="glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
        <div className="pulse-circle" style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(79, 70, 229, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
          <BarChart size={40} color="var(--primary)" className="bounce-animation" />
        </div>
        <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>Analyzing Profile...</h3>
        <p style={{ color: 'var(--text-muted)' }}>Running data through the ML Model</p>
        
        <style>{`
          @keyframes pulse {
            0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(79, 70, 229, 0.7); }
            70% { transform: scale(1); box-shadow: 0 0 0 20px rgba(79, 70, 229, 0); }
            100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(79, 70, 229, 0); }
          }
          .pulse-circle { animation: pulse 2s infinite; }
          
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .bounce-animation { animation: bounce 1s ease-in-out infinite; }
        `}</style>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px', opacity: 0.7 }}>
        <BarChart size={64} style={{ color: 'var(--surface-border)', marginBottom: '1.5rem' }} />
        <h3 style={{ fontSize: '1.25rem', color: 'var(--text-muted)' }}>No Data Yet</h3>
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', maxWidth: '250px', marginTop: '0.5rem' }}>
          Enter student metrics and click predict to see the outcome.
        </p>
      </div>
    );
  }

  const isPass = result.prediction === 'Pass';
  const scoreColor = isPass ? 'var(--secondary)' : 'var(--danger)';
  const scoreIcon = isPass ? <Award size={48} color={scoreColor} /> : <AlertTriangle size={48} color={scoreColor} />;
  const probabilityPercent = (result.probability * 100).toFixed(1);

  return (
    <div className="glass-panel animate-fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ textAlign: 'center', padding: '2rem 0', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        
        <div style={{ 
          width: '120px', 
          height: '120px', 
          borderRadius: '50%', 
          background: isPass ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem auto',
          border: `2px solid ${scoreColor}`,
          boxShadow: `0 0 30px ${isPass ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
        }}>
          {scoreIcon}
        </div>

        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: scoreColor, marginBottom: '0.5rem', letterSpacing: '1px' }}>
          {result.prediction.toUpperCase()}
        </h2>
        
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
          ML Model Confidence Score
        </p>

        <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontWeight: 600 }}>Pass Probability</span>
            <span style={{ fontWeight: 700, color: scoreColor }}>{probabilityPercent}%</span>
          </div>
          <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ 
              height: '100%', 
              width: `${probabilityPercent}%`, 
              backgroundColor: scoreColor,
              borderRadius: '4px',
              transition: 'width 1.5s cubic-bezier(0.22, 1, 0.36, 1)'
            }}></div>
          </div>
          
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '1rem', textAlign: 'left' }}>
            {isPass 
              ? "This student is on track. Keep encouraging their current study habits and monitor assignment completion." 
              : "Warning: Intervention recommended. Consider offering additional tutoring or adjusting study expectations."}
          </p>
        </div>
      </div>

      <button onClick={onReset} className="btn-primary" style={{ background: 'transparent', border: '1px solid var(--surface-border)', width: '100%' }}>
        <RefreshCw size={18} />
        New Prediction
      </button>
    </div>
  );
};

export default ResultCard;
