import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const getAuthConfig = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

export const analyzeResume = async (resumeFile, jobDescription) => {
  const formData = new FormData();
  formData.append('resume', resumeFile);
  formData.append('jobDescription', jobDescription);

  const config = {
    ...getAuthConfig(),
    headers: {
      ...getAuthConfig().headers,
      'Content-Type': 'multipart/form-data'
    }
  };

  const response = await axios.post(`${API_URL}/resume/analyze`, formData, config);
  return response.data;
};

export const getAnalysisHistory = async () => {
  const response = await axios.get(`${API_URL}/resume/history`, getAuthConfig());
  return response.data;
};

export const getAnalysisById = async (id) => {
  const response = await axios.get(`${API_URL}/resume/analysis/${id}`, getAuthConfig());
  return response.data;
};

export const deleteAnalysis = async (id) => {
  const response = await axios.delete(`${API_URL}/resume/analysis/${id}`, getAuthConfig());
  return response.data;
};
