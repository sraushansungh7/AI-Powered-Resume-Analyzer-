import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { analyzeResume, getAnalysisHistory } from '../services/api';
import { toast } from 'react-toastify';
import ResumeUpload from '../components/ResumeUpload';
import AnalysisResult from '../components/AnalysisResult';
import AnalysisHistory from '../components/AnalysisHistory';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('analyze');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === 'history') {
      fetchHistory();
    }
  }, [activeTab]);

  const fetchHistory = async () => {
    try {
      const response = await getAnalysisHistory();
      setHistory(response.data.analyses);
    } catch (error) {
      toast.error('Failed to fetch history');
    }
  };

  const handleAnalyze = async (resumeFile, jobDescription) => {
    setLoading(true);
    try {
      const response = await analyzeResume(resumeFile, jobDescription);
      setAnalysisResult(response.data.analysis);
      toast.success('Resume analyzed successfully!');
      setActiveTab('result');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast.info('Logged out successfully');
  };

  const handleNewAnalysis = () => {
    setAnalysisResult(null);
    setActiveTab('analyze');
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="container">
          <h1>Resume Analyzer</h1>
          <div className="header-actions">
            <span className="user-name">Welcome, {user?.name}</span>
            <button onClick={handleLogout} className="btn btn-secondary">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="dashboard-content container">
        <nav className="dashboard-nav">
          <button
            className={`nav-btn ${activeTab === 'analyze' ? 'active' : ''}`}
            onClick={() => setActiveTab('analyze')}
          >
            Analyze Resume
          </button>
          <button
            className={`nav-btn ${activeTab === 'result' ? 'active' : ''}`}
            onClick={() => setActiveTab('result')}
            disabled={!analysisResult}
          >
            Results
          </button>
          <button
            className={`nav-btn ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            History
          </button>
        </nav>

        <div className="dashboard-main">
          {activeTab === 'analyze' && (
            <ResumeUpload onAnalyze={handleAnalyze} loading={loading} />
          )}
          {activeTab === 'result' && analysisResult && (
            <AnalysisResult 
              result={analysisResult} 
              onNewAnalysis={handleNewAnalysis}
            />
          )}
          {activeTab === 'history' && (
            <AnalysisHistory 
              history={history} 
              onRefresh={fetchHistory}
              onViewResult={setAnalysisResult}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
