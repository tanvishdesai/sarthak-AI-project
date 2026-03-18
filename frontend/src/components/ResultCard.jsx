import React, { useEffect, useState } from 'react';
import { Award, AlertTriangle, RefreshCw, Sparkles, Activity } from 'lucide-react';

const CircularProgress = ({ probability, isPass }) => {
  const [progress, setProgress] = useState(0);
  const size = 200;
  const strokeWidth = 12;
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  
  useEffect(() => {
    // Small delay to ensure the component is mounted before animating
    const timer = setTimeout(() => {
      setProgress(probability * 100);
    }, 100);
    return () => clearTimeout(timer);
  }, [probability]);
  
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  const color = isPass ? 'var(--secondary)' : 'var(--danger)';
  const glowColor = isPass ? 'rgba(16, 185, 129, 0.4)' : 'rgba(239, 68, 68, 0.4)';

  return (
    <div style={{ position: 'relative', width: size, height: size, margin: '0 auto' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {/* Background track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="var(--surface-border)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress ring */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
          filter="url(#glow)"
        />
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
      </svg>
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.05em' }}>
          {progress.toFixed(0)}%
        </span>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Probability
        </span>
      </div>
    </div>
  );
};

const ResultCard = ({ result, loading, onReset }) => {
  if (loading) {
    return (
      <div className="premium-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '480px' }}>
        <div style={{ position: 'relative', width: '80px', height: '80px', marginBottom: '2rem' }}>
           <div className="pulse-ring"></div>
           <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--primary)', borderRadius: '50%', color: 'white', zIndex: 2 }}>
             <Activity size={32} className="spin-slow" />
           </div>
        </div>
        <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', marginBottom: '0.5rem', fontWeight: 700 }}>Processing Data</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Applying machine learning models...</p>
        
        <style>{`
          .pulse-ring {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: rgba(37, 99, 235, 0.2);
            animation: pulse-out 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
            z-index: 1;
          }
          @keyframes pulse-out {
            0% { transform: translate(-50%, -50%) scale(0.8); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
          }
          .spin-slow {
             animation: spin-slow 3s linear infinite;
          }
          @keyframes spin-slow {
             100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="premium-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '480px', background: 'var(--surface)' }}>
        <div style={{ background: '#F1F5F9', padding: '1.5rem', borderRadius: '50%', marginBottom: '1.5rem', color: '#94A3B8' }}>
          <Sparkles size={48} />
        </div>
        <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', fontWeight: 700, marginBottom: '0.5rem' }}>Ready for Prediction</h3>
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', maxWidth: '280px', fontSize: '0.95rem', lineHeight: 1.5 }}>
          Input the student's academic metrics on the left to generate an AI-powered success forecast.
        </p>
      </div>
    );
  }

  const isPass = result.prediction === 'Pass';
  const scoreColor = isPass ? 'var(--secondary)' : 'var(--danger)';
  const scoreIcon = isPass ? <Award size={24} color={scoreColor} /> : <AlertTriangle size={24} color={scoreColor} />;

  return (
    <div className="premium-card animate-fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
           <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', fontWeight: 700 }}>Prediction Result</h3>
           <div className={`badge ${isPass ? 'badge-success' : 'badge-danger'}`}>
             {scoreIcon}
             {result.prediction.toUpperCase()}
           </div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '2.5rem' }}>
          <CircularProgress probability={result.probability} isPass={isPass} />
          
          <div style={{ marginTop: '2.5rem', padding: '1.25rem', background: '#F8FAFC', borderRadius: 'var(--radius-md)', border: '1px solid var(--surface-border)', width: '100%' }}>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: 1.6, textAlign: 'center', fontWeight: 500 }}>
              {isPass 
                ? "This student is highly likely to pass. Keep encouraging their current study habits and monitor assignment completion." 
                : "Intervention recommended. Consider offering additional tutoring or adjusting study expectations to improve chances."}
            </p>
          </div>
        </div>
      </div>

      <button onClick={onReset} className="btn-secondary" style={{ width: '100%' }}>
        <RefreshCw size={16} />
        New Prediction
      </button>
    </div>
  );
};

export default ResultCard;
