# Resume Analyzer - AI-Powered Resume Analysis Tool

A full-stack web application that uses Google's Gemini AI to analyze resumes against job descriptions, providing detailed feedback, skill gap analysis, and improvement suggestions.

## Features

### Authentication
- **User Registration & Login**: Secure JWT-based authentication
- **Protected Routes**: Dashboard accessible only to authenticated users
- **Session Management**: Persistent login sessions using localStorage

### Resume Analysis
- **File Upload**: Support for PDF, DOC, and DOCX formats (up to 5MB)
- **AI-Powered Analysis**: Uses Google Gemini AI for comprehensive resume evaluation
- **Job Matching**: Compare resume against specific job descriptions
- **Detailed Scoring**: 
  - Overall match score (0-100%)
  - Keyword match percentage
  - Skill gap identification

### Analysis Results
- **Strengths**: Highlights what's working well in your resume
- **Weaknesses**: Areas that need improvement
- **Missing Skills**: Required skills not found in resume
- **Suggested Skills**: Additional skills to consider adding
- **Recommendations**: Actionable steps to improve your resume
- **Visual Dashboard**: Charts and metrics for easy understanding

### History Management
- **Analysis History**: View all past resume analyses
- **Detailed View**: Access full results of previous analyses
- **Delete Option**: Remove old analyses

## 🏗️ Project Structure

```
resume-analyzer/
├── backend/                    # Express.js Backend
│   ├── config/
│   │   └── database.js        # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js  # Authentication logic
│   │   └── resumeController.js # Resume analysis logic
│   ├── models/
│   │   ├── User.js           # User schema
│   │   └── ResumeAnalysis.js # Analysis schema
│   ├── routes/
│   │   ├── authRoutes.js     # Auth endpoints
│   │   └── resumeRoutes.js   # Resume endpoints
│   ├── middleware/
│   │   ├── auth.js           # JWT verification
│   │   └── upload.js         # File upload handling
│   ├── services/
│   │   └── geminiService.js  # Gemini AI integration
│   ├── utils/
│   │   ├── jwt.js            # JWT utilities
│   │   └── pdfParser.js      # PDF text extraction
│   ├── .env.example          # Environment variables template
│   ├── package.json
│   └── server.js             # Entry point
│
└── frontend/                  # React Frontend
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── AnalysisHistory.js
    │   │   ├── AnalysisResult.js
    │   │   ├── PrivateRoute.js
    │   │   └── ResumeUpload.js
    │   ├── pages/
    │   │   ├── Dashboard.js
    │   │   ├── Login.js
    │   │   └── Register.js
    │   ├── context/
    │   │   └── AuthContext.js  # Authentication state
    │   ├── services/
    │   │   └── api.js          # API calls
    │   ├── styles/
    │   │   ├── App.css
    │   │   ├── Auth.css
    │   │   ├── Components.css
    │   │   └── Dashboard.css
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    └── package.json
```

## 🛠️ Technology Stack

### Backend
- **Node.js & Express.js**: RESTful API server
- **MongoDB & Mongoose**: Database and ODM
- **JWT**: Authentication tokens
- **Bcrypt.js**: Password hashing
- **Multer**: File upload handling
- **pdf-parse**: PDF text extraction
- **Google Generative AI**: Gemini AI integration

### Frontend
- **React 18**: UI framework
- **React Router v6**: Client-side routing
- **Axios**: HTTP client
- **React Toastify**: Notifications
- **Recharts**: Data visualization
- **React Dropzone**: Drag & drop file upload

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/resume-analyzer
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d
GEMINI_API_KEY=your_gemini_api_key_here
CLIENT_URL=http://localhost:3000
MAX_FILE_SIZE=5242880
```

5. Start MongoDB (if running locally):
```bash
mongod
```

6. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Resume Analysis
- `POST /api/resume/analyze` - Analyze resume (Protected)
- `GET /api/resume/history` - Get analysis history (Protected)
- `GET /api/resume/analysis/:id` - Get specific analysis (Protected)
- `DELETE /api/resume/analysis/:id` - Delete analysis (Protected)

## 📝 Usage

1. **Register**: Create a new account
2. **Login**: Sign in with your credentials
3. **Upload Resume**: Drag & drop or select your resume file
4. **Add Job Description**: Paste the job description
5. **Analyze**: Click "Analyze Resume" button
6. **View Results**: See detailed analysis with scores and recommendations
7. **History**: Access previous analyses anytime

## 🎯 Features in Detail

### AI Analysis Components

**Overall Score (0-100%)**
- Comprehensive evaluation of resume match
- Based on skills, experience, and keywords

**Keyword Match**
- Percentage of job description keywords found in resume
- Critical for ATS (Applicant Tracking Systems)

**Strengths**
- What's working well in your resume
- Competitive advantages

**Weaknesses**
- Areas needing improvement
- Common resume mistakes

**Missing Skills**
- Required skills from job description not in resume
- High-priority additions

**Suggested Skills**
- Related skills that would strengthen application
- Industry-standard competencies

**Recommendations**
- Specific, actionable improvement steps
- Tailored to job requirements

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Protected API routes
- File type validation
- File size limits
- CORS configuration
- Input sanitization



## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request


## 💡 Future Enhancements

- [ ] Resume templates and suggestions
- [ ] Multiple resume comparison
- [ ] LinkedIn profile analysis
- [ ] Cover letter generator
- [ ] Interview preparation tips
- [ ] Skill trend analysis
- [ ] Industry-specific recommendations
- [ ] Export results as PDF
- [ ] Email notifications
- [ ] Social authentication (Google, LinkedIn)

## 🐛 Known Issues

- Large PDF files (>5MB) not supported
- OCR for scanned PDFs not implemented
- Limited to English language resumes

## 📞 Support

For issues, questions, or suggestions, please open an issue on GitHub.

## 🙏 Acknowledgments

- Google Gemini AI for resume analysis
- React community for excellent documentation
- MongoDB for database solution
- All open-source contributors

---

**Built with ❤️ using React, Express, MongoDB, and Gemini AI**
