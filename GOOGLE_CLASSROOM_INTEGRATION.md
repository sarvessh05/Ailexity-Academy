# Google Classroom Integration Guide

## Overview
This guide explains how to integrate Google Classroom into your AILexity Academy course website. There are several approaches depending on your needs.

---

## Table of Contents
1. [Integration Approaches](#integration-approaches)
2. [Prerequisites](#prerequisites)
3. [Setup Google Cloud Console](#setup-google-cloud-console)
4. [Method 1: Google Sign-In Integration](#method-1-google-sign-in-integration)
5. [Method 2: Google Classroom API](#method-2-google-classroom-api)
6. [Method 3: Embedding Google Classroom](#method-3-embedding-google-classroom)
7. [Complete Integration Example](#complete-integration-example)
8. [Best Practices](#best-practices)

---

## Integration Approaches

### Option 1: Google Sign-In Only
- Users sign in with Google accounts
- Simple authentication
- No direct Classroom API access

### Option 2: Full Google Classroom API
- Complete integration with Classroom
- Create courses, assignments, announcements
- Sync student data
- Requires OAuth 2.0

### Option 3: Embedding
- Embed Classroom content in your site
- Limited functionality
- Good for displaying content

---

## Prerequisites

1. **Google Account** with admin access
2. **Google Cloud Project** (free tier available)
3. **Web server** (for OAuth redirects)
4. **HTTPS** (required for OAuth)

---

## Setup Google Cloud Console

### Step 1: Create a Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Name it (e.g., "AILexity Academy")
4. Click "Create"

### Step 2: Enable Google Classroom API
1. Navigate to "APIs & Services" → "Library"
2. Search for "Google Classroom API"
3. Click "Enable"

### Step 3: Create OAuth 2.0 Credentials
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. Configure OAuth consent screen first (if prompted):
   - User Type: External
   - App name: AILexity Academy
   - Support email: your-email@example.com
   - Scopes: Add `https://www.googleapis.com/auth/classroom.courses.readonly`
4. Create OAuth client ID:
   - Application type: Web application
   - Name: AILexity Academy Web Client
   - Authorized JavaScript origins:
     - `http://localhost:3000` (for development)
     - `https://yourdomain.com` (for production)
   - Authorized redirect URIs:
     - `http://localhost:3000/auth/google/callback`
     - `https://yourdomain.com/auth/google/callback`
5. Save the **Client ID** and **Client Secret**

### Step 4: Enable Required APIs
Enable these APIs in the Library:
- ✅ Google Classroom API
- ✅ Google Drive API (for file attachments)
- ✅ Google Calendar API (for due dates)

---

## Method 1: Google Sign-In Integration

### Simple Authentication Only

#### HTML Implementation

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Google Sign-In</title>
    <!-- Google Sign-In API -->
    <script src="https://accounts.google.com/gsi/client" async defer></script>
</head>
<body>
    <!-- Google Sign-In Button -->
    <div id="g_id_onload"
         data-client_id="YOUR_CLIENT_ID.apps.googleusercontent.com"
         data-callback="handleCredentialResponse"
         data-auto_prompt="false">
    </div>
    <div class="g_id_signin"
         data-type="standard"
         data-size="large"
         data-theme="outline"
         data-text="sign_in_with"
         data-shape="rectangular"
         data-logo_alignment="left">
    </div>

    <div id="user-info" style="display:none;">
        <h2>Welcome, <span id="user-name"></span>!</h2>
        <p>Email: <span id="user-email"></span></p>
        <button onclick="signOut()">Sign Out</button>
    </div>

    <script>
        function handleCredentialResponse(response) {
            // Decode JWT token
            const payload = JSON.parse(atob(response.credential.split('.')[1]));
            
            // Display user info
            document.getElementById('user-name').textContent = payload.name;
            document.getElementById('user-email').textContent = payload.email;
            document.getElementById('user-info').style.display = 'block';
            
            // Send token to your backend for verification
            fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: response.credential })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Authentication successful:', data);
                // Store user session
                localStorage.setItem('userToken', data.token);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }

        function signOut() {
            google.accounts.id.disableAutoSelect();
            document.getElementById('user-info').style.display = 'none';
            localStorage.removeItem('userToken');
        }
    </script>
</body>
</html>
```

---

## Method 2: Google Classroom API

### Full Integration with Classroom Features

#### Frontend (JavaScript)

```javascript
// Initialize Google API
function initGoogleAPI() {
    gapi.load('auth2', function() {
        gapi.auth2.init({
            client_id: 'YOUR_CLIENT_ID.apps.googleusercontent.com'
        });
    });
    
    gapi.load('client', start);
}

function start() {
    gapi.client.init({
        apiKey: 'YOUR_API_KEY',
        clientId: 'YOUR_CLIENT_ID.apps.googleusercontent.com',
        discoveryDocs: ['https://classroom.googleapis.com/$discovery/rest?version=v1'],
        scope: 'https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.rosters.readonly'
    }).then(function() {
        // API initialized
        console.log('Google Classroom API initialized');
    });
}

// Sign in user
function signIn() {
    const authInstance = gapi.auth2.getAuthInstance();
    authInstance.signIn().then(function() {
        loadCourses();
    });
}

// Load user's courses
function loadCourses() {
    gapi.client.classroom.courses.list({
        studentId: 'me',
        courseStates: 'ACTIVE'
    }).then(function(response) {
        const courses = response.result.courses || [];
        displayCourses(courses);
    });
}

// Display courses
function displayCourses(courses) {
    const container = document.getElementById('courses-container');
    courses.forEach(course => {
        const courseCard = `
            <div class="course-card">
                <h3>${course.name}</h3>
                <p>${course.section || 'No section'}</p>
                <p>ID: ${course.id}</p>
                <button onclick="loadCourseDetails('${course.id}')">View Details</button>
            </div>
        `;
        container.innerHTML += courseCard;
    });
}

// Load course details
function loadCourseDetails(courseId) {
    gapi.client.classroom.courses.get({
        id: courseId
    }).then(function(response) {
        const course = response.result;
        console.log('Course details:', course);
        // Display course details
    });
}

// Load course announcements
function loadAnnouncements(courseId) {
    gapi.client.classroom.courses.announcements.list({
        courseId: courseId
    }).then(function(response) {
        const announcements = response.result.announcements || [];
        displayAnnouncements(announcements);
    });
}

// Load course assignments
function loadCourseWork(courseId) {
    gapi.client.classroom.courses.courseWork.list({
        courseId: courseId
    }).then(function(response) {
        const assignments = response.result.courseWork || [];
        displayAssignments(assignments);
    });
}
```

#### Backend Example (Node.js/Express)

```javascript
const express = require('express');
const { google } = require('googleapis');
const app = express();

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

// Scopes required
const SCOPES = [
    'https://www.googleapis.com/auth/classroom.courses.readonly',
    'https://www.googleapis.com/auth/classroom.rosters.readonly',
    'https://www.googleapis.com/auth/classroom.coursework.me.readonly'
];

// Get authorization URL
app.get('/auth/google', (req, res) => {
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
        prompt: 'consent'
    });
    res.redirect(authUrl);
});

// Handle OAuth callback
app.get('/auth/google/callback', async (req, res) => {
    const { code } = req.query;
    
    try {
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);
        
        // Store tokens (in database)
        // Redirect to dashboard
        res.redirect('/dashboard?token=' + tokens.access_token);
    } catch (error) {
        console.error('Error getting token:', error);
        res.redirect('/error');
    }
});

// Get user's courses
app.get('/api/courses', async (req, res) => {
    const accessToken = req.headers.authorization?.split(' ')[1];
    
    if (!accessToken) {
        return res.status(401).json({ error: 'No access token' });
    }
    
    oauth2Client.setCredentials({ access_token: accessToken });
    const classroom = google.classroom({ version: 'v1', auth: oauth2Client });
    
    try {
        const response = await classroom.courses.list({
            studentId: 'me',
            courseStates: 'ACTIVE'
        });
        
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
```

---

## Method 3: Embedding Google Classroom

### Embed Classroom Content

```html
<!-- Embed Google Classroom Course -->
<iframe 
    src="https://classroom.google.com/u/0/c/COURSE_ID"
    width="100%" 
    height="600px"
    frameborder="0"
    allowfullscreen>
</iframe>

<!-- Note: This requires users to be logged into Google Classroom -->
```

---

## Complete Integration Example

### HTML File with Full Integration

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Google Classroom Integration - AILexity Academy</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        .google-signin-btn {
            background: #4285f4;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            margin: 20px 0;
        }
        .google-signin-btn:hover {
            background: #357ae8;
        }
        .courses-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        .course-card {
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 20px;
            background: white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .course-card h3 {
            margin-top: 0;
            color: #333;
        }
        .hidden {
            display: none;
        }
    </style>
</head>
<body>
    <h1>Google Classroom Integration</h1>
    
    <div id="signin-section">
        <button class="google-signin-btn" onclick="signIn()">Sign in with Google</button>
    </div>
    
    <div id="dashboard-section" class="hidden">
        <h2>My Courses</h2>
        <button class="google-signin-btn" onclick="signOut()">Sign Out</button>
        <div id="courses-container"></div>
    </div>

    <!-- Google API Scripts -->
    <script src="https://apis.google.com/js/api.js"></script>
    <script src="https://accounts.google.com/gsi/client" async defer></script>
    
    <script>
        // Replace with your credentials
        const CLIENT_ID = 'YOUR_CLIENT_ID.apps.googleusercontent.com';
        const API_KEY = 'YOUR_API_KEY';
        const DISCOVERY_DOCS = ['https://classroom.googleapis.com/$discovery/rest?version=v1'];
        const SCOPES = 'https://www.googleapis.com/auth/classroom.courses.readonly';

        let tokenClient;
        let accessToken = null;

        // Initialize Google API
        function gapiLoaded() {
            gapi.load('client', initializeGapiClient);
        }

        async function initializeGapiClient() {
            await gapi.client.init({
                apiKey: API_KEY,
                discoveryDocs: DISCOVERY_DOCS,
            });
        }

        function gsiLoaded() {
            tokenClient = google.accounts.oauth2.initTokenClient({
                client_id: CLIENT_ID,
                scope: SCOPES,
                callback: '', // defined later
            });
        }

        // Sign in function
        function signIn() {
            tokenClient.callback = async (response) => {
                if (response.error !== undefined) {
                    throw response;
                }
                accessToken = response.access_token;
                document.getElementById('signin-section').classList.add('hidden');
                document.getElementById('dashboard-section').classList.remove('hidden');
                await loadCourses();
            };

            if (gapi.client.getToken() === null) {
                tokenClient.requestAccessToken({ prompt: 'consent' });
            } else {
                tokenClient.requestAccessToken({ prompt: '' });
            }
        }

        // Sign out function
        function signOut() {
            const token = gapi.client.getToken();
            if (token !== null) {
                google.accounts.oauth2.revoke(token.access_token);
                gapi.client.setToken('');
                accessToken = null;
                document.getElementById('signin-section').classList.remove('hidden');
                document.getElementById('dashboard-section').classList.add('hidden');
                document.getElementById('courses-container').innerHTML = '';
            }
        }

        // Load courses
        async function loadCourses() {
            try {
                const response = await gapi.client.classroom.courses.list({
                    studentId: 'me',
                    courseStates: 'ACTIVE'
                });

                const courses = response.result.courses || [];
                displayCourses(courses);
            } catch (error) {
                console.error('Error loading courses:', error);
                alert('Error loading courses. Please try again.');
            }
        }

        // Display courses
        function displayCourses(courses) {
            const container = document.getElementById('courses-container');
            container.innerHTML = '';

            if (courses.length === 0) {
                container.innerHTML = '<p>No courses found.</p>';
                return;
            }

            courses.forEach(course => {
                const courseCard = document.createElement('div');
                courseCard.className = 'course-card';
                courseCard.innerHTML = `
                    <h3>${course.name}</h3>
                    <p><strong>Section:</strong> ${course.section || 'N/A'}</p>
                    <p><strong>Room:</strong> ${course.room || 'N/A'}</p>
                    <p><strong>Course ID:</strong> ${course.id}</p>
                    <button onclick="viewCourse('${course.id}')">View Details</button>
                `;
                container.appendChild(courseCard);
            });
        }

        // View course details
        async function viewCourse(courseId) {
            try {
                const response = await gapi.client.classroom.courses.get({
                    id: courseId
                });
                const course = response.result;
                alert(`Course: ${course.name}\nDescription: ${course.description || 'N/A'}\nOwner: ${course.ownerId}`);
            } catch (error) {
                console.error('Error loading course:', error);
            }
        }

        // Load scripts
        window.gapiLoaded = gapiLoaded;
        window.gsiLoaded = gsiLoaded;
    </script>
</body>
</html>
```

---

## Integration with Your Existing Dashboard

### Add to student-dashboard.html

Add this section to display Google Classroom courses:

```html
<!-- Add to student-dashboard.html -->
<section class="google-classroom-section" style="margin-top: 32px;">
    <h2 class="section-title">Google Classroom Courses</h2>
    <button id="google-signin-btn" class="btn-primary">Connect Google Classroom</button>
    <div id="google-courses-container" class="courses-grid"></div>
</section>

<script>
// Add Google Classroom integration script here
// (Use the code from Method 2 above)
</script>
```

---

## Required Scopes

### Read-Only Scopes
```
https://www.googleapis.com/auth/classroom.courses.readonly
https://www.googleapis.com/auth/classroom.rosters.readonly
https://www.googleapis.com/auth/classroom.coursework.me.readonly
https://www.googleapis.com/auth/classroom.announcements.readonly
```

### Write Scopes (if creating courses)
```
https://www.googleapis.com/auth/classroom.courses
https://www.googleapis.com/auth/classroom.coursework.students
```

---

## Environment Variables

Create a `.env` file:

```env
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback
GOOGLE_API_KEY=your-api-key
```

---

## Security Best Practices

1. **Never expose Client Secret** in frontend code
2. **Use HTTPS** in production
3. **Validate tokens** on backend
4. **Store tokens securely** (encrypted database)
5. **Implement token refresh** mechanism
6. **Set proper CORS** policies
7. **Rate limiting** for API calls

---

## Common Issues & Solutions

### Issue 1: "redirect_uri_mismatch"
**Solution:** Ensure redirect URI in Google Console matches exactly

### Issue 2: "access_denied"
**Solution:** User needs to grant permissions in OAuth consent screen

### Issue 3: CORS errors
**Solution:** Configure CORS on your backend server

### Issue 4: Token expired
**Solution:** Implement token refresh logic

---

## Testing Checklist

- [ ] Google Sign-In works
- [ ] Can fetch user's courses
- [ ] Can display course details
- [ ] Can load assignments
- [ ] Can load announcements
- [ ] Token refresh works
- [ ] Sign out works
- [ ] Error handling works

---

## Additional Resources

- [Google Classroom API Documentation](https://developers.google.com/classroom)
- [Google OAuth 2.0 Guide](https://developers.google.com/identity/protocols/oauth2)
- [Google API JavaScript Client](https://github.com/google/google-api-javascript-client)
- [Google Identity Services](https://developers.google.com/identity/gsi/web)

---

## Next Steps

1. Set up Google Cloud Console project
2. Get OAuth credentials
3. Choose integration method
4. Implement authentication
5. Test with test accounts
6. Deploy to production

---

## Support

For issues:
- Check Google Cloud Console logs
- Review API quotas
- Verify OAuth consent screen configuration
- Test with different user accounts

