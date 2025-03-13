import React, { useState } from 'react';
import { X } from 'lucide-react';

function SiteNotification() {
  const [isVisible, setIsVisible] = useState(true);

  const closeNotification = () => {
    setIsVisible(false);
    // Valgfritt: Lagre i localStorage for å huske at brukeren har lukket den
    localStorage.setItem('notificationClosed', 'true');
  };

  // Hvis du ikke vil at notisen skal vises igjen etter at den er lukket
  React.useEffect(() => {
    const isClosed = localStorage.getItem('notificationClosed') === 'true';
    if (isClosed) {
      setIsVisible(false);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-24 right-4 z-50 max-w-xs bg-white border border-kilred rounded-lg shadow-lg p-4 text-sm">
      <div className="flex justify-between items-start">
        <div className="text-kilred font-medium mb-1">Obs!</div>
        <button 
          onClick={closeNotification}
          className="text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Lukk melding"
        >
          <X size={16} />
        </button>
      </div>
      <p className="text-gray-800">
        Vi holder på å fornye nettsiden vår. Det vil komme oppdatert informasjon løpende.
      </p>
    </div>
  );
}

export default SiteNotification;