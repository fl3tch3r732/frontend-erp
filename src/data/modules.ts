import { Module } from '../types';

export const modules: Module[] = [
  {
    id: 'timetable',
    name: 'Gestion des Emplois du Temps',
    icon: 'calendar',
    description: 'Planification et organisation des cours et des horaires académiques.',
    path: '/modules/timetable',
  },
  {
    id: 'courses',
    name: 'Gestion des Cours',
    icon: 'book-open',
    description: 'Création et gestion des cours et des programmes académiques.',
    path: '/modules/courses',
  },
  {
    id: 'equipment',
    name: 'Gestion des Équipements',
    icon: 'laptop',
    description: 'Inventaire et maintenance des équipements de l\'université.',
    path: '/modules/equipment',
  },
  {
    id: 'classrooms',
    name: 'Gestion des Salles',
    icon: 'building-2',
    description: 'Allocation et suivi des salles de cours et amphithéâtres.',
    path: '/modules/classrooms',
  },
  {
    id: 'teachers',
    name: 'Gestion des Enseignants',
    icon: 'users',
    description: 'Informations et planning des enseignants et du personnel académique.',
    path: '/modules/teachers',
  },
  {
    id: 'library',
    name: 'Gestion des Bibliothèques',
    icon: 'book-open',
    description: 'Catalogue et prêt d\'ouvrages de la bibliothèque universitaire.',
    path: '/modules/library',
  },
  {
    id: 'finance',
    name: 'Gestion des Finances',
    icon: 'wallet',
    description: 'Suivi des transactions financières et des budgets départementaux.',
    path: '/modules/finance',
  },
  {
    id: 'exams',
    name: 'Gestion des Examens',
    icon: 'file-text',
    description: 'Organisation et résultats des examens et évaluations.',
    path: '/modules/exams',
  },
];