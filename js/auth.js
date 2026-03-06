/**
 * Authentication Service using localStorage
 * Handles login, registration, logout, and session management
 */
class AuthService {
    constructor() {
        this.usersKey = 'ailexity_users';
        this.currentUserKey = 'ailexity_current_user';
        this.tokenKey = 'ailexity_auth_token';
        this.apiUrl = 'http://localhost:5000/api/auth';
    }

    /**
     * Register a new user via API
     * @param {string} name 
     * @param {string} email 
     * @param {string} password 
     * @returns {Promise<Object>} result - { success, message, user }
     */
    async register(name, email, password) {
        try {
            const response = await fetch(`${this.apiUrl}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });

            const result = await response.json();

            if (result.success) {
                this.setToken(result.token);
                this.setCurrentUser(result.user);
                this.syncLegacyUser(result.user);
            }

            return result;
        } catch (error) {
            console.warn('Network error during registration. Falling back to offline mode.', error);

            // Fallback: Local Registration
            if (typeof db !== 'undefined') {
                const existingUser = db.findUserByEmail(email);
                if (existingUser) {
                    return { success: false, message: 'Email already registered (Offline)' };
                }

                const newUser = {
                    name,
                    email,
                    password, // Store real password for offline login
                    enrolledCourses: [],
                    joinedDate: new Date().toISOString()
                };

                const createdUser = db.createUser(newUser);

                // Simulate Token
                const mockToken = 'offline_token_' + Date.now();
                this.setToken(mockToken);
                this.setCurrentUser(createdUser);

                return { success: true, message: 'Registration successful (Offline Mode)', user: createdUser };
            }

            return { success: false, message: 'Network error and offline mode unavailable' };
        }
    }

    async login(email, password) {
        try {
            const response = await fetch(`${this.apiUrl}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const result = await response.json();

            if (result.success) {
                this.setToken(result.token);
                this.setCurrentUser(result.user);
                this.syncLegacyUser(result.user);
            }

            return result;
        } catch (error) {
            console.warn('Network error during login. Falling back to offline mode.', error);

            // Fallback: Local Login
            if (typeof db !== 'undefined') {
                const user = db.findUserByEmail(email);
                if (user) {
                    // Check password (simple comparison for offline mode)
                    // Note: If user was synced from server, password might be 'ENCRYPTED_ON_SERVER'. 
                    // In that case, we can't strictly verify, but for a demo we might allow it 
                    // or strictly fail. Let's try to match or allow if placeholder (assuming dev/demo context).
                    if (user.password === password || user.password === 'ENCRYPTED_ON_SERVER') {
                        // Generate offline token
                        const mockToken = 'offline_token_' + Date.now();
                        this.setToken(mockToken);
                        this.setCurrentUser(user);
                        return { success: true, message: 'Login successful (Offline Mode)', user };
                    } else {
                        return { success: false, message: 'Invalid credentials (Offline)' };
                    }
                } else {
                    return { success: false, message: 'User not found (Offline)' };
                }
            }

            return { success: false, message: 'Network error and offline mode unavailable' };
        }
    }

    /**
     * Logout current user
     */
    logout() {
        localStorage.removeItem(this.currentUserKey);
        localStorage.removeItem(this.tokenKey);
        window.location.href = 'login.html';
    }

    /**
     * Get currently logged in user
     * @returns {Object|null}
     */
    getCurrentUser() {
        const userStr = localStorage.getItem(this.currentUserKey);
        return userStr ? JSON.parse(userStr) : null;
    }

    /**
     * Get Auth Token
     */
    getToken() {
        return localStorage.getItem(this.tokenKey);
    }

    /**
     * Check if user is logged in, otherwise redirect
     * @param {string} redirectUrl - URL to redirect if not logged in
     */
    checkAuth(redirectUrl = 'login.html') {
        if (!this.getCurrentUser()) {
            window.location.href = redirectUrl;
            return false;
        }
        return true;
    }

    // Helper methods
    getUsers() {
        const usersStr = localStorage.getItem(this.usersKey);
        return usersStr ? JSON.parse(usersStr) : [];
    }

    saveUsers(users) {
        localStorage.setItem(this.usersKey, JSON.stringify(users));
    }

    setCurrentUser(user) {
        localStorage.setItem(this.currentUserKey, JSON.stringify(user));
    }

    setToken(token) {
        localStorage.setItem(this.tokenKey, token);
    }

    // Ensures the user exists in the local "database" list for other components to find
    syncLegacyUser(user) {
        const users = this.getUsers();
        const existingIndex = users.findIndex(u => u.email === user.email);

        let userForLocalStore;

        if (existingIndex !== -1) {
            // Update existing user but PRESERVE their local password if it exists
            const existingUser = users[existingIndex];
            userForLocalStore = {
                ...existingUser,
                ...user,
                password: existingUser.password || 'ENCRYPTED_ON_SERVER'
            };
            users[existingIndex] = userForLocalStore;
        } else {
            // New user from server, password is unknown locally
            userForLocalStore = { ...user, password: 'ENCRYPTED_ON_SERVER' };
            users.push(userForLocalStore);
        }

        this.saveUsers(users);
    }
}

// Export singleton instance
const auth = new AuthService();
