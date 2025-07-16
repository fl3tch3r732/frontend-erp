import React from 'react';
import { 
  Users, 
  Calendar, 
  Building, 
  Monitor, 
  BookOpen, 
  Clock,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import DashboardCard from './DashboardCard';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    { title: 'Étudiants actifs', value: '2,847', icon: Users, color: 'blue' as const, trend: { value: 12, isPositive: true } },
    { title: 'Enseignants', value: '156', icon: Users, color: 'green' as const, trend: { value: 5, isPositive: true } },
    { title: 'Salles disponibles', value: '45', icon: Building, color: 'purple' as const, trend: { value: -2, isPositive: false } },
    { title: 'Équipements', value: '892', icon: Monitor, color: 'indigo' as const, trend: { value: 8, isPositive: true } },
    { title: 'Cours aujourd\'hui', value: '124', icon: Calendar, color: 'yellow' as const },
    { title: 'Ressources biblio', value: '15,420', icon: BookOpen, color: 'red' as const, trend: { value: 15, isPositive: true } },
  ];

  const recentActivities = [
    {
      id: 1,
      user: 'Dr. Mballa Jean',
      action: 'a réservé la salle A101',
      time: 'Il y a 2 minutes',
      type: 'reservation'
    },
    {
      id: 2,
      user: 'Étudiant Kamdem Paul',
      action: 'a emprunté un équipement',
      time: 'Il y a 5 minutes',
      type: 'equipment'
    },
    {
      id: 3,
      user: 'Prof. Nga Marie',
      action: 'a mis à jour son emploi du temps',
      time: 'Il y a 10 minutes',
      type: 'schedule'
    },
    {
      id: 4,
      user: 'Admin Système',
      action: 'a ajouté 3 nouveaux étudiants',
      time: 'Il y a 15 minutes',
      type: 'user'
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Réunion pédagogique',
      time: '14:30',
      room: 'Salle C201',
      type: 'meeting'
    },
    {
      id: 2,
      title: 'Cours de Programmation Web',
      time: '15:00',
      room: 'Labo Info A',
      type: 'course'
    },
    {
      id: 3,
      title: 'Maintenance équipements',
      time: '16:30',
      room: 'Atelier',
      type: 'maintenance'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Bienvenue, {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-blue-100">
              Tableau de bord - {user?.role === 'admin' ? 'Administrateur' : user?.role === 'teacher' ? 'Enseignant' : 'Étudiant'}
            </p>
          </div>
          <div className="text-right">
            <p className="text-blue-100 text-sm">Dernière connexion</p>
            <p className="text-white font-semibold">Aujourd'hui, 09:45</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <DashboardCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Activités récentes</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Voir tout
            </button>
          </div>
          
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Clock className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-900">
                    <span className="font-medium">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Prochains événements</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Planning complet
            </button>
          </div>
          
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:border-blue-300 transition-colors">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-slate-900">{event.title}</h4>
                  <p className="text-sm text-slate-600">{event.time} • {event.room}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Actions rapides</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group">
            <Calendar className="w-8 h-8 text-slate-600 group-hover:text-blue-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700">
              Nouveau cours
            </span>
          </button>
          <button className="p-4 border border-slate-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors group">
            <Building className="w-8 h-8 text-slate-600 group-hover:text-green-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-slate-700 group-hover:text-green-700">
              Réserver salle
            </span>
          </button>
          <button className="p-4 border border-slate-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors group">
            <Monitor className="w-8 h-8 text-slate-600 group-hover:text-purple-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-slate-700 group-hover:text-purple-700">
              Équipement
            </span>
          </button>
          <button className="p-4 border border-slate-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors group">
            <AlertCircle className="w-8 h-8 text-slate-600 group-hover:text-red-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-slate-700 group-hover:text-red-700">
              Signaler problème
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;