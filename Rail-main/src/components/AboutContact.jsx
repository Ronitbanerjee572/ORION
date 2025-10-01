import React, { useEffect, useState, useRef } from 'react';
import { Users, Target, Award, Code, FileText, Cpu, Palette, Server } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';
import emailjs from '@emailjs/browser';
import orionLogo from '../assets/orion.png';
import DotGrid from './DotGrid';

function AboutContact({ section, setShowLanding, setShowAboutContact }) {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Scroll to the appropriate section
    if (section === 'about') {
      document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'contact') {
      document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [section]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.fullName || !formData.email || !formData.subject || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading('Sending message...');

    try {
      
      const serviceId = 'service_pb7f71m';
      const templateId = 'template_n61j8pq';
      const publicKey = '3hxiSa7XWetHM6tCH';

      const templateParams = {
        from_name: formData.fullName,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: 'ORION Team'
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      toast.success('Message sent successfully! We\'ll get back to you soon.', { id: loadingToast });
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        subject: '',
        message: ''
      });
      formRef.current?.reset();
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast.error('Failed to send message. Please try again later.', { id: loadingToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGetStarted = () => {
    setShowAboutContact(false);
    setShowLanding(false);
  };

  const handleLogoClick = () => {
    setShowAboutContact(false);
    setShowLanding(true);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col relative overflow-hidden">
      <Toaster position="top-right" />
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

      {/* Navbar */}
      <nav className='flex items-center justify-between w-full px-4 md:px-8 lg:px-16 py-4 z-10 bg-white bg-opacity-90 backdrop-blur-sm sticky top-0 shadow-sm'>
        <div 
          className='flex gap-2 items-center justify-center cursor-pointer hover:opacity-80 transition-opacity'
          onClick={handleLogoClick}
        >
          <img src={orionLogo} alt="ORION Logo" className="h-16 w-16 md:h-20 md:w-20 object-contain rounded-full" />
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-black font-sans leading-tight">ORION</h1>
            <h2 className="hidden md:block text-xs md:text-sm lg:text-base text-gray-800 leading-tight">
              Operational Rail Intelligence & Optimization Network
            </h2>
          </div>
        </div>
        <button
          className="px-4 py-2 md:px-6 md:py-3 z-20 bg-[#11686b] text-white rounded-md font-semibold shadow hover:bg-[#278083] transition-colors text-sm md:text-base whitespace-nowrap"
          onClick={handleGetStarted}
        >
          Get Started
        </button>
      </nav>

      {/* Main Content */}
      <div className="flex-1 z-10">
        {/* About Section */}
        <section id="about-section" className="py-16 md:py-24 px-4 md:px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About ORION</h2>
              <div className="w-24 h-1 bg-[#11686b] mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white bg-opacity-80 rounded-2xl shadow-lg p-8">
                <Target className="w-12 h-12 mb-4" style={{ color: '#11686b' }} />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-700 leading-relaxed">
                  To revolutionize railway operations through cutting-edge AI technology, ensuring maximum efficiency, 
                  safety, and reliability in rail transportation. We aim to minimize delays, optimize resource utilization, 
                  and provide real-time intelligent solutions for modern railway networks.
                </p>
              </div>

              <div className="bg-white bg-opacity-80 rounded-2xl shadow-lg p-8">
                <Award className="w-12 h-12 mb-4" style={{ color: '#11686b' }} />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-700 leading-relaxed">
                  To become the leading AI-powered railway optimization platform globally, setting new standards in 
                  operational excellence and passenger satisfaction. We envision a future where railway networks operate 
                  seamlessly with zero delays and maximum throughput.
                </p>
              </div>
            </div>

            <div className="bg-white bg-opacity-80 rounded-2xl shadow-lg p-8 mb-8">
              <Users className="w-12 h-12 mb-4" style={{ color: '#11686b' }} />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">What We Do</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                ORION (Operational Rail Intelligence & Optimization Network) is an advanced AI-driven platform designed 
                to optimize railway traffic and maximize section throughput. Our system provides:
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-[#11686b] mr-2">•</span>
                  <span><strong>Real-time Train Tracking:</strong> Monitor all trains across the network with precision</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#11686b] mr-2">•</span>
                  <span><strong>AI-Based Scheduling:</strong> Intelligent algorithms that optimize train schedules dynamically</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#11686b] mr-2">•</span>
                  <span><strong>Predictive Analytics:</strong> Anticipate delays and conflicts before they occur</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#11686b] mr-2">•</span>
                  <span><strong>Automated Recommendations:</strong> Get actionable insights powered by machine learning</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#11686b] mr-2">•</span>
                  <span><strong>Control Dashboard:</strong> Centralized interface for complete network oversight</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact-section" className="py-16 md:py-24 px-4 md:px-8 lg:px-16 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <div className="w-24 h-1 bg-[#11686b] mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">Get in touch with our team for any inquiries or support</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {/* Ronit Banerjee */}
              <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="w-20 h-20 bg-[#11686b] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code className="w-10 h-10" style={{ color: '#11686b' }} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Ronit Banerjee</h3>
                <p className="text-sm text-gray-800 font-semibold mb-2">(Team Lead)</p>
                <p className="text-sm text-[#11686b] font-semibold mb-2">Full Stack Developer</p>
                
              </div>

              {/* Sumit Modi */}
              <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="w-20 h-20 bg-[#11686b] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code className="w-10 h-10" style={{ color: '#11686b' }} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Sumit Modi</h3>
                <p className="text-sm text-[#11686b] font-semibold mb-2">Python Developer</p>
                
              </div>

              {/* Swajan Khasnobis */}
              <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="w-20 h-20 bg-[#11686b] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-10 h-10" style={{ color: '#11686b' }} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Swajan Khasnobis</h3>
                <p className="text-sm text-[#11686b] font-semibold mb-2">Documentation & Resource Management</p>
                
              </div>

              {/* Sunanda Sengupta */}
              <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="w-20 h-20 bg-[#11686b] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Cpu className="w-10 h-10" style={{ color: '#11686b' }} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Sunanda Sengupta</h3>
                <p className="text-sm text-[#11686b] font-semibold mb-2">Algorithm Designer</p>
                
              </div>

              {/* Anwesha Bhattacharya */}
              <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="w-20 h-20 bg-[#11686b] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Palette className="w-10 h-10" style={{ color: '#11686b' }} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Anwesha Bhattacharya</h3>
                <p className="text-sm text-[#11686b] font-semibold mb-2">UI/UX Designer</p>
                
              </div>

              {/* Sagnik Bose */}
              <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="w-20 h-20 bg-[#11686b] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Server className="w-10 h-10" style={{ color: '#11686b' }} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Sagnik Bose</h3>
                <p className="text-sm text-[#11686b] font-semibold mb-2">Backend Developer</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Send us a Message</h3>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#11686b] focus:border-transparent outline-none transition"
                      placeholder="John Doe"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#11686b] focus:border-transparent outline-none transition"
                      placeholder="john@example.com"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#11686b] focus:border-transparent outline-none transition"
                    placeholder="How can we help you?"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#11686b] focus:border-transparent outline-none transition resize-none"
                    placeholder="Your message here..."
                    disabled={isSubmitting}
                  ></textarea>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-[#11686b] text-white rounded-lg font-semibold shadow-lg hover:bg-[#278083] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className='bg-[#11686b] text-white w-full py-4 z-10'>
        <p className='text-center text-sm'>© 2025 ORION | All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default AboutContact;
