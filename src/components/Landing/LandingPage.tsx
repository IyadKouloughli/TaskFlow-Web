import React from 'react';
import { ArrowRight, CheckCircle, Clock, Star, Shield, Smartphone, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../Layout/Header';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Smart Task Management",
      description: "Organize tasks with importance levels, due dates, and custom color tags"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Deadline Tracking",
      description: "Real-time countdown timers and alerts for upcoming deadlines"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Priority System",
      description: "Auto-sort tasks by importance and time sensitivity"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Personal",
      description: "Your tasks are private and stored securely per user account"
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Fully Responsive",
      description: "Works perfectly on desktop, tablet, and mobile devices"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Multi-User Support",
      description: "Each user has their own personalized task dashboard"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header isLandingPage={true} />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Organize Your Life with
              <span className="bg-gradient-to-r from-indigo-500 to-emerald-500 bg-clip-text text-transparent">
                {' '}TaskFlow
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              A modern, intuitive task manager that helps you stay organized, meet deadlines, 
              and boost productivity with smart prioritization and beautiful design.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="bg-gradient-to-r from-indigo-500 to-emerald-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-indigo-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg"
              >
                <span>Get Started</span>
                <ArrowRight size={20} />
              </Link>
              
              <Link
                to="/login"
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-3 rounded-lg font-semibold border-2 border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Login
              </Link>
            </div>
          </div>

          {/* Task Preview Mockup */}
          <div className="mt-16 relative">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Today's Tasks
                  </h3>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
                    <div className="w-5 h-5 border-2 border-red-500 rounded mr-3"></div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">Complete project presentation</p>
                      <p className="text-sm text-red-600 dark:text-red-400">Due in 2 hours • High Priority</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                    <div className="w-5 h-5 border-2 border-yellow-500 rounded mr-3"></div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">Review team feedback</p>
                      <p className="text-sm text-yellow-600 dark:text-yellow-400">Due tomorrow • Medium Priority</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
                    <div className="w-5 h-5 bg-green-500 rounded mr-3 flex items-center justify-center">
                      <CheckCircle size={16} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white line-through opacity-60">Update documentation</p>
                      <p className="text-sm text-green-600 dark:text-green-400">Completed • Low Priority</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to Stay Organized
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              TaskFlow combines powerful features with beautiful design to help you manage tasks efficiently.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-lg flex items-center justify-center text-white mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-500 to-emerald-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Productivity?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have already improved their task management with TaskFlow.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center space-x-2 bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <span>Start Your Free Account</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;