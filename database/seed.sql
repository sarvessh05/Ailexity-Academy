-- SEED DATA for Ailexity Academy

-- 1. COURSES
INSERT INTO public.courses (id, title, description, thumbnail, price, category) VALUES
('1', 'Machine Learning Fundamentals', 'Learn the core concepts of ML.', 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800', 199, 'Data Science'),
('2', 'Web Development Bootcamp', 'Become a full-stack developer.', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800', 149, 'Programming'),
('3', 'Data Mining & Analysis', 'Extract insights from big data.', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800', 189, 'Data Science');

-- 2. LESSONS
-- Course 1: ML
INSERT INTO public.lessons (id, course_id, module_name, title, duration, video_id, description) VALUES
('101', '1', 'Module 1: Introduction', '1.1 What is Machine Learning?', '12 mins', 'JcI5Vnw0b2c', 'Introduction to ML core concepts.'),
('102', '1', 'Module 1: Introduction', '1.2 Types of ML Algorithms', '15 mins', 'Gv9_4yMHFhI', 'Supervised vs Unsupervised learning explanation.'),
('103', '1', 'Module 1: Introduction', '1.3 Setting up Python Environment', '10 mins', '7wWZ6a_I2b8', 'Installing Anaconda and Jupyter Notebooks.');

-- Course 2: Web Dev
INSERT INTO public.lessons (id, course_id, module_name, title, duration, video_id, description) VALUES
('201', '2', 'Module 1: HTML & CSS Basics', '1.1 HTML5 Crash Course', '15 mins', 'pQN-pnXPaVg', 'Structure of modern web pages.'),
('202', '2', 'Module 1: HTML & CSS Basics', '1.2 CSS3 Styling', '20 mins', '1Rs2ND1ryYc', 'Selectors, box model, and layouts.');

-- Course 3: Data Mining
INSERT INTO public.lessons (id, course_id, module_name, title, duration, video_id, description) VALUES
('301', '3', 'Module 1: Matrix Fundamentals', 'Course Introduction', '4 mins', 'Cx5Z-OslNWE', 'Introduction to 18.065.');

-- 3. ASSIGNMENTS
INSERT INTO public.assignments (id, course_id, title, due_date, badge, description, status) VALUES
('a1', '1', 'Assignment 3: Neural Networks', 'Tomorrow', 'badge-urgent', 'Implement a basic NN.', 'pending'),
('a2', '2', 'Portfolio Project', 'Next Week', 'badge-urgent', 'Build a website.', 'pending');

-- 4. TEST QUESTIONS
-- Course 1
INSERT INTO public.test_questions (course_id, text, options, correct_index) VALUES
('1', 'Which is Supervised Learning?', ARRAY['Clustering', 'Regression', 'Reduction', 'Noise'], 1);
