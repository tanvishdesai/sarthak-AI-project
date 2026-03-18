import React, { useState } from 'react';
import { Send, Clock, BookOpen, Target, CheckCircle, Percent } from 'lucide-react';

const PredictionForm = ({ onPredict, loading }) => {
  const [formData, setFormData] = useState({
    attendance: 85,
    study_hours: 15,
    internal_marks: 75,
    previous_grades: 80,
    assignment_completion: 90
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPredict(formData);
  };

  return (
    <div className="premium-card">
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
          Student Metrics
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Enter the latest academic data to generate a performance forecast.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Attendance (%)</label>
            <div className="input-with-icon">
              <Percent size={18} className="input-icon-left" />
              <input
                type="number"
                name="attendance"
                className="form-input has-icon"
                value={formData.attendance}
                onChange={handleChange}
                min="0"
                max="100"
                required
                placeholder="0-100"
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Study Hours/Week</label>
            <div className="input-with-icon">
              <Clock size={18} className="input-icon-left" />
              <input
                type="number"
                name="study_hours"
                className="form-input has-icon"
                value={formData.study_hours}
                onChange={handleChange}
                min="0"
                max="168"
                required
                placeholder="e.g. 15"
              />
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Internal Marks</label>
            <div className="input-with-icon">
              <Target size={18} className="input-icon-left" />
              <input
                type="number"
                name="internal_marks"
                className="form-input has-icon"
                value={formData.internal_marks}
                onChange={handleChange}
                min="0"
                max="100"
                required
                placeholder="Out of 100"
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Previous Grades</label>
            <div className="input-with-icon">
              <BookOpen size={18} className="input-icon-left" />
              <input
                type="number"
                name="previous_grades"
                className="form-input has-icon"
                value={formData.previous_grades}
                onChange={handleChange}
                min="0"
                max="100"
                required
                placeholder="Out of 100"
              />
            </div>
          </div>
        </div>

        <div className="form-group" style={{ marginBottom: '2rem' }}>
          <label className="form-label">Assignment Completion (%)</label>
          <div className="input-with-icon">
            <CheckCircle size={18} className="input-icon-left" />
            <input
              type="number"
              name="assignment_completion"
              className="form-input has-icon"
              value={formData.assignment_completion}
              onChange={handleChange}
              min="0"
              max="100"
              required
              placeholder="0-100"
            />
          </div>
        </div>

        <button 
          type="submit" 
          className="btn-primary" 
          style={{ width: '100%', padding: '1rem' }}
          disabled={loading}
        >
          {loading ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ 
                width: '18px', 
                height: '18px', 
                border: '2px solid rgba(255,255,255,0.3)', 
                borderTopColor: 'white', 
                borderRadius: '50%', 
                animation: 'spin 0.8s linear infinite' 
              }}></div>
              Analyzing Profile...
            </span>
          ) : (
            <>
              <Send size={18} />
              Generate Prediction
            </>
          )}
        </button>
      </form>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default PredictionForm;
