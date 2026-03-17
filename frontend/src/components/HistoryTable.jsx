import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, CheckCircle, AlertCircle } from 'lucide-react';

const HistoryTable = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/history');
        setHistory(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load history.');
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
      </div>
    );
  }

  if (error) {
    return <div className="alert-danger" style={{ maxWidth: '800px', margin: '2rem auto' }}>{error}</div>;
  }

  return (
    <div className="glass-panel animate-fade-in" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <Calendar size={28} color="var(--primary)" />
        Prediction History
      </h2>
      
      {history.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
          <p>No predictions made yet. Go to the prediction page to get started!</p>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--surface-border)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '1rem', fontWeight: 600 }}>Date</th>
                <th style={{ padding: '1rem', fontWeight: 600 }}>Attendance</th>
                <th style={{ padding: '1rem', fontWeight: 600 }}>Study Hrs</th>
                <th style={{ padding: '1rem', fontWeight: 600 }}>Internal</th>
                <th style={{ padding: '1rem', fontWeight: 600 }}>Grades</th>
                <th style={{ padding: '1rem', fontWeight: 600 }}>Assignments</th>
                <th style={{ padding: '1rem', fontWeight: 600 }}>Prediction</th>
              </tr>
            </thead>
            <tbody>
              {history.map((record) => (
                <tr key={record.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    {new Date(record.timestamp).toLocaleString()}
                  </td>
                  <td style={{ padding: '1rem' }}>{record.attendance}%</td>
                  <td style={{ padding: '1rem' }}>{record.study_hours}h</td>
                  <td style={{ padding: '1rem' }}>{record.internal_marks}</td>
                  <td style={{ padding: '1rem' }}>{record.previous_grades}</td>
                  <td style={{ padding: '1rem' }}>{record.assignment_completion}%</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '0.35rem',
                      padding: '0.35rem 0.75rem', 
                      borderRadius: '20px',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      background: record.prediction === 'Pass' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                      color: record.prediction === 'Pass' ? 'var(--secondary)' : 'var(--danger)'
                    }}>
                      {record.prediction === 'Pass' ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
                      {record.prediction}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HistoryTable;
