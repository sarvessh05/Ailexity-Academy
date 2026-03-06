-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES (Users)
create table public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  full_name text,
  role text default 'student',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. COURSES (Catalog)
create table public.courses (
  id text primary key, -- Keeping text IDs '1', '2' for compatibility with existing path params
  title text not null,
  description text,
  thumbnail text,
  price numeric,
  category text,
  created_at timestamp with time zone default now()
);

-- 3. ENROLLMENTS
create table public.enrollments (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id),
  course_id text references public.courses(id),
  enrolled_at timestamp with time zone default now(),
  progress integer default 0,
  completed_lessons text[], -- Array of lesson IDs
  status text default 'active', -- 'active', 'completed'
  last_accessed timestamp with time zone
);

-- 4. MODULES & LESSONS (Curriculum)
-- We can simplify by just using a lessons table with module_name, or normalize.
-- For simplicity and migration speed:
create table public.lessons (
  id text primary key, -- e.g., '101', '201' or UUID
  course_id text references public.courses(id),
  module_name text,
  title text,
  duration text,
  video_id text, -- YouTube ID
  description text,
  created_at timestamp with time zone default now()
);

-- 5. ASSIGNMENTS
create table public.assignments (
  id text primary key, -- e.g. 'assign_123'
  course_id text references public.courses(id),
  title text,
  description text,
  due_date text, -- Storing as text 'Tomorrow' or proper date
  badge text, -- 'badge-urgent'
  status text default 'pending', -- 'pending', 'submitted', 'graded'
  created_at timestamp with time zone default now()
);

-- 6. TEST QUESTIONS
create table public.test_questions (
  id serial primary key,
  course_id text references public.courses(id),
  text text,
  options text[], -- Array of strings
  correct_index integer,
  created_at timestamp with time zone default now()
);

-- 7. ACTIVITIES (Logs)
create table public.activities (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id),
  course_id text, -- Can be null or ref
  type text, -- 'enroll', 'video_complete', 'assignment_submit', 'test_pass'
  title text,
  progress_gain integer,
  created_at timestamp with time zone default now()
);

-- SECURITY POLICIES (RLS)
alter table public.profiles enable row level security;
alter table public.enrollments enable row level security;
alter table public.activities enable row level security;

-- Policy: Users can view their own profile
create policy "Users can view own profile"
  on public.profiles for select
  using ( auth.uid() = id );

-- Policy: Users can update their own profile
create policy "Users can update own profile"
  on public.profiles for update
  using ( auth.uid() = id );

-- Policy: Users can view their own enrollments
create policy "Users can view own enrollments"
  on public.enrollments for select
  using ( auth.uid() = user_id );

-- Policy: Users can insert their own enrollments
create policy "Users can insert own enrollments"
  on public.enrollments for insert
  with check ( auth.uid() = user_id );
  
-- Policy: Users can update their own enrollments
create policy "Users can update own enrollments"
  on public.enrollments for update
  using ( auth.uid() = user_id );

-- Policy: Everyone can view courses (Public)
alter table public.courses enable row level security;
create policy "Public courses"
  on public.courses for select
  to authenticated, anon
  using ( true );

-- Policy: Everyone can view lessons (Public)
alter table public.lessons enable row level security;
create policy "Public lessons"
  on public.lessons for select
  to authenticated, anon
  using ( true );

-- Policy: Everyone can view assignments (Public)
alter table public.assignments enable row level security;
create policy "Public assignments"
  on public.assignments for select
  to authenticated, anon
  using ( true );

-- Policy: Everyone can view test questions (Public)
alter table public.test_questions enable row level security;
create policy "Public test questions"
  on public.test_questions for select
  to authenticated, anon
  using ( true );

-- Policy: Users can view/insert their own activities
create policy "Users can interact with own activities"
  on public.activities for all
  using ( auth.uid() = user_id );
