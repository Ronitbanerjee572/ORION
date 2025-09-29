const API_BASE = 'http://localhost:8000';

export const api = {
  // Get example schedule and KPIs
  async getExample() {
    try {
      const response = await fetch(`${API_BASE}/example`);
      if (!response.ok) throw new Error('Failed to fetch example data');
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      // Return mock data as fallback
      return getMockData();
    }
  },

  // Post optimization request
  async optimize(data) {
    try {
      const response = await fetch(`${API_BASE}/optimize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to optimize');
      return await response.json();
    } catch (error) {
      console.error('Optimization Error:', error);
      // Return mock optimized data as fallback
      return getOptimizedMockData();
    }
  }
};

// Mock data for development/fallback
function getMockData() {
  return {
    kpis: {
      throughput: { value: 120, change: 10, unit: 'Trains/Day' },
      avgDelay: { value: 15, change: -5, unit: 'min' },
      resourceUtilization: { value: 85, change: 2, unit: '%' }
    },
    trains: [
      { id: 'TRN-101', position: 25, status: 'on-time', color: '#10B981' },
      { id: 'TRN-102', position: 75, status: 'delayed', color: '#F59E0B' }
    ],
    schedule: [
      {
        id: 1,
        content: 'TRN-101',
        start: new Date('2025-01-23T09:00:00'),
        end: new Date('2025-01-23T10:00:00'),
        className: 'train-on-time'
      },
      {
        id: 2,
        content: 'TRN-102',
        start: new Date('2025-01-23T10:00:00'),
        end: new Date('2025-01-23T11:15:00'),
        className: 'train-delayed'
      },
      {
        id: 3,
        content: 'TRN-103',
        start: new Date('2025-01-23T11:00:00'),
        end: new Date('2025-01-23T12:00:00'),
        className: 'train-on-time'
      },
      {
        id: 4,
        content: 'TRN-104',
        start: new Date('2025-01-23T12:00:00'),
        end: new Date('2025-01-23T13:20:00'),
        className: 'train-delayed'
      }
    ],
    recommendations: [
      {
        id: 1,
        title: 'Optimize Train Schedule',
        description: 'Reduce delays by adjusting train timings.',
        type: 'optimization'
      },
      {
        id: 2,
        title: 'Resource Reallocation',
        description: 'Improve efficiency by reallocating resources.',
        type: 'resource'
      }
    ],
    alerts: [
      {
        id: 1,
        type: 'warning',
        title: 'Delay Alert',
        message: 'Train TRN-102 is delayed by 15 minutes.',
        timestamp: new Date()
      },
      {
        id: 2,
        type: 'error',
        title: 'Resource Warning',
        message: 'Resource R-201 is unavailable.',
        timestamp: new Date()
      }
    ]
  };
}

function getOptimizedMockData() {
  return {
    ...getMockData(),
    kpis: {
      throughput: { value: 135, change: 25, unit: 'Trains/Day' },
      avgDelay: { value: 8, change: -12, unit: 'min' },
      resourceUtilization: { value: 92, change: 9, unit: '%' }
    }
  };
}