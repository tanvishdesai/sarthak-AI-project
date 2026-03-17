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
    <div className="glass-panel">
      <h2 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '1rem' }}>
        Student Metrics
      </h2>
      <form onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label className="form-label">
            <Percent size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }}/>
            Attendance (%)
          </label>
          <input
            type="number"
            name="attendance"
            className="form-input"
            value={formData.attendance}
            onChange={handleChange}
            min="0"
            max="100"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            <Clock size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }}/>
            Weekly Study Hours
          </label>
          <input
            type="number"
            name="study_hours"
            className="form-input"
            value={formData.study_hours}
            onChange={handleChange}
            min="0"
            max="168"
            required
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">
              <Target size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }}/>
              Internal Marks (out of 100)
            </label>
            <input
              type="number"
              name="internal_marks"
              className="form-input"
              value={formData.internal_marks}
              onChange={handleChange}
              min="0"
              max="100"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <BookOpen size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }}/>
              Previous Grades (out of 100)
            </label>
            <input
              type="number"
              name="previous_grades"
              className="form-input"
              value={formData.previous_grades}
              onChange={handleChange}
              min="0"
              max="100"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">
            <CheckCircle size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }}/>
            Assignment Completion (%)
          </label>
          <input
            type="number"
            name="assignment_completion"
            className="form-input"
            value={formData.assignment_completion}
            onChange={handleChange}
            min="0"
            max="100"
            required
          />
        </div>

        <button 
          type="submit" 
          className="btn-primary" 
          style={{ width: '100%', marginTop: '1rem' }}
          disabled={loading}
        >
          {loading ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div className="spinner" style={{ width: '20px', height: '20px', border: '3px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
              Analyzing...
            </span>
          ) : (
            <>
              <Send size={18} />
              Predict Outcome
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
