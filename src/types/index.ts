// User Types
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'teacher' | 'student';
  department?: string;
  avatar?: string;
}

// Authentication Types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  role: string | null;
}

// Module Types
export interface Module {
  id: string;
  name: string;
  icon: string;
  description: string;
  path: string;
}

// Timetable Types
export interface TimeSlot {
  id: number;
  title: string;
  start_time: string;
  end_time: string;
  classroom_id: number;
  teacher_id: number;
  course_id: number;
  color?: string;
  course_name?: string;
  teacher_name?: string;
  classroom_name?: string;
  created_at?: string;
}

export interface Classroom {
  id: number;
  name: string;
  capacity: number;
  building: string;
  floor: number;
  hasProjector: boolean;
  hasComputers: boolean;
  isLab: boolean;
}

export interface Teacher {
  id: number;
  name: string;
  email: string;
  department: string;
  specialization: string;
  availableDays: string[];
}

export interface Course {
  id: number;
  name: string;
  code: string;
  department: string;
  credits: number;
  hoursPerWeek: number;
}

// Equipment Types
export interface Equipment {
  id: number;
  name: string;
  type: string;
  serialNumber: string;
  purchaseDate: string;
  lastMaintenance?: string;
  status: 'available' | 'in-use' | 'maintenance' | 'broken';
  assignedTo?: number;
  location: string;
}

// Library Types
export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publisher: string;
  publicationYear: number;
  copies: number;
  availableCopies: number;
  category: string;
  location: string;
}

// Finance Types
export interface Transaction {
  id: number;
  date: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description: string;
  paymentMethod: string;
  reference: string;
}

// Exam Types
export interface Exam {
  id: number;
  courseId: number;
  date: string;
  startTime: string;
  endTime: string;
  roomId: number;
  supervisors: number[];
  type: 'midterm' | 'final' | 'quiz';
  maxScore: number;
}

export interface ExamResult {
  id: number;
  examId: number;
  studentId: number;
  score: number;
  grade: string;
  comments?: string;
}