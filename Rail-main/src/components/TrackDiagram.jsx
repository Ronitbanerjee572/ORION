import React, { useState } from 'react';
import gif from '../assets/gif.gif';
import labelGif from '../assets/label.gif';
import { Brain as Train } from 'lucide-react';

const TrackDiagram = () => {
  const [isLabel, setIsLabel] = useState(false);
  const [isHolding, setIsHolding] = useState(false);

  const handleMouseDown = () => {
    setIsLabel(true);
    setIsHolding(true);
  };

  const handleMouseUp = () => {
    setIsLabel(false);
    setIsHolding(false);
  };

  const handleMouseLeave = () => {
    setIsLabel(false);
    setIsHolding(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-center">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Train className="w-5 h-5 mr-2" />
        Live Track Visualization
      </h3>
      <div className="w-full flex justify-center mb-4 relative">
        {/* Cover square */}
        <div
          style={{
            position: 'absolute',
            top: 12,
            right: 82,
            width: 40,
            height: 40,
            backgroundColor: '#3ca2de',
            borderRadius: '0.5rem',
            zIndex: 2,
          }}
        />
        <img
          src={isLabel ? labelGif : gif}
          alt="Track Visualization"
          className="max-h-64 rounded-lg border border-gray-100 shadow"
          style={{ objectFit: 'contain' }}
        />
      </div>
      {/* Abbreviation Legend */}
      <div className="flex flex-row items-center space-x-6 mb-4">
        {/* Controlled Signal */}
        <div className="flex items-center space-x-2">
          <span
            className="inline-block"
            style={{
              width: 18,
              height: 18,
              borderRadius: '50%',
              backgroundColor: 'red',
              border: '2px solid black',
              display: 'inline-block',
            }}
          ></span>
          <span className="text-sm text-gray-700">Controlled Signal</span>
        </div>
        {/* Automated Signal */}
        <div className="flex items-center space-x-2">
          <span
            className="inline-block"
            style={{
              width: 18,
              height: 18,
              borderRadius: '50%',
              backgroundColor: '#3ca2de',
              border: '2px solid black',
              display: 'inline-block',
            }}
          ></span>
          <span className="text-sm text-gray-700">Automated Signal</span>
        </div>
        {/* Train Description */}
        <div className="flex items-center space-x-2">
          <span
            className="inline-block"
            style={{
              width: 28,
              height: 12,
              borderRadius: '3px',
              backgroundColor: 'black',
              border: '2px solid black',
              display: 'inline-block',
            }}
          ></span>
          <span className="text-sm text-gray-700">Train Description</span>
        </div>
      </div>
      <button
        className={`px-4 py-2 bg-blue-600 text-white rounded-md shadow transition-colors relative overflow-hidden ${
          isHolding ? 'animate-pulse ring-4 ring-blue-300' : ''
        }`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        aria-label="Hold to Show Labels"
        style={{ outline: 'none' }}
      >
        Hold to Show Labels
        {isHolding && (
          <span
            className="absolute inset-0 bg-blue-800 opacity-20 pointer-events-none"
            style={{ borderRadius: 'inherit', zIndex: 1 }}
          ></span>
        )}
      </button>
    </div>
  );
};

export default TrackDiagram;