import React from 'react';
import { Search, Calendar, Clock, CheckCircle, Filter } from 'lucide-react';
import { TaskFilters } from '../../types/Task';

interface TaskFiltersProps {
  filters: TaskFilters;
  onFiltersChange: (filters: TaskFilters) => void;
}

const TaskFiltersComponent: React.FC<TaskFiltersProps> = ({ filters, onFiltersChange }) => {
  const filterOptions = [
    { key: 'all', label: 'All Tasks', icon: <Filter size={16} /> },
    { key: 'today', label: 'Today', icon: <Calendar size={16} /> },
    { key: 'week', label: 'This Week', icon: <Clock size={16} /> },
    { key: 'completed', label: 'Completed', icon: <CheckCircle size={16} /> }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={filters.search}
            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {filterOptions.map((option) => (
            <button
              key={option.key}
              onClick={() => onFiltersChange({ ...filters, period: option.key as TaskFilters['period'] })}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                filters.period === option.key
                  ? 'bg-indigo-500 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {option.icon}
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskFiltersComponent;