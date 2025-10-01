import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Users, Map, ShieldCheck, TimerReset, BrainCog, LayoutDashboard, BellDot } from 'lucide-react';

import Dashboard from './components/Dashboard';
import TrackDiagram from './components/TrackDiagram';
import Recommendations from './components/Recommendations';
import OptimizerForm from './components/OptimizerForm';
import Notifications from './components/Notifications';
import ScheduleTimeline from './components/ScheduleTimeline';

import DotGrid from './components/DotGrid';
import AboutContact from './components/AboutContact';

import { api } from './api';
import orionLogo from './assets/orion.png';

function App() {
  const [data, setData] = useState(null);
  const [scheduleResult, setScheduleResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLanding, setShowLanding] = useState(true);
  const [showAboutContact, setShowAboutContact] = useState(false);
  const [aboutContactSection, setAboutContactSection] = useState('about');
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    if (!showLanding && !showAboutContact) {
      loadData();
    }
  }, [showLanding, showAboutContact]);

  // Handle page transitions with loading
  const navigateToAboutContact = (section) => {
    setPageLoading(true);
    setTimeout(() => {
      setAboutContactSection(section);
      setShowAboutContact(true);
      setShowLanding(false);
      setPageLoading(false);
    }, 800);
  };

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

  // Page Loading Screen
  if (pageLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center flex flex-col justify-center items-center">
          <div className="train-container">
            <div className="track"></div>
            <div className="train"></div>
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // About/Contact Page
  if (showAboutContact) {
    return (
      <AboutContact 
        section={aboutContactSection} 
        setShowLanding={setShowLanding}
        setShowAboutContact={setShowAboutContact}
      />
    );
  }

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


        {/* Responsive Navbar */}
        <nav className='absolute flex items-center justify-between w-full top-0 left-0 navb px-4 md:px-8 lg:px-16 py-2'>
          <div className='flex gap-2 items-center justify-center'>
            <img src={orionLogo} alt="ORION Logo" className="h-16 w-16 md:h-24 md:w-24 object-contain rounded-full" />
            <div>
              <h1 className="text-xl md:text-3xl font-bold text-black font-sans leading-tight">ORION</h1>
              {/* H2 is hidden on mobile and appears on medium screens and up */}
              <h2 className="hidden md:block text-xs md:text-base lg:text-xl text-gray-800 leading-tight">
                Operational Rail Intelligence & Optimization Network
              </h2>
            </div>
          </div>
          <button
            className="px-4 py-2 md:px-6 md:py-3 z-20 bg-[#11686b] text-white rounded-md font-semibold shadow hover:bg-[#278083] transition-colors text-sm md:text-base whitespace-nowrap"
            onClick={() => setShowLanding(false)}
          >
            Get Started
          </button>
        </nav>

        {/* Main content area with responsive padding */}
        <div className="flex-grow flex flex-col items-center justify-center w-full px-4 md:px-8 pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Hero Section */}
          <div className="glass-card flex flex-col items-center w-full z-10 relative p-6 md:p-12 mb-12 md:mb-16">
            <p className="text-gray-900 text-4xl sm:text-6xl lg:text-8xl font-bold text-center">
              AI-Driven Railway Traffic <span className='snp'>Optimization</span> for Maximizing Section Throughput
            </p>
          </div>

          {/* Feature Cards Section */}
          <div className='z-10 w-full max-w-6xl'>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full z-10">
              {/* Card 1 */}
              <div className="bg-white bg-opacity-80 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
                <Map className="w-12 h-12 md:w-16 mb-4" style={{ color: '#11686b' }} />
                <span className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Live Tracking</span>
                <span className="text-base text-gray-700">Monitor train positions in real time across the network.</span>
              </div>
              {/* Card 2 */}
              <div className="bg-white bg-opacity-80 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
                <ShieldCheck className="w-12 h-12 md:w-16 mb-4" style={{ color: '#11686b' }} />
                <span className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Reliable Service</span>
                <span className="text-base text-gray-700">Ensuring consistent and dependable railway operations.</span>
              </div>
              {/* Card 3 */}
              <div className="bg-white bg-opacity-80 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
                <TimerReset className="w-12 h-12 md:w-16 mb-4" style={{ color: '#11686b' }} />
                <span className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Minimum Delay</span>
                <span className="text-base text-gray-700">Reduce delays with intelligent scheduling and control.</span>
              </div>
              {/* Card 4 */}
              <div className="bg-white bg-opacity-80 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
                <BrainCog className="w-12 h-12 md:w-16 mb-4" style={{ color: '#11686b' }} />
                <span className="text-xl md:text-2xl font-bold text-gray-900 mb-2">AI Based Scheduling</span>
                <span className="text-base text-gray-700">Leverage AI to optimize train schedules and routes.</span>
              </div>
              {/* Card 5 */}
              <div className="bg-white bg-opacity-80 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
                <LayoutDashboard className="w-12 h-12 md:w-16 mb-4" style={{ color: '#11686b' }} />
                <span className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Real Time Control Dashboard</span>
                <span className="text-base text-gray-700">Centralized dashboard for live control and monitoring.</span>
              </div>
              {/* Card 6 */}
              <div className="bg-white bg-opacity-80 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
                <BellDot className="w-12 h-12 md:w-16 mb-4" style={{ color: '#11686b' }} />
                <span className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Alerts and AI Recommendations</span>
                <span className="text-base text-gray-700">Get instant alerts and actionable AI recommendations.</span>
              </div>
            </div>
          </div>
        </div>
        <div className='bg-[#11686b] text-white w-full py-8 md:py-12 z-10'>
          <div className='max-w-6xl mx-auto px-4 md:px-8 lg:px-16'>
            <div className='flex flex-col md:flex-row md:justify-between md:items-start gap-8'>
              {/* Brand Section */}
              <div className='flex-1'>
                <h1 className='text-2xl md:text-3xl font-bold mb-2'>ORION</h1>
                <p className='text-sm md:text-base text-gray-200'>Speeding up Railway networks using AI</p>
              </div>
              
              {/* Quick Links Section */}
              <div className='flex-1'>
                <h2 className='text-xl md:text-2xl font-semibold mb-4'>Quick Links</h2>
                <div className='flex flex-col sm:flex-row gap-3 sm:gap-4'>
                  <button
                    className="px-4 py-2 md:px-6 md:py-3 z-20 bg-white text-[#11686b] rounded-md font-semibold shadow hover:bg-[#278083] hover:text-white transition-colors text-sm md:text-base whitespace-nowrap"
                    onClick={() => setShowLanding(false)}
                  >
                    Get Started
                  </button>
                  <button 
                    className='px-4 py-2 md:px-6 md:py-3 z-20 bg-[#11686b] border-2 border-white text-white rounded-md font-semibold shadow hover:bg-[#278083] transition-colors text-sm md:text-base whitespace-nowrap'
                    onClick={() => navigateToAboutContact('about')}
                  >
                    About Us
                  </button>
                  <button 
                    className='px-4 py-2 md:px-6 md:py-3 z-20 bg-[#11686b] border-2 border-white text-white rounded-md font-semibold shadow hover:bg-[#278083] transition-colors text-sm md:text-base whitespace-nowrap'
                    onClick={() => navigateToAboutContact('contact')}
                  >
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
            
            {/* Bottom Border - 90% width, centered */}
            <div className='flex justify-center mt-8 md:mt-12'>
              <div className='w-[90%] border-b-2 border-white opacity-50'></div>
            </div>
          </div>
        </div>
        <div className='bg-[#11686b] text-white w-[100%] py-2 z-10'>
          <p className='text-center'>© 2025 ORION | All Right Reserved</p>
        </div>
      </div>

    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center flex flex-col justify-center items-center">
          {/* <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div> */}
          <div className="train-container">
            <div className="track"></div>
            <div className="train"></div>
          </div>
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
              <div 
                className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => setShowLanding(true)}
              >
                <div className="">
                  <img
                    src={orionLogo}
                    alt="Rail Control Logo"
                    className="h-12 w-12 object-contain"
                  />
                </div>
                <span className="text-xl font-bold text-gray-900">ORION</span>
                <div className="hidden md:block text-xs text-gray-500 ml-2">
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