import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import CreateEquipmentForm from '../../components/Equipment/CreateEquipmentForm';
import EquipmentQRCode from '../../components/Equipment/EquipmentQRCode';
import { Equipment } from '../../types';
import { equipmentAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { 
  Plus, 
  Search, 
  QrCode, 
  RefreshCw, 
  Check, 
  AlertCircle, 
  Clock, 
  X,
  Edit,
  Trash2
} from 'lucide-react';

const EquipmentPage: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  
  // Fetch equipment data from API
  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await equipmentAPI.getAll();
        setEquipments(data);
      } catch (err) {
        console.error('Error fetching equipment:', err);
        setError('Failed to load equipment data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchEquipment();
  }, []);
  
  const filteredEquipments = equipments.filter(equipment => {
    const matchesSearch = 
      equipment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      equipment.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      equipment.serialNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === null || equipment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const handleRefresh = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await equipmentAPI.getAll();
      setEquipments(data);
    } catch (err) {
      console.error('Error refreshing equipment:', err);
      setError('Failed to refresh equipment data');
    } finally {
      setLoading(false);
    }
  };
  
  const handleEquipmentCreated = () => {
    console.log('Equipment created, refreshing list...');
    handleRefresh(); // Refresh the list
  };
  
  const handleDeleteEquipment = async (equipmentId: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet équipement ?')) {
      return;
    }
    
    try {
      await equipmentAPI.delete(equipmentId);
      handleRefresh(); // Refresh the list
    } catch (err: any) {
      console.error('Error deleting equipment:', err);
      alert('Failed to delete equipment');
    }
  };
  
  const handleStatusUpdate = async (equipmentId: number, newStatus: string) => {
    try {
      const equipment = equipments.find(e => e.id === equipmentId);
      if (!equipment) return;
      
      await equipmentAPI.update(equipmentId, {
        ...equipment,
        status: newStatus
      });
      handleRefresh(); // Refresh the list
    } catch (err: any) {
      console.error('Error updating equipment status:', err);
      alert('Failed to update equipment status');
    }
  };
  
  const handleShowQRCode = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
    setShowQRCode(true);
  };
  
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

  if (loading) {
    return (
      <DashboardLayout title="Gestion des Équipements">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <RefreshCw className="animate-spin h-8 w-8 mx-auto mb-4 text-primary-600" />
            <p className="text-gray-600">Chargement des équipements...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout title="Gestion des Équipements">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={handleRefresh}
              className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
            >
              Réessayer
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout title="Gestion des Équipements">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestion des Équipements</h1>
            <p className="text-gray-600">Inventaire et maintenance des équipements</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md transition-colors"
            >
              <RefreshCw size={16} />
              Actualiser
            </button>
            {(user?.role === 'admin' || user?.role === 'teacher') && (
              <button 
                onClick={() => setShowCreateForm(true)}
                className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                <Plus size={16} />
                Ajouter un équipement
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Rechercher un équipement..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter || ''}
                onChange={(e) => setStatusFilter(e.target.value || null)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Tous les statuts</option>
                <option value="available">Disponible</option>
                <option value="in-use">En utilisation</option>
                <option value="maintenance">En maintenance</option>
                <option value="broken">Hors service</option>
              </select>
            </div>
          </div>
        </div>

        {/* Equipment List */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Équipement
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Numéro de série
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Localisation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEquipments.map((equipment) => (
                  <tr key={equipment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{equipment.name}</div>
                        <div className="text-sm text-gray-500">
                          Acheté le {new Date(equipment.purchaseDate).toLocaleDateString()}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {equipment.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {equipment.serialNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(equipment.status)}
                        {(user?.role === 'admin' || user?.role === 'teacher') ? (
                          <select
                            value={equipment.status}
                            onChange={(e) => handleStatusUpdate(equipment.id, e.target.value)}
                            className="ml-2 text-sm text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          >
                            <option value="available">Disponible</option>
                            <option value="in-use">En utilisation</option>
                            <option value="maintenance">En maintenance</option>
                            <option value="broken">Hors service</option>
                          </select>
                        ) : (
                          <span className="ml-2 text-sm text-gray-900">
                            {getStatusLabel(equipment.status)}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {equipment.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleShowQRCode(equipment)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Générer QR Code"
                        >
                          <QrCode size={14} />
                        </button>
                        {(user?.role === 'admin' || user?.role === 'teacher') && (
                          <>
                            <button className="text-primary-600 hover:text-primary-900">
                              <Edit size={14} className="mr-1" />
                              Modifier
                            </button>
                            <button 
                              onClick={() => handleDeleteEquipment(equipment.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 size={14} className="mr-1" />
                              Supprimer
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredEquipments.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">Aucun équipement trouvé</p>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="text-sm font-medium text-gray-500">Total Équipements</h3>
            <p className="text-2xl font-bold text-gray-900">{equipments.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="text-sm font-medium text-gray-500">Disponibles</h3>
            <p className="text-2xl font-bold text-green-600">
              {equipments.filter(e => e.status === 'available').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="text-sm font-medium text-gray-500">En utilisation</h3>
            <p className="text-2xl font-bold text-blue-600">
              {equipments.filter(e => e.status === 'in-use').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="text-sm font-medium text-gray-500">En maintenance</h3>
            <p className="text-2xl font-bold text-orange-600">
              {equipments.filter(e => e.status === 'maintenance').length}
            </p>
          </div>
        </div>
      </div>

      {/* Create Equipment Form Modal */}
      <CreateEquipmentForm
        isOpen={showCreateForm}
        onClose={() => setShowCreateForm(false)}
        onEquipmentCreated={handleEquipmentCreated}
      />

      {/* QR Code Modal */}
      <EquipmentQRCode
        isOpen={showQRCode}
        onClose={() => setShowQRCode(false)}
        equipment={selectedEquipment}
      />
    </DashboardLayout>
  );
};

export default EquipmentPage;