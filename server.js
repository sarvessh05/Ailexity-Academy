const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'ailexity_academy_secret_key_2026'; // In production, use env var

// File Paths
const USERS_FILE = path.join(__dirname, 'users.json');
const COURSES_FILE = path.join(__dirname, 'courses.json');
const CURRICULUM_FILE = path.join(__dirname, 'curriculum.json');
const ASSIGNMENTS_FILE = path.join(__dirname, 'assignments.json');
const TESTS_FILE = path.join(__dirname, 'tests.json');
const DISCUSSIONS_FILE = path.join(__dirname, 'discussions.json');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname)); // Serve static files (HTML, CSS, JS)

// Generic Helper to read JSON files
const readJsonFile = (filePath, defaultValue = []) => {
    try {
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, JSON.stringify(defaultValue, null, 2));
            return defaultValue;
        }
        const data = fs.readFileSync(filePath);
        return JSON.parse(data);
    } catch (err) {
        console.error(`Error reading ${filePath}:`, err);
        return defaultValue;
    }
};

// Generic Helper to save JSON files
const saveJsonFile = (filePath, data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Helper wrappers
const getUsers = () => readJsonFile(USERS_FILE);
const saveUsers = (users) => saveJsonFile(USERS_FILE, users);
const getCurriculum = () => readJsonFile(CURRICULUM_FILE);
const saveCurriculum = (data) => saveJsonFile(CURRICULUM_FILE, data);
const getAssignments = () => readJsonFile(ASSIGNMENTS_FILE);
const saveAssignments = (data) => saveJsonFile(ASSIGNMENTS_FILE, data);
const getTests = () => readJsonFile(TESTS_FILE);
const saveTests = (data) => saveJsonFile(TESTS_FILE, data);
const getDiscussions = () => readJsonFile(DISCUSSIONS_FILE);
const saveDiscussions = (data) => saveJsonFile(DISCUSSIONS_FILE, data);

// --- AUTH ROUTES ---

// Register Endpoint
app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const users = getUsers();
        if (users.find(u => u.email === email)) {
            return res.status(400).json({ success: false, message: 'Email already registered' });
        }

        // Hashing Password using bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password: hashedPassword, // Storing hash, NOT plain text
            enrolledCourses: [],
            joinedDate: new Date().toISOString()
        };

        users.push(newUser);
        saveUsers(users);

        // Generate Token
        const token = jwt.sign({ id: newUser.id, email: newUser.email }, SECRET_KEY, { expiresIn: '24h' });

        // Return user without password
        const { password: _, ...userSafe } = newUser;

        res.json({
            success: true,
            message: 'Registration successful',
            token,
            user: userSafe
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ success: false, message: 'Server error during registration' });
    }
});

// Login Endpoint
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const users = getUsers();
        const user = users.find(u => u.email === email);

        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        // Validate Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        // Generate Token
        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '24h' });

        // Return user without password
        const { password: _, ...userSafe } = user;

        res.json({
            success: true,
            message: 'Login successful',
            token,
            user: userSafe
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Server error during login' });
    }
});

// Middleware to verify Token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ success: false, message: 'No token provided' });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(500).json({ success: false, message: 'Failed to authenticate token' });
        req.userId = decoded.id;
        next();
    });
};

// --- CONTENT ROUTES ---

// Get Curriculum for a specific course
app.get('/api/courses/:courseId/curriculum', (req, res) => {
    const { courseId } = req.params;
    const allCurriculum = getCurriculum();
    const courseCurr = allCurriculum.find(c => c.courseId == courseId);
    res.json(courseCurr ? courseCurr.modules : []);
});

// Add Lesson to Curriculum
app.post('/api/courses/:courseId/modules/:moduleIndex/lessons', (req, res) => {
    const { courseId, moduleIndex } = req.params;
    const newLesson = req.body; // Expects { title, duration, videoId, desc }

    const allCurriculum = getCurriculum();
    let courseCurr = allCurriculum.find(c => c.courseId == courseId);

    if (!courseCurr) {
        // Create if doesn't exist
        courseCurr = { courseId, modules: [] };
        allCurriculum.push(courseCurr);
    }

    // Ensure module exists (simple logic: create if index is out of bounds or just grab it)
    // For simplicity, we assume the module structure corresponds to what the frontend expects
    // If the frontend sends moduleIndex 0 and we have 0 modules, we create one.
    if (!courseCurr.modules[moduleIndex]) {
        courseCurr.modules[moduleIndex] = { title: `Module ${parseInt(moduleIndex) + 1}`, lessons: [] };
    }

    // Assign generic ID
    newLesson.id = Date.now();
    courseCurr.modules[moduleIndex].lessons.push(newLesson);

    saveCurriculum(allCurriculum);
    res.json({ success: true, lesson: newLesson });
});

// Get Assignments for a course
app.get('/api/courses/:courseId/assignments', (req, res) => {
    const { courseId } = req.params;
    const allAssignments = getAssignments();
    const courseAssig = allAssignments.find(a => a.courseId == courseId);
    res.json(courseAssig ? courseAssig.items : []);
});

// Add Assignment
app.post('/api/courses/:courseId/assignments', (req, res) => {
    const { courseId } = req.params;
    const newAssignment = req.body;

    const allAssignments = getAssignments();
    let courseAssig = allAssignments.find(a => a.courseId == courseId);

    if (!courseAssig) {
        courseAssig = { courseId, items: [] };
        allAssignments.push(courseAssig);
    }

    newAssignment.id = 'assign_' + Date.now();
    courseAssig.items.push(newAssignment);

    saveAssignments(allAssignments);
    res.json({ success: true, assignment: newAssignment });
});

// Get Tests for a course
app.get('/api/courses/:courseId/tests', (req, res) => {
    const { courseId } = req.params;
    const allTests = getTests();
    // Assuming 1 test per course for now based on legacy logic, or returning the list
    const courseTest = allTests.find(t => t.courseId == courseId);
    res.json(courseTest || null);
});

// Add/Update Test Questions
app.post('/api/courses/:courseId/tests/questions', (req, res) => {
    const { courseId } = req.params;
    const newQuestion = req.body;

    const allTests = getTests();
    let courseTest = allTests.find(t => t.courseId == courseId);

    if (!courseTest) {
        // Create default test structure if missing
        courseTest = {
            courseId,
            title: "Course Final Exam",
            duration: "30 mins",
            passScore: 70,
            questions: []
        };
        allTests.push(courseTest);
    }

    newQuestion.id = Date.now();
    courseTest.questions.push(newQuestion);

    saveTests(allTests);
    res.json({ success: true, question: newQuestion });
});

// --- DISCUSSION ROUTES ---

// Get Discussions for a course
app.get('/api/courses/:courseId/discussions', (req, res) => {
    const { courseId } = req.params;
    const allDiscussions = getDiscussions();
    const courseDiscussions = allDiscussions.filter(d => d.courseId == courseId);
    res.json(courseDiscussions);
});

// Create a new Discussion Thread
// Create a new Discussion Thread
app.post('/api/courses/:courseId/discussions', (req, res) => {
    const { courseId } = req.params;
    const newThread = req.body;

    if (!newThread.title || !newThread.content) {
        return res.status(400).json({ success: false, message: 'Title and content required' });
    }

    // Attempt to resolve user from token
    let userName = newThread.user || 'Anonymous';
    let userAvatar = newThread.avatar || 'U'; // Default
    let userColor = newThread.color || '#ddd';

    const token = req.headers['authorization'];
    if (token) {
        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            const users = getUsers();
            const foundUser = users.find(u => u.id === decoded.id);
            if (foundUser) {
                userName = foundUser.name;
                userAvatar = foundUser.name.charAt(0).toUpperCase();
                // Generate a consistent color based on char code of name
                const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A8', '#33FFF5', '#F5Bc33'];
                userColor = colors[userName.charCodeAt(0) % colors.length];
            }
        } catch (e) {
            console.log("Token verification failed for discussion post, falling back to provided/default name");
        }
    }

    const allDiscussions = getDiscussions();

    const thread = {
        id: Date.now(),
        courseId,
        user: userName,
        avatar: userAvatar,
        color: userColor,
        textColor: '#fff', // Force white text for better contrast with vibrant colors
        time: newThread.time || 'Just now',
        tag: newThread.tag || 'General',
        title: newThread.title,
        preview: newThread.content.substring(0, 150) + (newThread.content.length > 150 ? '...' : ''),
        content: newThread.content,
        replies: 0,
        views: 0,
        upvotes: 0,
        isUpvoted: false,
        repliesData: []
    };

    allDiscussions.push(thread);
    saveDiscussions(allDiscussions);

    res.json({ success: true, thread });
});

// Add Reply to a Thread
app.post('/api/discussions/:threadId/replies', (req, res) => {
    const { threadId } = req.params;
    const replyData = req.body;

    const allDiscussions = getDiscussions();
    const threadIndex = allDiscussions.findIndex(d => d.id == threadId);

    if (threadIndex === -1) {
        return res.status(404).json({ success: false, message: 'Thread not found' });
    }

    // Attempt to resolve user from token
    let userName = replyData.user || 'Student';
    let userAvatar = replyData.avatar || 'S';
    let userColor = replyData.color || '#FF5733';
    let isStaff = false;

    const token = req.headers['authorization'];
    if (token) {
        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            const users = getUsers();
            const foundUser = users.find(u => u.id === decoded.id);
            if (foundUser) {
                userName = foundUser.name;
                userAvatar = foundUser.name.charAt(0).toUpperCase();
                // Generate color
                const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A8', '#33FFF5', '#F5Bc33'];
                userColor = colors[userName.charCodeAt(0) % colors.length];
                // Check if staff (dummy logic, e.g., if email contains @ailexity.com)
                if (foundUser.email.includes('@ailexity.com') || foundUser.role === 'admin') {
                    isStaff = true;
                }
            }
        } catch (e) {
            console.log("Token verification failed for reply, falling back to provided/default name");
        }
    }

    const newReply = {
        id: Date.now(),
        user: userName,
        avatar: userAvatar,
        color: userColor,
        textColor: '#fff',
        time: replyData.time || 'Just now',
        content: replyData.content,
        upvotes: 0,
        isStaff: isStaff
    };

    if (!allDiscussions[threadIndex].repliesData) {
        allDiscussions[threadIndex].repliesData = [];
    }

    allDiscussions[threadIndex].repliesData.push(newReply);
    allDiscussions[threadIndex].replies++; // Increment counter

    saveDiscussions(allDiscussions);
    res.json({ success: true, reply: newReply });
});

// Vote on a Thread
app.post('/api/discussions/:threadId/vote', (req, res) => {
    const { threadId } = req.params;
    const { type } = req.body; // 'up' or 'down' (or toggle logic)

    const allDiscussions = getDiscussions();
    const thread = allDiscussions.find(d => d.id == threadId);

    if (!thread) {
        return res.status(404).json({ success: false, message: 'Thread not found' });
    }

    if (type === 'up') {
        thread.upvotes++;
        thread.isUpvoted = true; // Flawed in multi-user file based system, but OK for prototype
    } else {
        thread.upvotes = Math.max(0, thread.upvotes - 1);
        thread.isUpvoted = false;
    }

    saveDiscussions(allDiscussions);
    res.json({ success: true, upvotes: thread.upvotes });
});


// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Access the website at http://localhost:${PORT}/homepage.html`);
});
