import React from 'react';
import { deleteAnalysis } from '../services/api';
import { toast } from 'react-toastify';
import '../styles/Components.css';

const AnalysisHistory = ({ history, onRefresh, onViewResult }) => {
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this analysis?')) {
      try {
        await deleteAnalysis(id);
        toast.success('Analysis deleted successfully');
        onRefresh();
      } catch (error) {
        toast.error('Failed to delete analysis');
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getScoreClass = (score) => {
    if (score >= 80) return 'score-high';
    if (score >= 60) return 'score-medium';
    return 'score-low';
  };

  return (
    <div className="history-container">
      <div className="history-header">
        <h2>Analysis History</h2>
        <button onClick={onRefresh} className="btn btn-secondary">
          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <polyline points="23 4 23 10 17 10"></polyline>
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
          </svg>
          Refresh
        </button>
      </div>

      {history.length === 0 ? (
        <div className="empty-state">
          <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </svg>
          <h3>No Analysis History</h3>
          <p>Start analyzing resumes to see your history here</p>
        </div>
      ) : (
        <div className="history-grid">
          {history.map((item) => (
            <div key={item._id} className="history-card">
              <div className="card-header">
                <h3>{item.resumeFileName}</h3>
                <span className={`score-badge ${getScoreClass(item.analysisResult.overallScore)}`}>
                  {item.analysisResult.overallScore}%
                </span>
              </div>
              
              <div className="card-stats">
                <div className="stat">
                  <span className="stat-label">Keyword Match</span>
                  <span className="stat-value">{item.analysisResult.keywordMatch}%</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Missing Skills</span>
                  <span className="stat-value">{item.analysisResult.missingSkills?.length || 0}</span>
                </div>
              </div>

              <div className="card-meta">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>{formatDate(item.createdAt)}</span>
              </div>

              <div className="card-actions">
                <button 
                  onClick={() => {
                    onViewResult(item);
                  }}
                  className="btn btn-primary btn-small"
                >
                  View Details
                </button>
                <button 
                  onClick={() => handleDelete(item._id)}
                  className="btn btn-danger btn-small"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnalysisHistory;
