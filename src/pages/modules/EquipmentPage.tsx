import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { equipments } from '../../data/mockData';
import { Equipment } from '../../types';
import { 
  Plus, 
  Search, 
  QrCode, 
  RefreshCw, 
  Check, 
  AlertCircle, 
  Clock, 
  X 
} from 'lucide-react';

const EquipmentPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  
  const filteredEquipments = equipments.filter(equipment => {
    const matchesSearch = 
      equipment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      equipment.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      equipment.serialNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === null || equipment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <Check size={16} className="text-success-500" />;
      case 'in-use':
        return <Clock size={16} className="text-primary-500" />;
      case 'maintenance':
        return <AlertCircle size={16} className="text-warning-500" />;
      case 'broken':
        return <X size={16} className="text-error-500" />;
      default:
        return null;
    }
  };
  
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'available':
        return 'Disponible';
      case 'in-use':
        return 'En utilisation';
      case 'maintenance':
        return 'En maintenance';
      case 'broken':
        return 'Hors service';
      default:
        return 'Inconnu';
    }
  };
  
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-success-100 text-success-800';
      case 'in-use':
        return 'bg-primary-100 text-primary-800';
      case 'maintenance':
        return 'bg-warning-100 text-warning-800';
      case 'broken':
        return 'bg-error-100 text-error-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const equipmentsByStatus = {
    available: equipments.filter(e => e.status === 'available').length,
    inUse: equipments.filter(e => e.status === 'in-use').length,
    maintenance: equipments.filter(e => e.status === 'maintenance').length,
    broken: equipments.filter(e => e.status === 'broken').length,
  };
  
  return (
    <DashboardLayout title="Gestion des Équipements">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div 
          className={`bg-white rounded-lg shadow-card p-5 border-l-4 border-success-500 ${
            statusFilter === 'available' ? 'ring-2 ring-success-500' : ''
          }`}
          onClick={() => setStatusFilter(statusFilter === 'available' ? null : 'available')}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Disponibles</p>
              <h3 className="text-2xl font-bold text-gray-800">{equipmentsByStatus.available}</h3>
            </div>
            <div className="p-3 rounded-full bg-success-100">
              <Check size={20} className="text-success-600" />
            </div>
          </div>
        </div>
        
        <div 
          className={`bg-white rounded-lg shadow-card p-5 border-l-4 border-primary-500 ${
            statusFilter === 'in-use' ? 'ring-2 ring-primary-500' : ''
          }`}
          onClick={() => setStatusFilter(statusFilter === 'in-use' ? null : 'in-use')}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">En utilisation</p>
              <h3 className="text-2xl font-bold text-gray-800">{equipmentsByStatus.inUse}</h3>
            </div>
            <div className="p-3 rounded-full bg-primary-100">
              <Clock size={20} className="text-primary-600" />
            </div>
          </div>
        </div>
        
        <div 
          className={`bg-white rounded-lg shadow-card p-5 border-l-4 border-warning-500 ${
            statusFilter === 'maintenance' ? 'ring-2 ring-warning-500' : ''
          }`}
          onClick={() => setStatusFilter(statusFilter === 'maintenance' ? null : 'maintenance')}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">En maintenance</p>
              <h3 className="text-2xl font-bold text-gray-800">{equipmentsByStatus.maintenance}</h3>
            </div>
            <div className="p-3 rounded-full bg-warning-100">
              <AlertCircle size={20} className="text-warning-600" />
            </div>
          </div>
        </div>
        
        <div 
          className={`bg-white rounded-lg shadow-card p-5 border-l-4 border-error-500 ${
            statusFilter === 'broken' ? 'ring-2 ring-error-500' : ''
          }`}
          onClick={() => setStatusFilter(statusFilter === 'broken' ? null : 'broken')}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Hors service</p>
              <h3 className="text-2xl font-bold text-gray-800">{equipmentsByStatus.broken}</h3>
            </div>
            <div className="p-3 rounded-full bg-error-100">
              <X size={20} className="text-error-600" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-card p-6 mb-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0 mb-6">
          <h2 className="text-2xl font-semibold">Inventaire des équipements</h2>
          
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <button className="flex items-center justify-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors">
              <Plus size={16} />
              <span>Ajouter un équipement</span>
            </button>
            
            <button className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors">
              <QrCode size={16} />
              <span>Scanner QR Code</span>
            </button>
            
            <button className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors">
              <RefreshCw size={16} />
              <span>Actualiser</span>
            </button>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 mb-6">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher un équipement..."
              className="pl-10 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {statusFilter && (
            <button
              onClick={() => setStatusFilter(null)}
              className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800"
            >
              <X size={16} />
              <span>Effacer le filtre</span>
            </button>
          )}
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Équipement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  N° Série
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date d'achat
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dernière maintenance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Emplacement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEquipments.map((equipment) => (
                <tr key={equipment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{equipment.name}</div>
                        <div className="text-sm text-gray-500">{equipment.type}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {equipment.serialNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {equipment.purchaseDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {equipment.lastMaintenance || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {equipment.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(equipment.status)}`}>
                      <span className="flex items-center">
                        {getStatusIcon(equipment.status)}
                        <span className="ml-1">{getStatusLabel(equipment.status)}</span>
                      </span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-900 mr-3">
                      Détails
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      Modifier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EquipmentPage;