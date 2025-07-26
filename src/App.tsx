import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import TimetablePage from './pages/modules/TimetablePage';
import EquipmentPage from './pages/modules/EquipmentPage';
import CoursesPage from './pages/modules/CoursesPage';
import ClassesPage from './pages/modules/ClassesPage';
import TeachersPage from './pages/modules/TeachersPage';

// Protected route component
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/modules/timetable"
            element={
              <ProtectedRoute>
                <TimetablePage />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/modules/equipment"
            element={
              <ProtectedRoute>
                <EquipmentPage />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/modules/courses"
            element={
              <ProtectedRoute>
                <CoursesPage />
              </ProtectedRoute>
            }
          />
          
          {/* Add placeholder routes for other modules */}
          <Route
            path="/modules/classrooms"
            element={
              <ProtectedRoute>
                <ClassesPage />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/modules/teachers"
            element={
              <ProtectedRoute>
                <TeachersPage />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/modules/library"
            element={
              <ProtectedRoute>
                <DashboardLayout title="Gestion des Bibliothèques">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Module en développement</h2>
                    <p>Le module de gestion des bibliothèques sera bientôt disponible.</p>
                  </div>
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/modules/finance"
            element={
              <ProtectedRoute>
                <DashboardLayout title="Gestion des Finances">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Module en développement</h2>
                    <p>Le module de gestion des finances sera bientôt disponible.</p>
                  </div>
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/modules/exams"
            element={
              <ProtectedRoute>
                <DashboardLayout title="Gestion des Examens">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Module en développement</h2>
                    <p>Le module de gestion des examens sera bientôt disponible.</p>
                  </div>
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

// Add DashboardLayout component for placeholder routes
function DashboardLayout({ children, title }: { children: React.ReactNode, title: string }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-primary-700 text-white shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="28" 
                height="28" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-white"
              >
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
              </svg>
              <span className="text-xl font-bold">IUT Douala ERP</span>
            </div>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">{title}</h1>
        {children}
      </div>
    </div>
  );
}

export default App;