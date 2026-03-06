# Backend Frameworks for AILexity Academy

## Supported Backend Frameworks

Based on the course website plan, the following backend frameworks are supported:

### 1. **Node.js**
- **Runtime:** JavaScript runtime built on Chrome's V8 engine
- **Popular Frameworks:**
  - Express.js
  - Nest.js
  - Fastify
  - Koa.js
- **Use Cases:** RESTful APIs, real-time applications, microservices
- **Database Support:** MongoDB, PostgreSQL, MySQL
- **API Endpoint Example:** `/api/courses`, `/api/auth/login`

### 2. **Python**
- **Frameworks:**
  - **Django:** Full-featured web framework with ORM, admin panel
  - **Flask:** Lightweight, flexible microframework
- **Use Cases:** Data processing, ML integration, rapid development
- **Database Support:** PostgreSQL, MySQL, SQLite, MongoDB
- **API Endpoint Example:** `/api/courses/`, `/api/auth/login/`

### 3. **PHP**
- **Frameworks:**
  - Laravel
  - Symfony
  - CodeIgniter
- **Use Cases:** Traditional web applications, content management
- **Database Support:** MySQL, PostgreSQL, SQLite
- **API Endpoint Example:** `/api/courses.php`, `/api/auth/login.php`

### 4. **Ruby on Rails**
- **Framework:** Rails (Ruby)
- **Use Cases:** Rapid prototyping, convention over configuration
- **Database Support:** PostgreSQL, MySQL, SQLite
- **API Endpoint Example:** `/api/courses`, `/api/auth/login`

## API Base URLs Configuration

The HTML files are configured to work with any of these backend frameworks. Update the `API_BASE_URL` in each HTML file to match your backend:

```javascript
// For Node.js/Express
const API_BASE_URL = 'http://localhost:3000/api';

// For Python Django
const API_BASE_URL = 'http://localhost:8000/api';

// For Python Flask
const API_BASE_URL = 'http://localhost:5000/api';

// For PHP
const API_BASE_URL = 'http://localhost/api';

// For Ruby on Rails
const API_BASE_URL = 'http://localhost:3000/api';
```

## Common API Endpoints

All frameworks should implement these endpoints:

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Courses
- `GET /api/courses` - List all courses
- `GET /api/courses/:id` - Get course details
- `POST /api/courses/:id/enroll` - Enroll in course
- `GET /api/courses/:id/lessons` - Get course lessons
- `GET /api/courses/:id/progress` - Get course progress

### Content
- `GET /api/lessons/:id` - Get lesson details
- `POST /api/assignments/:id/submit` - Submit assignment
- `GET /api/quizzes/:id` - Get quiz
- `POST /api/quizzes/:id/submit` - Submit quiz

### User
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/courses` - Get user's enrolled courses
- `GET /api/users/certificates` - Get user's certificates

## Integration Status

All HTML files have been updated with:
- ✅ Backend API configuration
- ✅ Fetch utility functions
- ✅ Error handling
- ✅ Form submission handlers
- ✅ Data fetching for dynamic content

