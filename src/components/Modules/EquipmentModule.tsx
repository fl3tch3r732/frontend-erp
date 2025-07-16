import React, { useState } from 'react';
import { 
  Monitor, 
  Plus, 
  Search, 
  Filter, 
  Wrench, 
  AlertTriangle,
  CheckCircle,
  Calendar,
  Package,
  MapPin
} from 'lucide-react';

const EquipmentModule: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const equipment = [
    {
      id: 1,
      name: 'Projecteur Epson EB-X41',
      type: 'Projecteur',
      brand: 'Epson',
      model: 'EB-X41',
      serialNumber: 'EP2024001',
      status: 'available',
      location: 'Salle A101',
      acquisitionDate: '2024-01-15',
      lastMaintenance: '2024-02-15',
      nextMaintenance: '2024-05-15',
      condition: 'excellent'
    },
    {
      id: 2,
      name: 'Ordinateur Dell OptiPlex',
      type: 'Ordinateur',
      brand: 'Dell',
      model: 'OptiPlex 7090',
      serialNumber: 'DL2024001',
      status: 'in_use',
      location: 'Labo Info A',
      acquisitionDate: '2024-02-01',
      lastMaintenance: '2024-03-01',
      nextMaintenance: '2024-06-01',
      condition: 'good'
    },
    {
      id: 3,
      name: 'Tableau interactif Smart',
      type: 'Tableau',
      brand: 'Smart',
      model: 'Board 6075',
      serialNumber: 'SM2024001',
      status: 'maintenance',
      location: 'Salle B201',
      acquisitionDate: '2023-09-15',
      lastMaintenance: '2024-01-10',
      nextMaintenance: '2024-04-10',
      condition: 'needs_repair'
    },
    {
      id: 4,
      name: 'Climatiseur LG Dual Cool',
      type: 'Climatisation',
      brand: 'LG',
      model: 'Dual Cool S4-W18KL3AA',
      serialNumber: 'LG2024001',
      status: 'available',
      location: 'Amphithéâtre',
      acquisitionDate: '2023-12-01',
      lastMaintenance: '2024-02-01',
      nextMaintenance: '2024-05-01',
      condition: 'good'
    },
    {
      id: 5,
      name: 'Imprimante HP LaserJet',
      type: 'Imprimante',
      brand: 'HP',
      model: 'LaserJet Pro 4001n',
      serialNumber: 'HP2024001',
      status: 'out_of_service',
      location: 'Bureau Admin',
      acquisitionDate: '2023-08-15',
      lastMaintenance: '2024-01-15',
      nextMaintenance: 'En attente',
      condition: 'poor'
    }
  ];

  const filteredEquipment = equipment.filter(item => {
    return (selectedStatus === 'all' || item.status === selectedStatus) &&
           (selectedCategory === 'all' || item.type === selectedCategory);
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800 border-green-300';
      case 'in_use': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'out_of_service': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available': return <CheckCircle className="w-4 h-4" />;
      case 'in_use': return <Package className="w-4 h-4" />;
      case 'maintenance': return <Wrench className="w-4 h-4" />;
      case 'out_of_service': return <AlertTriangle className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'needs_repair': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'available': return 'Disponible';
      case 'in_use': return 'En cours d\'utilisation';
      case 'maintenance': return 'Maintenance';
      case 'out_of_service': return 'Hors service';
      default: return 'Inconnu';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Gestion des équipements</h2>
          <p className="text-slate-600">Suivi et maintenance du matériel</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" />
          Nouvel équipement
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher un équipement..."
              className="border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-slate-400" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tous les statuts</option>
              <option value="available">Disponible</option>
              <option value="in_use">En cours d'utilisation</option>
              <option value="maintenance">Maintenance</option>
              <option value="out_of_service">Hors service</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Toutes les catégories</option>
              <option value="Projecteur">Projecteurs</option>
              <option value="Ordinateur">Ordinateurs</option>
              <option value="Tableau">Tableaux</option>
              <option value="Climatisation">Climatisation</option>
              <option value="Imprimante">Imprimantes</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{equipment.length}</p>
              <p className="text-sm text-slate-600">Total équipements</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">
                {equipment.filter(e => e.status === 'available').length}
              </p>
              <p className="text-sm text-slate-600">Disponibles</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Wrench className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">
                {equipment.filter(e => e.status === 'maintenance').length}
              </p>
              <p className="text-sm text-slate-600">En maintenance</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">
                {equipment.filter(e => e.status === 'out_of_service').length}
              </p>
              <p className="text-sm text-slate-600">Hors service</p>
            </div>
          </div>
        </div>
      </div>

      {/* Equipment List */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-700">Équipement</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-700">Type</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-700">Localisation</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-700">Statut</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-700">Maintenance</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredEquipment.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-slate-900">{item.name}</div>
                      <div className="text-sm text-slate-500">{item.brand} {item.model}</div>
                      <div className="text-xs text-slate-400">SN: {item.serialNumber}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Monitor className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-900">{item.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-900">{item.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                      {getStatusIcon(item.status)}
                      {getStatusLabel(item.status)}
                    </div>
                    <div className={`text-xs mt-1 ${getConditionColor(item.condition)}`}>
                      État: {item.condition === 'excellent' ? 'Excellent' : 
                             item.condition === 'good' ? 'Bon' : 
                             item.condition === 'needs_repair' ? 'À réparer' : 'Mauvais'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-900 flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      {item.nextMaintenance}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      Dernière: {new Date(item.lastMaintenance).toLocaleDateString('fr-FR')}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Modifier
                      </button>
                      <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                        Réserver
                      </button>
                      <button className="text-yellow-600 hover:text-yellow-700 text-sm font-medium">
                        Maintenance
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EquipmentModule;