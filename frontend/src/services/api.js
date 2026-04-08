import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL; // Example: http://localhost:5000

const getAuthConfig = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Analyze resume
export const analyzeResume = async (resumeFile, jobDescription) => {
  const formData = new FormData();
  formData.append('resume', resumeFile);
  formData.append('jobDescription', jobDescription);

  const config = {
    ...getAuthConfig(),
    headers: {
      ...getAuthConfig().headers,
      'Content-Type': 'multipart/form-data',
    },
  };

  const response = await axios.post(`${API_URL}/api/resume/analyze`, formData, config);
  return response.data;
};

// Get analysis history
export const getAnalysisHistory = async () => {
  const response = await axios.get(`${API_URL}/api/resume/history`, getAuthConfig());
  return response.data;
};

// Get analysis by ID
export const getAnalysisById = async (id) => {
  const response = await axios.get(`${API_URL}/api/resume/analysis/${id}`, getAuthConfig());
  return response.data;
};

// Delete analysis
export const deleteAnalysis = async (id) => {
  const response = await axios.delete(`${API_URL}/api/resume/analysis/${id}`, getAuthConfig());
  return response.data;
};