import React, { useState } from 'react';
import { QrCode, Download, X } from 'lucide-react';

interface EquipmentQRCodeProps {
  isOpen: boolean;
  onClose: () => void;
  equipment: {
    id: number;
    name: string;
    serialNumber: string;
    type: string;
  } | null;
}

const EquipmentQRCode: React.FC<EquipmentQRCodeProps> = ({ isOpen, onClose, equipment }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  React.useEffect(() => {
    if (equipment && isOpen) {
      // Generate QR code data
      const qrData = JSON.stringify({
        id: equipment.id,
        name: equipment.name,
        serialNumber: equipment.serialNumber,
        type: equipment.type,
        timestamp: new Date().toISOString()
      });
      
      // Use a free QR code API
      const qrCodeApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`;
      setQrCodeUrl(qrCodeApiUrl);
    }
  }, [equipment, isOpen]);

  const handleDownload = () => {
    if (qrCodeUrl) {
      const link = document.createElement('a');
      link.href = qrCodeUrl;
      link.download = `equipment-${equipment?.serialNumber}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (!isOpen || !equipment) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">QR Code - {equipment.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        <div className="text-center space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <img 
              src={qrCodeUrl} 
              alt="QR Code" 
              className="mx-auto border border-gray-200 rounded"
            />
          </div>
          
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>Nom:</strong> {equipment.name}</p>
            <p><strong>Numéro de série:</strong> {equipment.serialNumber}</p>
            <p><strong>Type:</strong> {equipment.type}</p>
          </div>
          
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 mx-auto"
          >
            <Download size={16} />
            Télécharger QR Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default EquipmentQRCode; 