import React from 'react';
import { AlertTriangle, AlertCircle, X, Clock } from 'lucide-react';

const Notifications = ({ alerts = [], onDismiss }) => {
  const getAlertIcon = (type) => {
    switch (type) {
      case 'error': return AlertCircle;
      case 'warning': return AlertTriangle;
      default: return AlertTriangle;
    }
  };

  const getAlertStyles = (type) => {
    switch (type) {
      case 'error': return {
        bg: 'bg-red-50 border-red-200',
        text: 'text-red-800',
        icon: 'text-red-600'
      };
      case 'warning': return {
        bg: 'bg-yellow-50 border-yellow-200',
        text: 'text-yellow-800',
        icon: 'text-yellow-600'
      };
      default: return {
        bg: 'bg-blue-50 border-blue-200',
        text: 'text-blue-800',
        icon: 'text-blue-600'
      };
    }
  };

  const formatTime = (timestamp) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(new Date(timestamp));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <AlertTriangle className="w-5 h-5 mr-2 text-yellow-500" />
        Alerts & Notifications
      </h3>

      <div className="space-y-3">
        {alerts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <AlertCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No active alerts</p>
          </div>
        ) : (
          alerts.map((alert) => {
            const Icon = getAlertIcon(alert.type);
            const styles = getAlertStyles(alert.type);
            
            return (
              <div
                key={alert.id}
                className={`rounded-lg border p-4 ${styles.bg} ${styles.text}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <Icon className={`w-5 h-5 mt-0.5 ${styles.icon}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-sm font-semibold">{alert.title}</h4>
                        <div className="flex items-center text-xs opacity-75">
                          <Clock className="w-3 h-3 mr-1" />
                          {formatTime(alert.timestamp)}
                        </div>
                      </div>
                      <p className="text-sm opacity-90">{alert.message}</p>
                    </div>
                  </div>
                  {onDismiss && (
                    <button
                      onClick={() => onDismiss(alert.id)}
                      className={`ml-3 p-1 rounded-md hover:bg-opacity-20 hover:bg-gray-900 transition-colors ${styles.icon}`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Notifications;