import { 
  TimeSlot, 
  Classroom, 
  Teacher, 
  Course, 
  Equipment, 
  Book, 
  Transaction, 
  Exam 
} from '../types';

// Mock data for timetable module
export const timeSlots: TimeSlot[] = [
  {
    id: 1,
    title: 'Introduction à la Programmation',
    start: '2025-04-15T08:00:00',
    end: '2025-04-15T10:00:00',
    classroomId: 1,
    teacherId: 1,
    courseId: 1,
    color: '#0ea5e9',
  },
  {
    id: 2,
    title: 'Analyse Mathématique',
    start: '2025-04-15T10:30:00',
    end: '2025-04-15T12:30:00',
    classroomId: 2,
    teacherId: 2,
    courseId: 2,
    color: '#f97316',
  },
  {
    id: 3,
    title: 'Réseaux Informatiques',
    start: '2025-04-16T08:00:00',
    end: '2025-04-16T11:00:00',
    classroomId: 3,
    teacherId: 3,
    courseId: 3,
    color: '#22c55e',
  },
];

export const classrooms: Classroom[] = [
  {
    id: 1,
    name: 'Salle 101',
    capacity: 60,
    building: 'Bloc A',
    floor: 1,
    hasProjector: true,
    hasComputers: false,
    isLab: false,
  },
  {
    id: 2,
    name: 'Salle 102',
    capacity: 40,
    building: 'Bloc A',
    floor: 1,
    hasProjector: true,
    hasComputers: false,
    isLab: false,
  },
  {
    id: 3,
    name: 'Laboratoire Info 1',
    capacity: 30,
    building: 'Bloc B',
    floor: 2,
    hasProjector: true,
    hasComputers: true,
    isLab: true,
  },
];

export const teachers: Teacher[] = [
  {
    id: 1,
    name: 'Dr. Kamga Robert',
    email: 'rkamga@iutdouala.cm',
    department: 'Informatique',
    specialization: 'Programmation',
    availableDays: ['Monday', 'Tuesday', 'Wednesday'],
  },
  {
    id: 2,
    name: 'Prof. Mbarga Jeanne',
    email: 'jmbarga@iutdouala.cm',
    department: 'Mathématiques',
    specialization: 'Analyse',
    availableDays: ['Monday', 'Thursday', 'Friday'],
  },
  {
    id: 3,
    name: 'Dr. Fouda Paul',
    email: 'pfouda@iutdouala.cm',
    department: 'Informatique',
    specialization: 'Réseaux',
    availableDays: ['Tuesday', 'Wednesday', 'Friday'],
  },
];

export const courses: Course[] = [
  {
    id: 1,
    name: 'Introduction à la Programmation',
    code: 'INFO101',
    department: 'Informatique',
    credits: 4,
    hoursPerWeek: 4,
  },
  {
    id: 2,
    name: 'Analyse Mathématique',
    code: 'MATH101',
    department: 'Mathématiques',
    credits: 3,
    hoursPerWeek: 3,
  },
  {
    id: 3,
    name: 'Réseaux Informatiques',
    code: 'INFO305',
    department: 'Informatique',
    credits: 5,
    hoursPerWeek: 5,
  },
];

// Mock data for equipment module
export const equipments: Equipment[] = [
  {
    id: 1,
    name: 'Projecteur Epson EB-X41',
    type: 'Projecteur',
    serialNumber: 'EP2023001',
    purchaseDate: '2023-01-15',
    lastMaintenance: '2024-01-15',
    status: 'available',
    location: 'Magasin Principal',
  },
  {
    id: 2,
    name: 'Ordinateur HP EliteDesk',
    type: 'Ordinateur',
    serialNumber: 'HP2023045',
    purchaseDate: '2023-03-22',
    status: 'in-use',
    assignedTo: 1,
    location: 'Laboratoire Info 1',
  },
  {
    id: 3,
    name: 'Imprimante Canon MG3650',
    type: 'Imprimante',
    serialNumber: 'CN2022089',
    purchaseDate: '2022-11-05',
    lastMaintenance: '2024-02-10',
    status: 'maintenance',
    location: 'Service Technique',
  },
];

// Mock data for library module
export const books: Book[] = [
  {
    id: 1,
    title: 'Introduction aux Algorithmes',
    author: 'Thomas H. Cormen',
    isbn: '978-0262033848',
    publisher: 'MIT Press',
    publicationYear: 2009,
    copies: 5,
    availableCopies: 3,
    category: 'Informatique',
    location: 'Section A, Étagère 3',
  },
  {
    id: 2,
    title: 'Analyse Mathématique, Tome 1',
    author: 'Jean Dieudonné',
    isbn: '978-2040162368',
    publisher: 'Dunod',
    publicationYear: 1991,
    copies: 4,
    availableCopies: 2,
    category: 'Mathématiques',
    location: 'Section B, Étagère 1',
  },
  {
    id: 3,
    title: 'Les Réseaux Informatiques',
    author: 'Claude Servin',
    isbn: '978-2409029325',
    publisher: 'ENI',
    publicationYear: 2020,
    copies: 3,
    availableCopies: 1,
    category: 'Informatique',
    location: 'Section A, Étagère 5',
  },
];

// Mock data for finance module
export const transactions: Transaction[] = [
  {
    id: 1,
    date: '2025-01-05',
    amount: 50000,
    type: 'income',
    category: 'Frais de scolarité',
    description: 'Paiement étudiant ID 2024-001',
    paymentMethod: 'Mobile Money',
    reference: 'PAY-2025-001',
  },
  {
    id: 2,
    date: '2025-01-10',
    amount: 15000,
    type: 'expense',
    category: 'Fournitures',
    description: 'Achat matériel bureautique',
    paymentMethod: 'Carte bancaire',
    reference: 'EXP-2025-001',
  },
  {
    id: 3,
    date: '2025-01-15',
    amount: 75000,
    type: 'income',
    category: 'Frais de scolarité',
    description: 'Paiement étudiant ID 2024-002',
    paymentMethod: 'Virement bancaire',
    reference: 'PAY-2025-002',
  },
];

// Mock data for exam module
export const exams: Exam[] = [
  {
    id: 1,
    courseId: 1,
    date: '2025-06-10',
    startTime: '09:00',
    endTime: '11:00',
    roomId: 1,
    supervisors: [1, 2],
    type: 'final',
    maxScore: 100,
  },
  {
    id: 2,
    courseId: 2,
    date: '2025-06-12',
    startTime: '14:00',
    endTime: '16:00',
    roomId: 2,
    supervisors: [2],
    type: 'final',
    maxScore: 100,
  },
  {
    id: 3,
    courseId: 3,
    date: '2025-04-15',
    startTime: '10:00',
    endTime: '11:00',
    roomId: 3,
    supervisors: [3],
    type: 'midterm',
    maxScore: 50,
  },
];