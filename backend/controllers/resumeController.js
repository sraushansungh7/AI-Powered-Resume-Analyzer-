const ResumeAnalysis = require('../models/ResumeAnalysis');
const geminiService = require('../services/geminiService');
const { extractTextFromDocument } = require('../utils/pdfParser');

// @desc    Analyze resume
// @route   POST /api/resume/analyze
// @access  Private
exports.analyzeResume = async (req, res) => {
  try {
    const { jobDescription } = req.body;
    const resumeFile = req.file;

    // Validate inputs
    if (!resumeFile) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a resume file'
      });
    }

    if (!jobDescription) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a job description'
      });
    }

    // Extract text from resume
    const resumeText = await extractTextFromDocument(resumeFile);

    if (!resumeText || resumeText.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Could not extract text from resume. Please ensure the file is readable.'
      });
    }

    // Analyze with Gemini AI
    const analysisResult = await geminiService.analyzeResume(resumeText, jobDescription);

    // Save analysis to database
    const analysis = await ResumeAnalysis.create({
      user: req.user._id,
      resumeFileName: resumeFile.originalname,
      resumeText,
      jobDescription,
      analysisResult
    });

    res.status(200).json({
      success: true,
      message: 'Resume analyzed successfully',
      data: {
        analysis: {
          id: analysis._id,
          overallScore: analysisResult.overallScore,
          keywordMatch: analysisResult.keywordMatch,
          strengths: analysisResult.strengths,
          weaknesses: analysisResult.weaknesses,
          missingSkills: analysisResult.missingSkills,
          suggestedSkills: analysisResult.suggestedSkills,
          recommendations: analysisResult.recommendations,
          detailedAnalysis: analysisResult.detailedAnalysis,
          createdAt: analysis.createdAt
        }
      }
    });
  } catch (error) {
    console.error('Analysis Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to analyze resume',
      error: error.message
    });
  }
};

// @desc    Get user's analysis history
// @route   GET /api/resume/history
// @access  Private
exports.getAnalysisHistory = async (req, res) => {
  try {
    const analyses = await ResumeAnalysis.find({ user: req.user._id })
      .select('-resumeText -jobDescription')
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json({
      success: true,
      count: analyses.length,
      data: {
        analyses
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get single analysis by ID
// @route   GET /api/resume/analysis/:id
// @access  Private
exports.getAnalysisById = async (req, res) => {
  try {
    const analysis = await ResumeAnalysis.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: 'Analysis not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        analysis
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Delete analysis
// @route   DELETE /api/resume/analysis/:id
// @access  Private
exports.deleteAnalysis = async (req, res) => {
  try {
    const analysis = await ResumeAnalysis.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: 'Analysis not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Analysis deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
