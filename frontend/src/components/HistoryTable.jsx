import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';

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
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '6rem 0' }}>
        <div style={{ 
          width: '48px', 
          height: '48px', 
          border: '3px solid #E2E8F0', 
          borderTopColor: 'var(--primary)', 
          borderRadius: '50%', 
          animation: 'spin 1s linear infinite',
          marginBottom: '1rem'
        }}></div>
        <p style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Loading historical data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="premium-card animate-fade-in" style={{ maxWidth: '800px', margin: '4rem auto', background: '#FEF2F2', borderColor: '#FCA5A5', color: '#B91C1C', textAlign: 'center' }}>
        <AlertCircle size={48} style={{ margin: '0 auto 1rem auto', opacity: 0.8 }} />
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Unable to fetch data</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 0' }}>
      
      <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#F1F5F9', padding: '1rem', borderRadius: '50%', marginBottom: '1rem', color: 'var(--primary)' }}>
           <TrendingUp size={32} />
        </div>
        <h2 style={{ fontSize: '2.5rem', color: '#0F172A', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
          Prediction History
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Review past academic forecasts and analyze trends effectively.</p>
      </div>
      
      <div className="premium-card" style={{ padding: 0, overflow: 'hidden' }}>
        
        <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--surface-border)', background: '#F8FAFC', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Calendar size={20} color="var(--primary)" />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>Recent Activity</h3>
        </div>

        {history.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-muted)' }}>
            <div style={{ background: '#F1F5F9', display: 'inline-flex', padding: '1.5rem', borderRadius: '50%', marginBottom: '1.5rem' }}>
              <Calendar size={48} color="#94A3B8" />
            </div>
            <h4 style={{ fontSize: '1.25rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>No predictions found</h4>
            <p>Go to the prediction page to run your first model forecast.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
              <thead>
                <tr style={{ background: '#FFFFFF', color: '#64748B', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <th style={{ padding: '1.25rem 2rem', fontWeight: 700, borderBottom: '1px solid var(--surface-border)' }}>Date</th>
                  <th style={{ padding: '1.25rem 1rem', fontWeight: 700, borderBottom: '1px solid var(--surface-border)' }}>Attendance</th>
                  <th style={{ padding: '1.25rem 1rem', fontWeight: 700, borderBottom: '1px solid var(--surface-border)' }}>Study Hrs</th>
                  <th style={{ padding: '1.25rem 1rem', fontWeight: 700, borderBottom: '1px solid var(--surface-border)' }}>Internal</th>
                  <th style={{ padding: '1.25rem 1rem', fontWeight: 700, borderBottom: '1px solid var(--surface-border)' }}>Grades</th>
                  <th style={{ padding: '1.25rem 1rem', fontWeight: 700, borderBottom: '1px solid var(--surface-border)' }}>Assignments</th>
                  <th style={{ padding: '1.25rem 2rem', fontWeight: 700, borderBottom: '1px solid var(--surface-border)', textAlign: 'right' }}>Prediction</th>
                </tr>
              </thead>
              <tbody>
                {history.map((record, index) => (
                  <tr key={record.id} className="table-row" style={{ borderBottom: index === history.length - 1 ? 'none' : '1px solid var(--surface-border)' }}>
                    <td style={{ padding: '1.25rem 2rem', color: '#475569', fontSize: '0.95rem', fontWeight: 500 }}>
                      {new Date(record.timestamp).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                    </td>
                    <td style={{ padding: '1.25rem 1rem', fontWeight: 600, color: 'var(--text-main)' }}>{record.attendance}%</td>
                    <td style={{ padding: '1.25rem 1rem', fontWeight: 600, color: 'var(--text-main)' }}>{record.study_hours}h</td>
                    <td style={{ padding: '1.25rem 1rem', fontWeight: 600, color: 'var(--text-main)' }}>{record.internal_marks}</td>
                    <td style={{ padding: '1.25rem 1rem', fontWeight: 600, color: 'var(--text-main)' }}>{record.previous_grades}</td>
                    <td style={{ padding: '1.25rem 1rem', fontWeight: 600, color: 'var(--text-main)' }}>{record.assignment_completion}%</td>
                    <td style={{ padding: '1.25rem 2rem', textAlign: 'right' }}>
                      <span className={`badge ${record.prediction === 'Pass' ? 'badge-success' : 'badge-danger'}`}>
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

      <style>{`
        .table-row { transition: background-color 0.2s ease; }
        .table-row:hover { background-color: #F8FAFC; }
      `}</style>
    </div>
  );
};

export default HistoryTable;
