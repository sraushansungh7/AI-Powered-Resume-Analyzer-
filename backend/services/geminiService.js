const { GoogleGenerativeAI } = require('@google/generative-ai');

class GeminiService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' });
  }

  async analyzeResume(resumeText, jobDescription) {
    try {
      const prompt = `
You are an expert HR recruiter and resume analyzer. Analyze the following resume against the job description and provide a comprehensive analysis.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Provide a detailed analysis in the following JSON format:
{
  "overallScore": <number between 0-100>,
 "keywordMatch": <number between 0-100 WITHOUT % symbol>,
  "strengths": [<array of strengths found in the resume>],
  "weaknesses": [<array of weaknesses or gaps>],
  "missingSkills": [<array of required skills not found in resume>],
  "suggestedSkills": [<array of skills to add based on job description>],
  "recommendations": [<array of specific actionable recommendations>],
  "detailedAnalysis": "<comprehensive analysis paragraph>"
}

Be specific, constructive, and professional in your analysis.
`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Parse JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
  const parsed = JSON.parse(jsonMatch[0]);

  parsed.overallScore = Number(parsed.overallScore);
  parsed.keywordMatch = Number(
    String(parsed.keywordMatch).replace("%", "")
  );

  return parsed;
}


      throw new Error('Failed to parse analysis result');
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw new Error('Failed to analyze resume with AI');
    }
  }

  async generateImprovementSuggestions(resumeText, targetRole) {
    try {
      const prompt = `
As a career coach, suggest specific improvements for this resume targeting a ${targetRole} position:

RESUME:
${resumeText}

Provide 5-7 specific, actionable suggestions to improve this resume.
`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw new Error('Failed to generate suggestions');
    }
  }
}

module.exports = new GeminiService();