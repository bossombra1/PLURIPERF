-- PLURIPERF database schema (SQLite)
-- Schema is idempotent so existing databases can be upgraded safely.

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'student'
    CHECK (role IN ('student','teacher','advisor','editor','admin','super_admin')),
  student_ref TEXT UNIQUE,
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS password_resets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  used_at TEXT
);

CREATE TABLE IF NOT EXISTS faculties (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  name_fr TEXT NOT NULL,
  name_en TEXT NOT NULL,
  dean TEXT NOT NULL,
  description_fr TEXT NOT NULL,
  description_en TEXT NOT NULL,
  key_themes_fr TEXT NOT NULL DEFAULT '[]',
  key_themes_en TEXT NOT NULL DEFAULT '[]',
  degrees_count INTEGER NOT NULL DEFAULT 0,
  highlighted_program_fr TEXT,
  highlighted_program_en TEXT
);

CREATE TABLE IF NOT EXISTS programs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  faculty_id INTEGER NOT NULL REFERENCES faculties(id),
  title_fr TEXT NOT NULL,
  title_en TEXT NOT NULL,
  level TEXT NOT NULL,
  duration_fr TEXT NOT NULL,
  duration_en TEXT NOT NULL,
  modality TEXT NOT NULL,
  ects INTEGER NOT NULL,
  description_fr TEXT NOT NULL,
  description_en TEXT NOT NULL,
  career_outcomes_fr TEXT NOT NULL DEFAULT '[]',
  career_outcomes_en TEXT NOT NULL DEFAULT '[]'
);

CREATE TABLE IF NOT EXISTS applications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  reference TEXT NOT NULL UNIQUE,
  user_id INTEGER REFERENCES users(id),
  program TEXT NOT NULL,
  level TEXT NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country TEXT NOT NULL,
  current_diploma TEXT NOT NULL,
  motivation TEXT,
  need_scholarship INTEGER NOT NULL DEFAULT 0,
  cv_path TEXT,
  cv_original_name TEXT,
  status TEXT NOT NULL DEFAULT 'submitted'
    CHECK (status IN ('submitted','under_review','accepted','rejected','waitlisted')),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS appointments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER REFERENCES users(id),
  advisor_id INTEGER REFERENCES users(id),
  date TEXT NOT NULL,
  time_slot TEXT NOT NULL,
  reason TEXT NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending','confirmed','cancelled','completed')),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE UNIQUE INDEX IF NOT EXISTS uq_active_appointment_slot
  ON appointments(date, time_slot) WHERE status != 'cancelled';

CREATE TABLE IF NOT EXISTS advisor_availability (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  advisor_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date TEXT NOT NULL,
  time_slot TEXT NOT NULL,
  available INTEGER NOT NULL DEFAULT 1,
  UNIQUE(advisor_id, date, time_slot)
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  campus TEXT NOT NULL DEFAULT 'paris',
  handled INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS advisory_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  reference TEXT NOT NULL UNIQUE,
  service TEXT NOT NULL,
  company TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  employees TEXT,
  message TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS news (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  title_fr TEXT NOT NULL,
  title_en TEXT NOT NULL,
  date TEXT NOT NULL,
  read_time TEXT NOT NULL DEFAULT '3 min',
  summary_fr TEXT NOT NULL,
  summary_en TEXT NOT NULL,
  content_fr TEXT NOT NULL,
  content_en TEXT NOT NULL,
  featured INTEGER NOT NULL DEFAULT 0,
  published INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS library_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL,
  title_fr TEXT NOT NULL,
  title_en TEXT NOT NULL,
  author TEXT NOT NULL,
  year INTEGER NOT NULL,
  category_fr TEXT NOT NULL,
  category_en TEXT NOT NULL,
  file_size_or_duration TEXT,
  read_time TEXT,
  downloads_count INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS research_projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title_fr TEXT NOT NULL,
  title_en TEXT NOT NULL,
  center_fr TEXT NOT NULL,
  center_en TEXT NOT NULL,
  lead_researcher TEXT NOT NULL,
  status TEXT NOT NULL,
  year INTEGER NOT NULL,
  abstract_fr TEXT NOT NULL,
  abstract_en TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS courses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT NOT NULL UNIQUE,
  title_fr TEXT NOT NULL,
  title_en TEXT NOT NULL,
  ects INTEGER NOT NULL,
  semester TEXT NOT NULL,
  program TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS enrollments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id),
  course_id INTEGER NOT NULL REFERENCES courses(id),
  progress INTEGER NOT NULL DEFAULT 0,
  grade REAL,
  UNIQUE (user_id, course_id)
);

CREATE TABLE IF NOT EXISTS assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  course_id INTEGER NOT NULL REFERENCES courses(id),
  title_fr TEXT NOT NULL,
  title_en TEXT NOT NULL,
  due_date TEXT NOT NULL,
  description TEXT
);

CREATE TABLE IF NOT EXISTS submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  assignment_id INTEGER NOT NULL REFERENCES assignments(id),
  user_id INTEGER NOT NULL REFERENCES users(id),
  file_path TEXT,
  submitted_at TEXT NOT NULL DEFAULT (datetime('now')),
  grade REAL,
  feedback TEXT,
  UNIQUE (assignment_id, user_id)
);

CREATE TABLE IF NOT EXISTS forum_topics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER REFERENCES users(id),
  title TEXT NOT NULL,
  body TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sender_id INTEGER NOT NULL REFERENCES users(id),
  recipient_id INTEGER NOT NULL REFERENCES users(id),
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  read_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS notifications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id),
  type TEXT NOT NULL,
  payload_fr TEXT NOT NULL,
  payload_en TEXT NOT NULL,
  read_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_applications_user ON applications(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_user ON appointments(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_recipient ON messages(recipient_id);
CREATE INDEX IF NOT EXISTS idx_advisor_availability ON advisor_availability(date, time_slot, available);
