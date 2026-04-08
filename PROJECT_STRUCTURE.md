# Resume Analyzer - Complete Project Structure

## 📁 Project Overview

This is a production-ready, full-stack Resume Analyzer application with the following architecture:

### Backend (MVC Pattern)
```
backend/
├── config/
│   └── database.js              # MongoDB connection configuration
│
├── controllers/                  # Business Logic Layer
│   ├── authController.js        # Handles: register, login, getMe
│   └── resumeController.js      # Handles: analyze, history, getById, delete
│
├── models/                       # Data Layer (Mongoose Schemas)
│   ├── User.js                  # User schema with password hashing
│   └── ResumeAnalysis.js        # Analysis results schema
│
├── routes/                       # Route Definitions
│   ├── authRoutes.js            # Auth endpoints routing
│   └── resumeRoutes.js          # Resume endpoints routing
│
├── middleware/                   # Middleware Functions
│   ├── auth.js                  # JWT authentication middleware
│   └── upload.js                # Multer file upload configuration
│
├── services/                     # External Service Integration
│   └── geminiService.js         # Gemini AI API integration
│
├── utils/                        # Utility Functions
│   ├── jwt.js                   # JWT generation and verification
│   └── pdfParser.js             # PDF text extraction
│
├── .env.example                  # Environment variables template
├── package.json                  # Backend dependencies
└── server.js                     # Express app entry point
```

### Frontend (React Component Architecture)
```
frontend/
├── public/
│   └── index.html               # HTML template
│
├── src/
│   ├── components/              # Reusable Components
│   │   ├── AnalysisHistory.js  # Display past analyses
│   │   ├── AnalysisResult.js   # Show analysis results with charts
│   │   ├── PrivateRoute.js     # Protected route wrapper
│   │   └── ResumeUpload.js     # File upload with drag & drop
│   │
│   ├── pages/                   # Page Components
│   │   ├── Dashboard.js        # Main dashboard with tabs
│   │   ├── Login.js            # Login page
│   │   └── Register.js         # Registration page
│   │
│   ├── context/                 # Global State Management
│   │   └── AuthContext.js      # Authentication state & methods
│   │
│   ├── services/                # API Communication
│   │   └── api.js              # Axios API calls
│   │
│   ├── styles/                  # CSS Stylesheets
│   │   ├── App.css             # Global styles
│   │   ├── Auth.css            # Login/Register styles
│   │   ├── Components.css      # Component-specific styles
│   │   └── Dashboard.css       # Dashboard styles
│   │
│   ├── App.js                   # Main app component with routing
│   ├── index.js                 # React entry point
│   └── index.css                # Base CSS
│
└── package.json                 # Frontend dependencies
```

## 🔧 Key Technologies

### Backend Stack
| Technology | Purpose | Version |
|------------|---------|---------|
| Express.js | Web framework | ^4.18.2 |
| Mongoose | MongoDB ODM | ^8.0.3 |
| bcryptjs | Password hashing | ^2.4.3 |
| jsonwebtoken | JWT authentication | ^9.0.2 |
| multer | File upload | ^1.4.5 |
| pdf-parse | PDF text extraction | ^1.1.1 |
| @google/generative-ai | Gemini AI | ^0.1.3 |

### Frontend Stack
| Technology | Purpose | Version |
|------------|---------|---------|
| React | UI framework | ^18.2.0 |
| React Router | Routing | ^6.20.1 |
| Axios | HTTP client | ^1.6.2 |
| React Toastify | Notifications | ^9.1.3 |
| Recharts | Data visualization | ^2.10.3 |
| React Dropzone | File upload UI | ^14.2.3 |

## 🔄 Data Flow

### Authentication Flow
```
1. User submits credentials → Frontend
2. Frontend → POST /api/auth/login → Backend
3. Backend validates → Generates JWT → Returns token
4. Frontend stores token → localStorage
5. All subsequent requests include: Authorization: Bearer <token>
6. Backend middleware verifies token → Allows/Denies access
```

### Resume Analysis Flow
```
1. User uploads resume + job description → Frontend
2. Frontend → POST /api/resume/analyze (multipart/form-data) → Backend
3. Backend extracts text from resume (PDF/DOC)
4. Backend sends to Gemini AI API with prompt
5. Gemini analyzes and returns structured JSON
6. Backend saves to MongoDB
7. Backend returns analysis → Frontend
8. Frontend displays results with visualizations
```

## 📊 Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique, lowercase),
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### ResumeAnalysis Collection
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User),
  resumeFileName: String,
  resumeText: String,
  jobDescription: String,
  analysisResult: {
    overallScore: Number (0-100),
    keywordMatch: Number (0-100),
    strengths: [String],
    weaknesses: [String],
    missingSkills: [String],
    suggestedSkills: [String],
    recommendations: [String],
    detailedAnalysis: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

## 🛡️ Security Features

1. **Password Security**
   - Bcrypt hashing (10 rounds)
   - Never stored in plain text
   - Auto-hashed on user creation

2. **Authentication**
   - JWT tokens (7-day expiry)
   - Token stored in localStorage
   - Bearer token authentication
   - Protected routes on both frontend and backend

3. **File Upload Security**
   - File type validation (PDF, DOC, DOCX only)
   - File size limit (5MB)
   - Memory storage (not disk)
   - MIME type checking

4. **API Security**
   - CORS configuration
   - Input validation
   - Error handling
   - Rate limiting ready

## 🎨 UI/UX Features

1. **Responsive Design**
   - Mobile-friendly layouts
   - Tablet optimization
   - Desktop experience

2. **User Feedback**
   - Toast notifications
   - Loading states
   - Error messages
   - Success confirmations

3. **Visual Analytics**
   - Pie charts for scores
   - Color-coded results
   - Badge system
   - Progress indicators

4. **Accessibility**
   - Semantic HTML
   - ARIA labels ready
   - Keyboard navigation
   - Focus states

## 🚀 Performance Optimizations

1. **Backend**
   - MongoDB indexing on user email
   - Lean queries where applicable
   - Connection pooling
   - Error caching ready

2. **Frontend**
   - React.memo ready for optimization
   - Lazy loading ready
   - Code splitting ready
   - Image optimization ready

## 📝 API Endpoints Reference

### Authentication
- `POST /api/auth/register` - Create new user
- `POST /api/auth/login` - Authenticate user
- `GET /api/auth/me` - Get current user (Protected)

### Resume Analysis
- `POST /api/resume/analyze` - Analyze resume (Protected)
  - Body: multipart/form-data
  - Fields: resume (file), jobDescription (text)
  
- `GET /api/resume/history` - Get all analyses (Protected)
- `GET /api/resume/analysis/:id` - Get specific analysis (Protected)
- `DELETE /api/resume/analysis/:id` - Delete analysis (Protected)

## 🔐 Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/resume-analyzer
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
GEMINI_API_KEY=your_gemini_key
CLIENT_URL=http://localhost:3000
MAX_FILE_SIZE=5242880
```

## 📦 Installation Commands

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## 🧪 Testing Recommendations

1. **Unit Tests** (To be added)
   - Controller functions
   - Utility functions
   - Service methods

2. **Integration Tests** (To be added)
   - API endpoints
   - Database operations
   - File uploads

3. **E2E Tests** (To be added)
   - User registration flow
   - Login flow
   - Resume analysis flow

## 📈 Future Enhancements

1. **Features**
   - Email verification
   - Password reset
   - Resume templates
   - Cover letter analysis
   - Multiple resume comparison

2. **Technical**
   - Redis caching
   - Rate limiting
   - Request logging
   - Error monitoring (Sentry)
   - Analytics (Google Analytics)

## 🎯 Best Practices Implemented

1. ✅ MVC Architecture
2. ✅ RESTful API Design
3. ✅ JWT Authentication
4. ✅ Error Handling
5. ✅ Input Validation
6. ✅ Security Best Practices
7. ✅ Code Organization
8. ✅ Environment Configuration
9. ✅ Responsive Design
10. ✅ User Experience Focus

---

**This is a production-grade application following industry standards and best practices.**
