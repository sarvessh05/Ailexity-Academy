# Ailexity Academy

An AI-powered learning management system built with modern web technologies.

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- TailwindCSS for styling
- shadcn/ui component library
- Clerk for authentication
- React Router for navigation
- TanStack Query for data fetching

### Backend
- Python Flask server
- JWT authentication
- OAuth integration (Google, Facebook)
- JSON-based data storage

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+
- Clerk account (for authentication)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sarvessh05/Ailexity-Academy.git
cd Ailexity-Academy
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd ..
pip install flask flask-cors authlib pyjwt bcrypt
```

### Configuration

1. Set up Clerk:
   - Create a Clerk account at https://clerk.com
   - Create a new application
   - Copy your publishable key

2. Configure frontend environment:
   - Copy `frontend/.env.local` and add your Clerk key:
   ```
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
   VITE_API_URL=http://localhost:5000
   ```

3. Configure backend (optional):
   - Update OAuth credentials in `auth_server.py` if using Google/Facebook login
   - Update SMTP settings for email functionality

### Running the Application

1. Start the backend server:
```bash
python auth_server.py
```
The backend will run on http://localhost:5000

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```
The frontend will run on http://localhost:8080

3. Open your browser and navigate to http://localhost:8080

## Features

- User authentication with Clerk
- Course management and enrollment
- Interactive quizzes and assignments
- Discussion forums
- Progress tracking
- Responsive design
- OAuth integration (Google, Facebook)

## Project Structure

```
Ailexity-Academy/
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utility functions and API
│   │   └── hooks/         # Custom React hooks
│   └── public/            # Static assets
├── database/              # Database schemas and queries
├── auth_server.py         # Flask backend server
└── *.json                 # Data files
```

## Building for Production

```bash
cd frontend
npm run build
```

The production build will be in the `frontend/dist` directory.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
