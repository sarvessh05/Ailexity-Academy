# Secure Authentication System

This project now uses a Node.js backend to securely handle authentication using **Bcrypt** (for password hashing) and **JWT** (JSON Web Tokens for sessions).

## How to Run

1. **Start the Server**:
   Open a terminal in this directory and run:
   ```bash
   node server.js
   ```

2. **Access the Application**:
   Open your browser and navigate to:
   [http://localhost:3000/homepage.html](http://localhost:3000/homepage.html)

   **IMPORTANT**: Do NOT open the HTML files directly (e.g., `file:///...`) because the API calls require the files to be served from the same domain (localhost:3000) or configured with CORS (which is enabled, but serving from the server is best practice).

## Architecture Changes

- **server.js**: Express server running on port 3000. Handles `/api/auth/register` and `/api/auth/login`.
- **users.json**: File-based database storing users with **hashed passwords**. Plain text passwords are no longer stored.
- **js/auth.js**: Updated to communicate with the backend API instead of using LocalStorage for authentication logic.
- **Frontend Sync**: The application still maintains a local cache of user profile data so that existing features (like course dashboard) continue to work seamlessly.
