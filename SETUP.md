# Ailexity Academy - Setup Guide

## Quick Start

### 1. Clerk Authentication Setup

1. Go to https://clerk.com and create a free account
2. Create a new application
3. In your Clerk dashboard:
   - Go to "API Keys"
   - Copy your "Publishable Key" (starts with `pk_test_` or `pk_live_`)
4. Create `frontend/.env.local` file:
   ```
   VITE_CLERK_PUBLISHABLE_KEY=your_publishable_key_here
   VITE_API_URL=http://localhost:5000
   ```

### 2. Install Dependencies

Frontend:
```bash
cd frontend
npm install
```

Backend:
```bash
pip install flask flask-cors authlib pyjwt bcrypt
```

### 3. Run the Application

Terminal 1 - Backend:
```bash
python auth_server.py
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

Visit: http://localhost:8080

## Clerk Configuration

### Customize Sign-In/Sign-Up Pages

In your Clerk dashboard:
1. Go to "User & Authentication" → "Email, Phone, Username"
2. Configure which fields you want (email, username, phone)
3. Go to "Customization" to style the auth components to match your brand

### Add Social Login (Optional)

1. In Clerk dashboard, go to "User & Authentication" → "Social Connections"
2. Enable providers (Google, Facebook, GitHub, etc.)
3. Follow Clerk's guide to set up OAuth credentials

### Configure Redirects

In Clerk dashboard → "Paths":
- Sign-in URL: `/login`
- Sign-up URL: `/signup`
- After sign-in: `/dashboard`
- After sign-up: `/dashboard`

## Backend API Endpoints

The Flask backend provides:
- `/api/user/<user_id>/data` - Get user enrollments and activities
- `/api/enroll` - Enroll user in a course
- `/api/activity` - Log user activity
- `/send-otp` - Send password reset OTP
- `/verify-reset` - Verify OTP and reset password

## Environment Variables

### Frontend (.env.local)
```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
VITE_API_URL=http://localhost:5000
```

### Backend (auth_server.py)
Update these variables in the file:
- `SECRET_KEY` - JWT secret
- `SMTP_SERVER`, `SENDER_EMAIL`, `SENDER_PASSWORD` - For email functionality
- OAuth credentials (if using Google/Facebook login)

## Deployment

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Deploy the `dist` folder
3. Add environment variables in hosting platform
4. Update `VITE_API_URL` to your backend URL

### Backend (Heroku/Railway/Render)
1. Add `requirements.txt`:
   ```
   flask
   flask-cors
   authlib
   pyjwt
   bcrypt
   ```
2. Add `Procfile`:
   ```
   web: python auth_server.py
   ```
3. Deploy and note the URL
4. Update frontend `VITE_API_URL` to backend URL

## Troubleshooting

### Clerk not loading
- Check that `VITE_CLERK_PUBLISHABLE_KEY` is set correctly
- Ensure the key starts with `pk_test_` or `pk_live_`
- Clear browser cache and restart dev server

### Backend connection issues
- Ensure Flask server is running on port 5000
- Check CORS settings in `auth_server.py`
- Verify `VITE_API_URL` in frontend `.env.local`

### Build errors
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Check Node.js version (requires 18+)

## Next Steps

1. Customize the Clerk appearance in the dashboard
2. Add your course content to the JSON files
3. Configure email settings for password reset
4. Set up a production database (PostgreSQL, MongoDB)
5. Deploy to production

## Support

For issues:
- Clerk: https://clerk.com/docs
- React: https://react.dev
- Flask: https://flask.palletsprojects.com

Repository: https://github.com/sarvessh05/Ailexity-Academy
