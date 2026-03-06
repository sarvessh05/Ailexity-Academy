/**
 * Mock Database Service
 * Simulates a relational database using localStorage
 * Tables: users, courses, enrollments, progress
 */

class MockDatabase {
    constructor() {
        this.tables = {
            users: 'ailexity_users',
            courses: 'ailexity_courses',
            enrollments: 'ailexity_enrollments',
            progress: 'ailexity_progress',
            activity_logs: 'ailexity_activity_logs',
            curriculum: 'ailexity_curriculum',
            assignments: 'ailexity_assignments',
            tests: 'ailexity_tests'
        };

        this.init();
    }

    init() {
        // Seed courses if empty
        if (!localStorage.getItem(this.tables.courses)) {
            const initialCourses = [
                {
                    id: 1,
                    title: "Stanford CS229: Machine Learning",
                    description: "The complete Autumn 2018 lecture series by Andrew Ng.",
                    thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800",
                    price: 199,
                    category: "Data Science"
                },
                {
                    id: 2,
                    title: "Web Development Bootcamp",
                    description: "Become a full-stack developer.",
                    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
                    price: 199,
                    category: "Programming"
                },
                {
                    id: 3,
                    title: "Data Mining & Analysis",
                    description: "Extract insights from big data.",
                    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
                    price: 199,
                    category: "Data Science"
                }
            ];
            this.saveData(this.tables.courses, initialCourses);
        }

        // Initialize other tables if not present
        if (!localStorage.getItem(this.tables.enrollments)) this.saveData(this.tables.enrollments, []);
        if (!localStorage.getItem(this.tables.progress)) this.saveData(this.tables.progress, []);
        if (!localStorage.getItem(this.tables.activity_logs)) this.saveData(this.tables.activity_logs, []);

        // --- NEW CONTENT SEEDING ---

        // Curriculum
        if (!localStorage.getItem(this.tables.curriculum)) {
            const defaultCurriculum = [
                {
                    courseId: '1',
                    modules: [
                        {
                            title: "Module 1: Supervised Learning (Regression)",
                            lessons: [
                                { id: 101, title: "1.1 Introduction & Linear Regression", duration: "1h 14m", videoId: "jGwO_UgTS7I", desc: "Welcome to CS229. Introduction to Machine Learning and Linear Regression." },
                                { id: 102, title: "1.2 Gradient Descent & Normal Equations", duration: "1h 18m", videoId: "4b4MUYve_U8", desc: "Least Mean Squares algorithm, Gradient Descent, and Normal Equations." },
                                { id: 103, title: "1.3 Locally Weighted & Logistic Regression", duration: "1h 20m", videoId: "het9HFqo1TQ", desc: "Probabilistic interpretation, Logistic Regression, and Newton's Method." }
                            ]
                        },
                        {
                            title: "Module 2: Generative Algorithms & SVMs",
                            lessons: [
                                { id: 104, title: "2.1 GDA & Naive Bayes", duration: "1h 15m", videoId: "nt63k3bfXS0", desc: "Gaussian Discriminant Analysis and Naive Bayes used in spam classification." },
                                { id: 105, title: "2.2 Support Vector Machines", duration: "1h 16m", videoId: "lDwow4aOrtg", desc: "Optimal Margin Classifier, Primal/Dual problems, and SVMs." },
                                { id: 106, title: "2.3 Kernels", duration: "1h 19m", videoId: "8NYoQiRANpg", desc: "Kernel methods and their application in SVMs." }
                            ]
                        },
                        {
                            title: "Module 3: Deep Learning & Neural Networks",
                            lessons: [
                                { id: 107, title: "3.1 Introduction to Neural Networks", duration: "1h 18m", videoId: "MfIjxPh6Pys", desc: "Neurons, neural network architecture, and biological inspiration." },
                                { id: 108, title: "3.2 Backpropagation", duration: "1h 20m", videoId: "zUazLXZZA2U", desc: "Forward/Backward propagation and improving neural network performance." },
                                { id: 109, title: "3.3 Debugging ML Models", duration: "1h 15m", videoId: "ORrStCArmP4", desc: "Practical advice on debugging and error analysis." }
                            ]
                        },
                        {
                            title: "Module 4: Unsupervised Learning",
                            lessons: [
                                { id: 110, title: "4.1 K-Means & EM Algorithm", duration: "1h 22m", videoId: "rVfZHWTwXSA", desc: "Clustering with K-Means and Expectation-Maximization." },
                                { id: 111, title: "4.2 Reinforcement Learning Intro", duration: "1h 15m", videoId: "YQA9lLdLig8", desc: "MDPs, Value Iteration, and Policy Iteration." }
                            ]
                        }
                    ]
                },
                {
                    courseId: '2',
                    modules: [
                        {
                            title: "Module 1: HTML & CSS Basics",
                            lessons: [
                                { id: 201, title: "1.1 HTML5 Crash Course", duration: "15 mins", videoId: "pQN-pnXPaVg", desc: "Structure of modern web pages." },
                                { id: 202, title: "1.2 CSS3 Styling", duration: "20 mins", videoId: "1Rs2ND1ryYc", desc: "Selectors, box model, and layouts." }
                            ]
                        }
                    ]
                },
                {
                    courseId: '3', // Data Mining
                    modules: [
                        {
                            title: "Module 1: Matrix Fundamentals",
                            lessons: [
                                { id: 301, title: "Course Introduction", duration: "4 mins", videoId: "Cx5Z-OslNWE", desc: "Introduction to 18.065." }
                            ]
                        }
                    ]
                }
            ];
            this.saveData(this.tables.curriculum, defaultCurriculum);
        }

        // Assignments
        if (!localStorage.getItem(this.tables.assignments)) {
            const defaultAssignments = [
                {
                    courseId: '1',
                    items: [
                        { id: 'a1', title: 'Assignment 3: Neural Networks', due: 'Tomorrow', badge: 'badge-urgent', desc: 'Implement a basic NN.', status: 'pending' }
                    ]
                },
                {
                    courseId: '2',
                    items: [
                        { id: 'a2', title: 'Portfolio Project', due: 'Next Week', badge: 'badge-urgent', desc: 'Build a website.', status: 'pending' }
                    ]
                }
            ];
            this.saveData(this.tables.assignments, defaultAssignments);
        }

        // Tests
        if (!localStorage.getItem(this.tables.tests)) {
            const defaultTests = [
                {
                    courseId: '1',
                    title: "Module 1: Machine Learning Basics",
                    duration: "10 mins",
                    passScore: 70,
                    questions: [
                        { id: 1, text: "Which is Supervised Learning?", options: ["Clustering", "Regression", "Reduction", "Noise"], correct: 1 }
                    ]
                }
            ];
            this.saveData(this.tables.tests, defaultTests);
        }
    }

    // --- GENERIC HELPERS ---

    getData(tableName) {
        const data = localStorage.getItem(tableName);
        return data ? JSON.parse(data) : [];
    }

    saveData(tableName, data) {
        localStorage.setItem(tableName, JSON.stringify(data));
    }

    // --- USER OPERATIONS (Proxied from auth.js usually, but good to have direct access) ---

    findUserByEmail(email) {
        const users = this.getData(this.tables.users);
        return users.find(u => u.email === email);
    }

    createUser(user) {
        const users = this.getData(this.tables.users);
        user.id = Date.now(); // Simple ID generation
        users.push(user);
        this.saveData(this.tables.users, users);
        return user;
    }

    // --- COURSE OPERATIONS ---

    getAllCourses() {
        return this.getData(this.tables.courses);
    }

    getCourseById(id) {
        const courses = this.getAllCourses();
        return courses.find(c => c.id == id);
    }

    // --- ENROLLMENT OPERATIONS ---

    enrollUser(userId, courseId) {
        const enrollments = this.getData(this.tables.enrollments);

        // Check if already enrolled
        const existing = enrollments.find(e => e.userId === userId && e.courseId === courseId);
        if (existing) return { success: false, message: 'Already enrolled' };

        const enrollment = {
            id: Date.now(),
            userId,
            courseId,
            enrolledAt: new Date().toISOString(),
            status: 'active',
            progress: 0
        };

        enrollments.push(enrollment);
        this.saveData(this.tables.enrollments, enrollments);

        // Log initial activity
        this.logActivity(userId, courseId, 'COURSE_ACCESS', 'enrollment', { title: 'Started Course' });

        // SYNC TO SERVER
        fetch('http://localhost:5000/api/enroll', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(enrollment)
        }).catch(err => console.error("Failed to enroll on server", err));

        return { success: true, enrollment };
    }

    getUserEnrollments(userId) {
        const enrollments = this.getData(this.tables.enrollments);
        const courses = this.getAllCourses();

        // Join with courses table
        return enrollments
            .filter(e => e.userId === userId)
            .map(e => {
                const course = courses.find(c => c.id === e.courseId);
                return {
                    ...e,
                    courseTitle: course ? course.title : 'Unknown Course',
                    courseThumbnail: course ? course.thumbnail : '',
                    courseDescription: course ? course.description : ''
                };
            });
    }

    // --- REAL-TIME TRACKING & PROGRESS ENGINE ---

    // --- SERVER SYNC ---
    async sync(userId) {
        if (!userId) return;
        try {
            const res = await fetch(`http://localhost:5000/api/user/${userId}/data`);
            if (res.ok) {
                const data = await res.json();

                // Update Local Storage with Server Data
                if (data.enrollments && data.enrollments.length > 0) {
                    this.saveData(this.tables.enrollments, data.enrollments);
                }
                if (data.activities && data.activities.length > 0) {
                    this.saveData(this.tables.activity_logs, data.activities);
                }
                console.log("DB Synced with Server");
            }
        } catch (e) {
            console.warn("Sync failed (Offline?)", e);
        }
    }

    // --- REAL-TIME TRACKING & PROGRESS ENGINE ---

    logActivity(userId, courseId, activityType, itemId, meta = {}) {
        const logs = this.getData(this.tables.activity_logs);

        // Check for duplicates
        const exists = logs.find(l =>
            l.userId === userId &&
            l.courseId == courseId &&
            l.activityType === activityType &&
            l.itemId === itemId
        );

        if (exists && activityType !== 'UI_CLICK') {
            console.warn("Activity already logged:", activityType, itemId);
            return { success: false, message: 'Already logged' };
        }

        const log = {
            id: Date.now(),
            userId,
            courseId,
            activityType,
            itemId,
            timestamp: new Date().toISOString(),
            meta
        };

        logs.push(log);
        this.saveData(this.tables.activity_logs, logs);

        // SYNC TO SERVER (Fire and Forget)
        fetch('http://localhost:5000/api/activity', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(log)
        }).catch(err => console.error("Failed to save activity to server", err));

        // Trigger Progress Recalculation
        if (activityType !== 'UI_CLICK') {
            return this.recalculateProgress(userId, courseId);
        }

        return { success: true };
    }

    recalculateProgress(userId, courseId) {
        const logs = this.getData(this.tables.activity_logs);
        const courseLogs = logs.filter(l => l.userId === userId && l.courseId == courseId);

        // Define Weights for Progress Calculation
        // Total should ideally be 100%, but we'll cap it.
        // Simplified Model:
        // - Each Video: 5%
        // - Each Assignment: 15%
        // - Each Test: 20%

        let rawProgress = 0;

        courseLogs.forEach(log => {
            switch (log.activityType) {
                case 'VIDEO_COMPLETE': rawProgress += 5; break;
                case 'ASSIGNMENT_SUBMIT': rawProgress += 15; break;
                case 'TEST_PASS': rawProgress += 20; break;
            }
        });

        const newProgress = Math.min(Math.round(rawProgress), 100);

        // Update Enrollment Table
        let enrollments = this.getData(this.tables.enrollments);
        const index = enrollments.findIndex(e => e.userId === userId && e.courseId == courseId);

        if (index !== -1) {
            enrollments[index].progress = newProgress;
            if (newProgress === 100) enrollments[index].status = 'completed';
            this.saveData(this.tables.enrollments, enrollments);
            return { success: true, newProgress };
        }

        return { success: false };
    }

    // Deprecated: Use logActivity instead for detailed tracking
    updateEnrollmentProgress(userId, courseId, progressIncrement) {
        // Fallback to legacy method if simple increment is needed
        // Ideally we map this to a generic 'MANUAL_ADJUSTMENT' activity
        return this.logActivity(userId, courseId, 'MANUAL_ADJUSTMENT', Date.now(), { increment: progressIncrement });
    }

    getEnrollment(userId, courseId) {
        const enrollments = this.getData(this.tables.enrollments);
        return enrollments.find(e => e.userId === userId && e.courseId == courseId);
    }

    getRecentActivity(userId, limit = 5) {
        const logs = this.getData(this.tables.activity_logs);
        const courses = this.getAllCourses();

        return logs
            .filter(log => log.userId === userId)
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) // Newest first
            .slice(0, limit)
            .map(log => {
                const course = courses.find(c => c.id == log.courseId);
                const courseTitle = course ? course.title : 'Unknown Course';

                let title = '';
                let icon = '';
                let typeClass = '';
                let gain = '';

                switch (log.activityType) {
                    case 'VIDEO_COMPLETE':
                        title = `Completed Video in ${courseTitle}`;
                        icon = '✓';
                        typeClass = 'completed';
                        gain = '+5%';
                        break;
                    case 'ASSIGNMENT_SUBMIT':
                        title = `Submitted Assignment in ${courseTitle}`;
                        icon = '📝';
                        typeClass = 'assignment';
                        gain = '+15%';
                        break;
                    case 'TEST_PASS':
                        title = `Passed Test in ${courseTitle}`;
                        icon = '🏆';
                        typeClass = 'completed';
                        gain = '+20%';
                        break;
                    case 'COURSE_ACCESS':
                        title = `Resumed Learning: ${courseTitle}`;
                        icon = '📚';
                        typeClass = 'started';
                        gain = '';
                        break;
                    case 'LESSON_VIEW':
                        title = `Studying: ${log.meta ? log.meta.title : 'Lesson'}`;
                        icon = '👀';
                        typeClass = 'started';
                        gain = '';
                        break;
                    case 'UI_CLICK':
                        // Only show significant UI clicks if needed, or skip
                        // For now we skip generic clicks to keep dashboard clean
                        // return null; // Logic needs filter mapping
                        title = `Interacted with ${courseTitle}`;
                        icon = 'point_of_sale'; // material icon text
                        // actually we use text icons here or classes. 
                        // The UI uses valid unicode or font awesome classes?
                        // The UI code uses `icon` inside a `<i>` class? NO.
                        // The UI code puts `icon` in `${icon}`. 
                        // In getRecentActivity source: `icon = '✓';` or `icon = '📝'`.
                        // These are EMOJIS.
                        icon = '🖱️';
                        gain = '';
                        break;
                    default:
                        title = `Activity in ${courseTitle}`;
                        icon = '•';
                        typeClass = 'started';
                        gain = '';
                }

                return {
                    ...log,
                    displayTitle: title,
                    displayIcon: icon,
                    typeClass: typeClass,
                    progressGain: gain,
                    timeAgo: this.timeSince(new Date(log.timestamp))
                };
            }).filter(item => item && item.activityType !== 'UI_CLICK'); // Filter out noisy generic clicks from main widget
    }

    getUserStats(userId) {
        const logs = this.getData(this.tables.activity_logs);
        const userLogs = logs.filter(l => l.userId === userId);

        const lessonsCompleted = userLogs.filter(l => l.activityType === 'VIDEO_COMPLETE').length;
        const assignmentsSubmitted = userLogs.filter(l => l.activityType === 'ASSIGNMENT_SUBMIT').length;
        const quizzesTaken = userLogs.filter(l => l.activityType === 'TEST_PASS').length;

        // Calculate Average Score from Tests
        const testLogs = userLogs.filter(l => l.activityType === 'TEST_PASS' && l.meta && l.meta.score);
        let averageScore = 0;
        if (testLogs.length > 0) {
            const totalScore = testLogs.reduce((sum, log) => sum + log.meta.score, 0);
            averageScore = Math.round(totalScore / testLogs.length);
        }

        // Estimate Hours Learned (Visual Approximation: 20 mins per lesson + 1 hour per assignment)
        const hoursLearned = Math.round((lessonsCompleted * 20 / 60) + (assignmentsSubmitted * 1) + (quizzesTaken * 0.5));

        return {
            lessonsCompleted,
            assignmentsSubmitted,
            quizzesTaken,
            averageScore: averageScore ? `${averageScore}%` : 'N/A',
            hoursLearned
        };
    }

    getCourseStats(userId, courseId) {
        const logs = this.getData(this.tables.activity_logs);
        const courseLogs = logs.filter(l => l.userId === userId && l.courseId == courseId);

        return {
            videos: courseLogs.filter(l => l.activityType === 'VIDEO_COMPLETE').length,
            assignments: courseLogs.filter(l => l.activityType === 'ASSIGNMENT_SUBMIT').length,
            tests: courseLogs.filter(l => l.activityType === 'TEST_PASS').length,
            lastActivity: courseLogs.length > 0
                ? this.timeSince(new Date(Math.max(...courseLogs.map(l => new Date(l.timestamp)))))
                : 'Never'
        };
    }

    timeSince(date) {
        const seconds = Math.floor((new Date() - date) / 1000);
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + " years ago";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + " months ago";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + " days ago";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + " hours ago";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + " minutes ago";
        return Math.floor(seconds) + " seconds ago";
    }
    getCompletedItems(userId, courseId, activityType) {
        const logs = this.getData(this.tables.activity_logs);
        return logs
            .filter(l => l.userId === userId && l.courseId == courseId && l.activityType === activityType)
            .map(l => l.itemId);
    }

    // --- CONTENT MANAGEMENT (INSTRUCTOR PORTAL) ---

    // 1. Curriculum
    getCourseCurriculum(courseId) {
        const allCurriculum = this.getData(this.tables.curriculum);
        const courseCurr = allCurriculum.find(c => c.courseId == courseId);
        return courseCurr ? courseCurr.modules : [];
    }

    addLesson(courseId, moduleTitle, lesson) {
        let allCurriculum = this.getData(this.tables.curriculum);
        let courseIndex = allCurriculum.findIndex(c => c.courseId == courseId);

        if (courseIndex === -1) {
            allCurriculum.push({ courseId: courseId, modules: [] });
            courseIndex = allCurriculum.length - 1;
        }

        let modules = allCurriculum[courseIndex].modules;
        let moduleIndex = modules.findIndex(m => m.title === moduleTitle);

        if (moduleIndex === -1) {
            modules.push({ title: moduleTitle, lessons: [] });
            moduleIndex = modules.length - 1;
        }

        if (!lesson.id) lesson.id = Date.now();
        modules[moduleIndex].lessons.push(lesson);

        allCurriculum[courseIndex].modules = modules;
        this.saveData(this.tables.curriculum, allCurriculum);
        return { success: true, message: 'Lesson added successfully' };
    }

    // 2. Assignments
    getCourseAssignments(courseId) {
        const allAssignments = this.getData(this.tables.assignments);
        const courseAssig = allAssignments.find(a => a.courseId == courseId);
        return courseAssig ? courseAssig.items : [];
    }

    addAssignment(courseId, assignment) {
        let allAssignments = this.getData(this.tables.assignments);
        let courseIndex = allAssignments.findIndex(a => a.courseId == courseId);

        if (courseIndex === -1) {
            allAssignments.push({ courseId: courseId, items: [] });
            courseIndex = allAssignments.length - 1;
        }

        if (!assignment.id) assignment.id = 'assign_' + Date.now();
        if (!assignment.status) assignment.status = 'pending';

        allAssignments[courseIndex].items.push(assignment);
        this.saveData(this.tables.assignments, allAssignments);
        return { success: true, message: 'Assignment added successfully' };
    }

    // 3. Tests
    getCourseTest(courseId) {
        const allTests = this.getData(this.tables.tests);
        return allTests.find(t => t.courseId == courseId);
    }

    addTestQuestion(courseId, question) {
        let allTests = this.getData(this.tables.tests);
        let testIndex = allTests.findIndex(t => t.courseId == courseId);

        if (testIndex === -1) {
            allTests.push({
                courseId: courseId,
                title: "Course Assessment",
                duration: "15 mins",
                passScore: 70,
                questions: []
            });
            testIndex = allTests.length - 1;
        }

        if (!question.id) question.id = Date.now();
        allTests[testIndex].questions.push(question);

        this.saveData(this.tables.tests, allTests);
        return { success: true, message: 'Question added successfully' };
    }

    // --- DELETE METHODS ---
    deleteAssignment(courseId, assignmentId) {
        let allAssignments = this.getData(this.tables.assignments);
        let courseIndex = allAssignments.findIndex(a => a.courseId == courseId);

        if (courseIndex !== -1) {
            allAssignments[courseIndex].items = allAssignments[courseIndex].items.filter(a => a.id !== assignmentId);
            this.saveData(this.tables.assignments, allAssignments);
            return { success: true };
        }
        return { success: false };
    }

    deleteTestQuestion(courseId, questionIndex) {
        // Deleting by index for simplicity as questions might not have stable IDs in legacy data
        // But for new questions we add IDs. Let's support index removal which is easier for the UI list
        let allTests = this.getData(this.tables.tests);
        let testIndex = allTests.findIndex(t => t.courseId == courseId);

        if (testIndex !== -1) {
            allTests[testIndex].questions.splice(questionIndex, 1);
            this.saveData(this.tables.tests, allTests);
            return { success: true };
        }
        return { success: false };
    }

    deleteLesson(courseId, lessonId) {
        let allCurriculum = this.getData(this.tables.curriculum);
        let courseIndex = allCurriculum.findIndex(c => c.courseId == courseId);

        if (courseIndex !== -1) {
            let modules = allCurriculum[courseIndex].modules;
            for (let i = 0; i < modules.length; i++) {
                const initialLength = modules[i].lessons.length;
                modules[i].lessons = modules[i].lessons.filter(l => l.id != lessonId); // fuzzy match for ID if string/int mix

                if (modules[i].lessons.length < initialLength) {
                    // Found and deleted
                    this.saveData(this.tables.curriculum, allCurriculum);
                    return { success: true };
                }
            }
        }
        return { success: false, message: 'Lesson not found' };
    }
}

const db = new MockDatabase();
