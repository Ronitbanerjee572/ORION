import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Users,Map, ShieldCheck, TimerReset, BrainCog, LayoutDashboard, BellDot } from 'lucide-react';

import Dashboard from './components/Dashboard';
import TrackDiagram from './components/TrackDiagram';
import Recommendations from './components/Recommendations';
import OptimizerForm from './components/OptimizerForm';
import Notifications from './components/Notifications';
import ScheduleTimeline from './components/ScheduleTimeline';

import DotGrid from './components/DotGrid';


import { api } from './api';
import orionLogo from './assets/orion.png';

function App() {
  const [data, setData] = useState(null);
  const [scheduleResult, setScheduleResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLanding, setShowLanding] = useState(true);

  useEffect(() => {
    if (!showLanding) {
      loadData();
    }
  }, [showLanding]);

  const loadData = async () => {
    setLoading(true);
    try {
      const result = await api.getExample();
      setData(result);
    } catch (error) {
      console.error('Failed to load data:', error);
      toast.error('Could not load initial dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  const handleOptimize = async (optimizationData) => {
    const loadingToast = toast.loading('Running optimizer...');
    try {
      const result = await api.optimize(optimizationData);
      setScheduleResult(result);
      toast.success('Optimization complete!', { id: loadingToast });
    } catch (error) {
      console.error('Optimization failed:', error);
      toast.error('Optimization failed. Please try again.', { id: loadingToast });
      throw error;
    }
  };

  const handleRecommendationAction = (recommendation) => {
    console.log('Recommendation action:', recommendation);
    toast.success(`Action for ${recommendation.trainId} recorded.`);
  };

  const handleDismissAlert = (alertId) => {
    setData(prevData => ({
      ...prevData,
      alerts: prevData.alerts.filter(alert => alert.id !== alertId)
    }));
  };

  // Landing Page
  if (showLanding) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center relative overflow-hidden">
        {/* DotGrid background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <DotGrid
            dotSize={5}
            gap={12}
            baseColor="#d3d3d3"
            activeColor="#11686b"
            proximity={120}
            shockRadius={250}
            shockStrength={5}
            resistance={750}
            returnDuration={1.5}
          />
        </div>
        {/* Glass Card */}
        <nav className='absolute flex items-center justify-between w-[100%] top-0 left-0 navb px-[150px]'>
          <div className='flex gap-1 items-center justify-center'>
            <img src={orionLogo} alt="ORION Logo" className="h-24 w-24 object-contain py-3" />
            <div>
              <h1 className="text-3xl font-bold text-black mb-2 font-sans leading-4">ORION</h1>
              <h2 className="text-xl text-gray-800  text-center block leading-3">
                Operational Rail Intelligence & Optimization Network
              </h2>
            </div>
          </div>
          <button
            className="px-6 py-3 z-20 bg-[#11686b] text-white rounded-md font-semibold shadow hover:bg-[#278083] transition-colors"
            onClick={() => setShowLanding(false)}
          >
            Get Started
          </button>
          {/* <img src={orionLogo} alt="ORION Logo" className="h-32 w-32 mb-4 object-contain pb-5" /> */}

        </nav>
        <div className="glass-card flex flex-col items-center max-w-fit w-full z-10 relative p-12">

          <p className="text-gray-900 text-8xl mb-6 font-bold text-center h-[650px] pt-[225px] pb-[50px]">
            AI-Driven Railway Traffic <span className='snp'>Optimization</span> for Maximizing Section Throughput
          </p>

        </div>

        <div className='z-10 pb-[100px]'>
          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 w-full max-w-5xl z-10">
            {/* Card 1 */}
            <div className="bg-white bg-opacity-80 rounded-2xl shadow-lg p-8 flex flex-col items-center min-h-[180px]">
              <Map className="w-16 h-16 mb-4" style={{ color: '#11686b' }} />
              <span className="text-2xl font-bold text-gray-900 text-center mb-2">Live Tracking</span>
              <span className="text-base text-gray-700 text-center">Monitor train positions in real time across the network.</span>
            </div>
            {/* Card 2 */}
            <div className="bg-white bg-opacity-80 rounded-2xl shadow-lg p-8 flex flex-col items-center min-h-[180px]">
              <ShieldCheck className="w-16 h-16 mb-4" style={{ color: '#11686b' }} />
              <span className="text-2xl font-bold text-gray-900 text-center mb-2">Reliable Service</span>
              <span className="text-base text-gray-700 text-center">Ensuring consistent and dependable railway operations.</span>
            </div>
            {/* Card 3 */}
            <div className="bg-white bg-opacity-80 rounded-2xl shadow-lg p-8 flex flex-col items-center min-h-[180px]">
              <TimerReset className="w-16 h-16 mb-4" style={{ color: '#11686b' }} />
              <span className="text-2xl font-bold text-gray-900 text-center mb-2">Minimum Delay</span>
              <span className="text-base text-gray-700 text-center">Reduce delays with intelligent scheduling and control.</span>
            </div>
            {/* Card 4 */}
            <div className="bg-white bg-opacity-80 rounded-2xl shadow-lg p-8 flex flex-col items-center min-h-[180px]">
              <BrainCog className="w-16 h-16 mb-4" style={{ color: '#11686b' }} />
              <span className="text-2xl font-bold text-gray-900 text-center mb-2">AI Based Scheduling</span>
              <span className="text-base text-gray-700 text-center">Leverage AI to optimize train schedules and routes.</span>
            </div>
            {/* Card 5 */}
            <div className="bg-white bg-opacity-80 rounded-2xl shadow-lg p-8 flex flex-col items-center min-h-[180px]">
              <LayoutDashboard className="w-16 h-16 mb-4" style={{ color: '#11686b' }} />
              <span className="text-2xl font-bold text-gray-900 text-center mb-2">Real Time Control Dashboard</span>
              <span className="text-base text-gray-700 text-center">Centralized dashboard for live control and monitoring.</span>
            </div>
            {/* Card 6 */}
            <div className="bg-white bg-opacity-80 rounded-2xl shadow-lg p-8 flex flex-col items-center min-h-[180px]">
              <BellDot className="w-16 h-16 mb-4" style={{ color: '#11686b' }} />
              <span className="text-2xl font-bold text-gray-900 text-center mb-2">Alerts and AI Recommendations</span>
              <span className="text-base text-gray-700 text-center">Get instant alerts and actionable AI recommendations.</span>
            </div>
          </div>
        </div>


      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Railway Control System...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="">
                  <img
                    src={orionLogo}
                    alt="Rail Control Logo"
                    className="h-12 w-12 object-contain"
                  />
                </div>
                <span className="text-xl font-bold text-gray-900">ORION</span>
                <div className="text-xs text-gray-500 ml-2">
                  Operational Rail Intelligence & Optimization Network
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-gray-600" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* KPI Dashboard - Full width */}
        <div className="mb-8">
          <Dashboard kpis={data?.kpis} />
        </div>

        {/* Track Diagram and AI Recommendations Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <TrackDiagram trains={data?.trains} />
          </div>
          <div className="lg:col-span-1">
            <Recommendations
              recommendations={data?.recommendations}
              onAccept={handleRecommendationAction}
              onReject={handleRecommendationAction}
            />
          </div>
        </div>

        {/* Manual Optimizer and Notifications Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <OptimizerForm onOptimize={handleOptimize} />
          </div>
          <div className="lg:col-span-1">
            <Notifications
              alerts={data?.alerts}
              onDismiss={handleDismissAlert}
            />
          </div>
        </div>

        {/* Schedule Timeline - Full width */}
        <div className="mb-8">
          <ScheduleTimeline scheduleResult={scheduleResult} />
        </div>
      </main>
    </div>
  );
}

export default App;