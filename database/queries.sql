-- QUERIES AND LOGIC TRANSFER
-- These queries represent the logic previously held in js/supabase-db.js

-- 1. ENROLL USER
-- Check if enrolled
SELECT * FROM public.enrollments WHERE user_id = $1 AND course_id = $2;
-- Insert Enrollment
INSERT INTO public.enrollments (user_id, course_id, progress, completed_lessons, status)
VALUES ($1, $2, 0, ARRAY[]::text[], 'active');
-- Log Activity
INSERT INTO public.activities (user_id, type, title, progress_gain)
VALUES ($1, 'enroll', 'Enrolled in Course ' || $2, 0);

-- 2. GET USER ENROLLMENTS (Dashboard)
SELECT 
  e.*,
  c.title as course_title,
  c.thumbnail as course_thumbnail
FROM public.enrollments e
JOIN public.courses c ON e.course_id = c.id
WHERE e.user_id = $1;

-- 3. GET COURSE CURRICULUM
SELECT * FROM public.lessons 
WHERE course_id = $1 
ORDER BY created_at ASC;

-- 4. UPDATE PROGRESS (Complete Lesson)
-- Fetch current
SELECT completed_lessons, progress FROM public.enrollments WHERE user_id = $1 AND course_id = $2;
-- Update (Logic: Append lesson ID to array, calc new progress)
UPDATE public.enrollments 
SET 
  completed_lessons = array_append(completed_lessons, $3),
  progress = $4, -- Calculated in app: (completed_count / total_lessons) * 100
  last_accessed = now()
WHERE user_id = $1 AND course_id = $2;

-- 5. LOG ACTIVITY
INSERT INTO public.activities (user_id, course_id, type, title, progress_gain)
VALUES ($1, $2, $3, $4, $5);
