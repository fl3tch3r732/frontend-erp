import React from 'react';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  Building2, 
  Clock, 
  Activity, 
  Laptop
} from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import StatsCard from '../components/ui/StatsCard';
import { useAuth } from '../context/AuthContext';

// Import for charts
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  
  // Sample data for line chart
  const lineChartData = {
    labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin'],
    datasets: [
      {
        label: 'Taux d\'occupation des salles',
        data: [65, 72, 78, 75, 82, 88],
        borderColor: 'rgb(14, 165, 233)',
        backgroundColor: 'rgba(14, 165, 233, 0.5)',
        tension: 0.3,
      },
    ],
  };
  
  // Sample data for bar chart
  const barChartData = {
    labels: ['Informatique', 'Électronique', 'Mécanique', 'Gestion', 'Génie Civil'],
    datasets: [
      {
        label: 'Nombre d\'étudiants',
        data: [120, 90, 80, 110, 70],
        backgroundColor: 'rgba(249, 115, 22, 0.7)',
      },
    ],
  };
  
  // Sample data for doughnut chart
  const doughnutChartData = {
    labels: ['Disponibles', 'En cours d\'utilisation', 'En maintenance'],
    datasets: [
      {
        data: [65, 25, 10],
        backgroundColor: [
          'rgba(34, 197, 94, 0.7)',
          'rgba(14, 165, 233, 0.7)',
          'rgba(249, 115, 22, 0.7)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  return (
    <DashboardLayout title="Tableau de bord">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Étudiants"
          value="1,245"
          icon={<Users size={24} className="text-primary-600" />}
          trend={{ value: 5.2, isPositive: true }}
        />
        <StatsCard
          title="Enseignants"
          value="42"
          icon={<BookOpen size={24} className="text-secondary-600" />}
          trend={{ value: 2.1, isPositive: true }}
        />
        <StatsCard
          title="Salles"
          value="28"
          icon={<Building2 size={24} className="text-success-600" />}
        />
        <StatsCard
          title="Cours actifs"
          value="156"
          icon={<Calendar size={24} className="text-warning-600" />}
          trend={{ value: 3.8, isPositive: true }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-card">
          <h3 className="text-lg font-semibold mb-4">Taux d'occupation des salles</h3>
          <div className="h-80">
            <Line 
              data={lineChartData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
                scales: {
                  y: {
                    min: 0,
                    max: 100,
                    ticks: {
                      callback: (value) => `${value}%`,
                    },
                  },
                },
              }} 
            />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-card">
          <h3 className="text-lg font-semibold mb-4">Répartition des étudiants par département</h3>
          <div className="h-80">
            <Bar 
              data={barChartData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
              }} 
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-card">
          <h3 className="text-lg font-semibold mb-4">Statut des équipements</h3>
          <div className="h-64 flex items-center justify-center">
            <div className="w-56">
              <Doughnut 
                data={doughnutChartData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                    },
                  },
                }} 
              />
            </div>
          </div>
        </div>
        
        <div className="col-span-1 lg:col-span-2 bg-white p-6 rounded-lg shadow-card">
          <h3 className="text-lg font-semibold mb-4">Activités récentes</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-primary-100 rounded-full">
                <Calendar size={16} className="text-primary-600" />
              </div>
              <div>
                <p className="font-medium">Nouveau cours programmé</p>
                <p className="text-sm text-gray-500">Réseaux Informatiques - Dr. Fouda Paul</p>
                <p className="text-xs text-gray-400">Il y a 20 minutes</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-secondary-100 rounded-full">
                <Laptop size={16} className="text-secondary-600" />
              </div>
              <div>
                <p className="font-medium">Nouvel équipement ajouté</p>
                <p className="text-sm text-gray-500">5 ordinateurs portables - Laboratoire Info 2</p>
                <p className="text-xs text-gray-400">Il y a 2 heures</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-success-100 rounded-full">
                <Clock size={16} className="text-success-600" />
              </div>
              <div>
                <p className="font-medium">Modification d'emploi du temps</p>
                <p className="text-sm text-gray-500">Analyse Mathématique - Salle 102</p>
                <p className="text-xs text-gray-400">Il y a 5 heures</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-warning-100 rounded-full">
                <Activity size={16} className="text-warning-600" />
              </div>
              <div>
                <p className="font-medium">Maintenance équipement terminée</p>
                <p className="text-sm text-gray-500">Projecteur Epson - Salle 101</p>
                <p className="text-xs text-gray-400">Il y a 1 jour</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-card">
        <h3 className="text-lg font-semibold mb-4">Prochains évènements</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Événement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Heure
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lieu
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">Examen Réseaux</div>
                  <div className="text-sm text-gray-500">Informatique</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  15/04/2025
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  10:00 - 11:00
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Laboratoire Info 1
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-success-100 text-success-800">
                    Confirmé
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">Conseil pédagogique</div>
                  <div className="text-sm text-gray-500">Tous départements</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  18/04/2025
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  14:00 - 16:00
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Salle de conférence
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800">
                    En attente
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">Remise des notes</div>
                  <div className="text-sm text-gray-500">Département Mécanique</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  20/04/2025
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  09:00 - 12:00
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Secrétariat
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-warning-100 text-warning-800">
                    Date limite
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;