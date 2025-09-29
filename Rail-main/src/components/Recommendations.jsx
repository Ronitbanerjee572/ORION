import React from 'react';
import { CheckCircle, XCircle, Lightbulb, Settings, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

const Recommendations = ({ recommendations = [], onAccept, onReject }) => {
  const handleAccept = (rec) => {
    if (onAccept) onAccept(rec);
    toast.success(`Accepted: ${rec.title}`);
  };

  const handleReject = (rec) => {
    if (onReject) onReject(rec);
    toast.error(`Rejected: ${rec.title}`);
  };

  const getIcon = (type) => {
    switch (type) {
      case 'optimization': return Zap;
      case 'resource': return Settings;
      default: return Lightbulb;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
        AI Recommendation Panel
      </h3>

      <div className="space-y-4">
        {recommendations.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Lightbulb className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No recommendations available</p>
          </div>
        ) : (
          recommendations.map((rec) => {
            const Icon = getIcon(rec.type);
            return (
              <div key={rec.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Icon className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">
                      {rec.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      {rec.description}
                    </p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAccept(rec)}
                        className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(rec)}
                        className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Recommendations;