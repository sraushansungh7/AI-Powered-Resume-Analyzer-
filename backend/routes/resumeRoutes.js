const express = require('express');
const router = express.Router();
const {
  analyzeResume,
  getAnalysisHistory,
  getAnalysisById,
  deleteAnalysis
} = require('../controllers/resumeController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

// All routes are protected
router.use(protect);

// Analysis routes
router.post('/analyze', upload.single('resume'), analyzeResume);
router.get('/history', getAnalysisHistory);
router.get('/analysis/:id', getAnalysisById);
router.delete('/analysis/:id', deleteAnalysis);

module.exports = router;
