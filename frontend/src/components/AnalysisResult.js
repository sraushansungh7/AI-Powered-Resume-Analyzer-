import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import '../styles/Components.css';

const AnalysisResult = ({ result, onNewAnalysis }) => {
  const scoreData = [
    { name: 'Match', value: result.overallScore },
    { name: 'Gap', value: 100 - result.overallScore }
  ];

  const COLORS = ['#4CAF50', '#E0E0E0'];

  const getScoreColor = (score) => {
    if (score >= 80) return '#4CAF50';
    if (score >= 60) return '#FF9800';
    return '#F44336';
  };

  return (
    <div className="analysis-result">
      <div className="result-header">
        <h2>Resume Analysis Results</h2>
        <button onClick={onNewAnalysis} className="btn btn-secondary">
          New Analysis
        </button>
      </div>

      <div className="score-section">
        <div className="score-card">
          <h3>Overall Match Score</h3>
          <div className="score-circle" style={{ borderColor: getScoreColor(result.overallScore) }}>
            <span className="score-value" style={{ color: getScoreColor(result.overallScore) }}>
              {result.overallScore}%
            </span>
          </div>
          <p className="score-label">
            {result.overallScore >= 80 ? 'Excellent Match!' : 
             result.overallScore >= 60 ? 'Good Match' : 
             'Needs Improvement'}
          </p>
        </div>

        <div className="score-card">
          <h3>Keyword Match</h3>
          <div className="score-circle" style={{ borderColor: getScoreColor(result.keywordMatch) }}>
            <span className="score-value" style={{ color: getScoreColor(result.keywordMatch) }}>
              {result.keywordMatch}%
            </span>
          </div>
          <p className="score-label">Job Keywords Found</p>
        </div>

        <div className="chart-container">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={scoreData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {scoreData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="analysis-sections">
        <div className="analysis-card strengths">
          <h3>
            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            Strengths
          </h3>
          <ul>
            {result.strengths?.map((strength, index) => (
              <li key={index}>{strength}</li>
            ))}
          </ul>
        </div>

        <div className="analysis-card weaknesses">
          <h3>
            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            Areas for Improvement
          </h3>
          <ul>
            {result.weaknesses?.map((weakness, index) => (
              <li key={index}>{weakness}</li>
            ))}
          </ul>
        </div>

        <div className="analysis-card missing-skills">
          <h3>
            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
            Missing Skills
          </h3>
          <ul>
            {result.missingSkills?.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>

        <div className="analysis-card suggested-skills">
          <h3>
            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            Suggested Skills to Add
          </h3>
          <div className="skill-tags">
            {result.suggestedSkills?.map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
          </div>
        </div>

        <div className="analysis-card recommendations full-width">
          <h3>
            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            Recommendations
          </h3>
          <ol className="recommendations-list">
            {result.recommendations?.map((recommendation, index) => (
              <li key={index}>{recommendation}</li>
            ))}
          </ol>
        </div>

        {result.detailedAnalysis && (
          <div className="analysis-card detailed-analysis full-width">
            <h3>Detailed Analysis</h3>
            <p>{result.detailedAnalysis}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisResult;
