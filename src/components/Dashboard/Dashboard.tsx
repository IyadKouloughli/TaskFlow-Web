import React, { useState } from 'react';
import { BarChart3, Calendar, CheckCircle, Clock, Plus } from 'lucide-react';
import Header from '../Layout/Header';
import TaskForm from './TaskForm';
import TaskCard from './TaskCard';
import TaskFiltersComponent from './TaskFilters';
import AlertsPanel from './AlertsPanel';
import { useTasks } from '../../hooks/useTasks';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  
  const {
    tasks,
    filters,
    setFilters,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
    upcomingTasks,
    overdueTasks,
    allTasksStats
  } = useTasks();

  const handleEditTask = (id: string, newTitle: string) => {
    updateTask(id, { title: newTitle });
  };

  const stats = [
    {
      title: 'Total Tasks',
      value: allTasksStats.total,
      icon: <BarChart3 size={20} />,
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      title: 'Completed',
      value: allTasksStats.completed,
      icon: <CheckCircle size={20} />,
      color: 'text-green-600 dark:text-green-400'
    },
    {
      title: 'Upcoming',
      value: upcomingTasks.length,
      icon: <Clock size={20} />,
      color: 'text-amber-600 dark:text-amber-400'
    },
    {
      title: 'Overdue',
      value: overdueTasks.length,
      icon: <Calendar size={20} />,
      color: 'text-red-600 dark:text-red-400'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header 
        onMenuToggle={() => setShowMobileMenu(!showMobileMenu)}
        showMenu={showMobileMenu}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Here's what you have on your plate today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
                <div className={`${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        {allTasksStats.total > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Progress</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{allTasksStats.completionRate.toFixed(1)}%</p>
              </div>
              <div className="w-16 h-16 relative">
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-gray-200 dark:text-gray-700"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-indigo-500"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray={`${allTasksStats.completionRate}, 100`}
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Alerts Panel */}
        <div className="mb-8">
          <AlertsPanel upcomingTasks={upcomingTasks} overdueTasks={overdueTasks} />
        </div>

        {/* Task Form - Mobile Toggle */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setShowTaskForm(!showTaskForm)}
            className="w-full bg-gradient-to-r from-indigo-500 to-emerald-500 text-white py-3 px-4 rounded-lg hover:from-indigo-600 hover:to-emerald-600 transition-all duration-300 font-medium flex items-center justify-center space-x-2"
          >
            <Plus size={20} />
            <span>{showTaskForm ? 'Hide' : 'Add'} Task Form</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Task Form */}
          <div className={`lg:col-span-1 ${showTaskForm ? 'block' : 'hidden lg:block'}`}>
            <TaskForm onAddTask={addTask} />
          </div>

          {/* Tasks List */}
          <div className="lg:col-span-2 space-y-6">
            <TaskFiltersComponent filters={filters} onFiltersChange={setFilters} />

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {filters.period === 'completed' ? 'Completed Tasks' : 'Active Tasks'}
                </h2>
              </div>
              
              <div className="p-6">
                {tasks.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={32} className="text-gray-400" />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-lg">
                      {filters.period === 'completed' ? 'No completed tasks yet' : 'No tasks found'}
                    </p>
                    <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                      {filters.period === 'completed' ? 'Complete some tasks to see them here' : 'Add a new task to get started'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {tasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onToggleComplete={toggleComplete}
                        onDelete={deleteTask}
                        onEdit={handleEditTask}
                        showEditOption={filters.period !== 'completed'}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;