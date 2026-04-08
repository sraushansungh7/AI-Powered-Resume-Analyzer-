import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import '../styles/Components.css';

const ResumeUpload = ({ onAnalyze, loading }) => {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setResumeFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1,
    maxSize: 5242880 // 5MB
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (resumeFile && jobDescription.trim()) {
      onAnalyze(resumeFile, jobDescription);
    }
  };

  const removeFile = () => {
    setResumeFile(null);
  };

  return (
    <div className="upload-container">
      <h2>Analyze Your Resume</h2>
      <p className="subtitle">Upload your resume and provide the job description to get AI-powered insights</p>

      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-section">
          <label>Upload Resume (PDF, DOC, DOCX)</label>
          <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
            <input {...getInputProps()} />
            {resumeFile ? (
              <div className="file-preview">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
                <div className="file-info">
                  <p className="file-name">{resumeFile.name}</p>
                  <p className="file-size">{(resumeFile.size / 1024).toFixed(2)} KB</p>
                </div>
                <button type="button" onClick={removeFile} className="remove-btn">
                  Remove
                </button>
              </div>
            ) : (
              <div className="dropzone-content">
                <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                <p>Drag & drop your resume here, or click to select</p>
                <span className="file-types">Supported: PDF, DOC, DOCX (Max 5MB)</span>
              </div>
            )}
          </div>
        </div>

        <div className="form-section">
          <label htmlFor="jobDescription">Job Description</label>
          <textarea
            id="jobDescription"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here..."
            rows="10"
            required
          />
          <span className="char-count">{jobDescription.length} characters</span>
        </div>

        <button 
          type="submit" 
          disabled={!resumeFile || !jobDescription.trim() || loading}
          className="btn btn-primary btn-large"
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              Analyzing...
            </>
          ) : (
            'Analyze Resume'
          )}
        </button>
      </form>
    </div>
  );
};

export default ResumeUpload;
