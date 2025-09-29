import React, { useState } from 'react';
import { Settings, Plus, X, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const OptimizerForm = ({ onOptimize }) => {
  // --- STATE MANAGEMENT ---
  // Initial state includes one example train and one example resource for clarity
  const [trains, setTrains] = useState([
    { id: '12951', type: 'Superfast', priority: 10, scheduleArrival: '' }
  ]);
  const [resources, setResources] = useState([
    { id: 'P1', type: 'platform', capacity: '1', length: '600', start_node: 'STATION_A', end_node: '' }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  // --- EVENT HANDLERS ---
  const addTrain = () => {
    setTrains([...trains, { id: '', type: 'Passenger', priority: 5, scheduleArrival: '' }]);
  };

  const addResource = () => {
    setResources([...resources, { id: '', type: 'track', capacity: '1', length: '1200', start_node: '', end_node: '' }]);
  };

  const updateTrain = (index, field, value) => {
    const newTrains = [...trains];
    newTrains[index][field] = value;
    setTrains(newTrains);
  };

  const updateResource = (index, field, value) => {
    const newResources = [...resources];
    newResources[index][field] = value;
    setResources(newResources);
  };

  const removeTrain = (index) => {
    if (trains.length > 1) {
      setTrains(trains.filter((_, i) => i !== index));
    } else {
      toast.error("At least one train is required.");
    }
  };

  const removeResource = (index) => {
    if (resources.length > 1) {
      setResources(resources.filter((_, i) => i !== index));
    } else {
      toast.error("At least one resource is required.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Prepare data for the API: filter out empty entries and convert types
    const formattedData = {
      trains: trains.filter(t => t.id.trim()).map(t => ({ ...t, priority: Number(t.priority) })),
      resources: resources.filter(r => r.id.trim()).map(r => ({
        ...r,
        capacity: Number(r.capacity),
        length: Number(r.length)
      }))
    };

    try {
      if (onOptimize) {
        // The onOptimize function (passed as a prop) will handle the API call
        await onOptimize(formattedData);
      }
      // Success toast is handled in the parent component after the API call resolves
    } catch (error) {
      // Error toast is handled in the parent component
    } finally {
      setIsLoading(false);
    }
  };

  // --- JSX RENDER ---
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Settings className="w-5 h-5 mr-2" />
        Manual Optimizer
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Add Train Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-700">Train Manifest</label>
              <button
                type="button"
                onClick={addTrain}
                className="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
              >
                <Plus className="w-3 h-3 mr-1" />
                Add Train
              </button>
            </div>
            <div className="space-y-2">
              {trains.map((train, index) => (
                <div key={index} className="space-y-2 p-3 border border-gray-200 rounded-md bg-gray-50/50">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={train.id}
                      onChange={(e) => updateTrain(index, 'id', e.target.value)}
                      placeholder="Enter Train ID"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => removeTrain(index)}
                      className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div className="flex space-x-2">
                    <select
                      value={train.type}
                      onChange={(e) => updateTrain(index, 'type', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    >
                      <option value="Superfast">Superfast</option>
                      <option value="Mail/Express">Mail/Express</option>
                      <option value="Passenger">Passenger</option>
                      <option value="Goods">Goods</option>
                    </select>
                    <select
                      value={train.priority}
                      onChange={(e) => updateTrain(index, 'priority', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    >
                      <option value={10}>Highest Priority (10)</option>
                      <option value={8}>High (8)</option>
                      <option value={5}>Medium (5)</option>
                      <option value={2}>Low (2)</option>
                    </select>
                  </div>
                  <input
                    type="datetime-local"
                    value={train.scheduleArrival}
                    onChange={(e) => updateTrain(index, 'scheduleArrival', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    required
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Add Resource Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-700">Resource Layout</label>
              <button
                type="button"
                onClick={addResource}
                className="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100"
              >
                <Plus className="w-3 h-3 mr-1" />
                Add Resource
              </button>
            </div>
            <div className="space-y-2">
              {resources.map((resource, index) => (
                <div key={index} className="space-y-2 p-3 border border-gray-200 rounded-md bg-gray-50/50">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={resource.id}
                      onChange={(e) => updateResource(index, 'id', e.target.value)}
                      placeholder="Enter Resource ID"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                      required
                    />
                     <button
                      type="button"
                      onClick={() => removeResource(index)}
                      className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div className="flex space-x-2">
                    <select
                      value={resource.type}
                      onChange={(e) => updateResource(index, 'type', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    >
                      <option value="platform">Platform</option>
                      <option value="track">Track</option>
                      <option value="yard">Yard</option>
                    </select>
                    <input
                      type="number"
                      value={resource.capacity}
                      onChange={(e) => updateResource(index, 'capacity', e.target.value)}
                      placeholder="Capacity"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                      required
                    />
                    <input
                      type="number"
                      value={resource.length}
                      onChange={(e) => updateResource(index, 'length', e.target.value)}
                      placeholder="Length (m)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                  {resource.type === 'track' && (
                    <div className="flex space-x-2 mt-2">
                      <input type="text" value={resource.start_node} onChange={(e) => updateResource(index, 'start_node', e.target.value)} placeholder="Start Node/Station" className="w-full px-3 py-2 border border-gray-300 rounded-md" required/>
                      <input type="text" value={resource.end_node} onChange={(e) => updateResource(index, 'end_node', e.target.value)} placeholder="End Node/Station" className="w-full px-3 py-2 border border-gray-300 rounded-md" required/>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Running Optimizer...
            </>
          ) : (
            'Run Optimizer'
          )}
        </button>
      </form>
    </div>
  );
};

export default OptimizerForm;