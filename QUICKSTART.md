# Quick Start Guide - Resume Analyzer

Get your Resume Analyzer up and running in 5 minutes!

## Prerequisites Checklist

Before you begin, make sure you have:
- ✅ Node.js installed (v14+) - [Download](https://nodejs.org/)
- ✅ MongoDB installed or Atlas account - [Download](https://www.mongodb.com/try/download/community) or [Atlas](https://www.mongodb.com/cloud/atlas)
- ✅ Gemini API Key - [Get Key](https://makersuite.google.com/app/apikey)

## Step 1: Clone or Download Project

```bash
# If using git
git clone <repository-url>
cd resume-analyzer

# Or extract the downloaded ZIP file
```

## Step 2: Backend Setup (Terminal 1)

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your settings
# Required: GEMINI_API_KEY, MONGODB_URI
```

### Edit `.env` File:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/resume-analyzer  # Or your MongoDB Atlas URI
JWT_SECRET=change_this_to_a_random_secret_key_12345
JWT_EXPIRE=7d
GEMINI_API_KEY=your_gemini_api_key_here  # REQUIRED!
CLIENT_URL=http://localhost:3000
MAX_FILE_SIZE=5242880
```

### Start MongoDB (if running locally):

```bash
# Mac/Linux
mongod

# Windows
"C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe"
```

### Start Backend Server:

```bash
# Development mode with auto-reload
npm run dev

# Or production mode
npm start
```

You should see:
```
MongoDB Connected: localhost
Server running in development mode on port 5000
```

## Step 3: Frontend Setup (Terminal 2)

Open a **new terminal window**:

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

The app will automatically open at `http://localhost:3000`

## Step 4: First Time Usage

1. **Register an Account**
   - Go to `http://localhost:3000`
   - Click "Register here"
   - Fill in your details
   - Click "Register"

2. **Upload Resume**
   - You'll be redirected to the dashboard
   - Click "Analyze Resume" tab
   - Drag & drop your resume (PDF/DOC/DOCX)
   - Or click to select file

3. **Add Job Description**
   - Paste the job description in the text area
   - Make sure it includes required skills and qualifications

4. **Analyze**
   - Click "Analyze Resume" button
   - Wait 10-30 seconds for AI analysis

5. **View Results**
   - See your overall score
   - Review strengths and weaknesses
   - Check missing and suggested skills
   - Read personalized recommendations

## Troubleshooting

### Backend won't start

**Error: MongoDB connection failed**
```bash
# Make sure MongoDB is running
mongod

# Or check your MONGODB_URI in .env
```

**Error: Missing Gemini API Key**
```bash
# Add your API key to .env
GEMINI_API_KEY=your_actual_key_here
```

### Frontend won't start

**Error: Port 3000 already in use**
```bash
# Kill process on port 3000 or use different port
# The app will ask if you want to use a different port
```

**Error: Cannot connect to backend**
```bash
# Make sure backend is running on port 5000
# Check CORS settings in backend/server.js
```

### Analysis fails

**Error: Resume upload failed**
- Check file size (max 5MB)
- Verify file format (PDF, DOC, DOCX only)
- Try a different file

**Error: Analysis failed**
- Verify Gemini API key is correct
- Check internet connection
- Try with shorter job description

## Default Test Credentials

For quick testing, you can use:
```
Email: test@example.com
Password: test123
```

(Register this account first)

## Next Steps

✅ Analyze multiple resumes
✅ Try different job descriptions
✅ Review your history
✅ Implement recommended changes
✅ Re-analyze to see improvement

## Common Questions

**Q: How long does analysis take?**
A: Usually 10-30 seconds, depending on resume length and API response time.

**Q: Is my data secure?**
A: Yes! Passwords are hashed, and JWT tokens are used for authentication.

**Q: Can I use the same resume for multiple jobs?**
A: Yes! Each analysis is saved separately in your history.

**Q: What file formats are supported?**
A: PDF (.pdf), Word (.doc, .docx). Max size: 5MB.

**Q: Is there a limit on analyses?**
A: No limit in the application. Gemini API has rate limits based on your plan.

## Need Help?

- Check the main README.md for detailed documentation
- Review error messages in browser console (F12)
- Check backend logs in terminal
- Ensure all environment variables are set correctly

## Production Deployment

For production deployment instructions, see the main README.md file.

---

**Happy Analyzing! 🚀**
