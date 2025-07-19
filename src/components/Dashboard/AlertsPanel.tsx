import React from 'react';
import { AlertCircle, Bell, Clock } from 'lucide-react';
import { Task } from '../../types/Task';
import { formatDistanceToNow } from 'date-fns';

interface AlertsPanelProps {
  upcomingTasks: Task[];
  overdueTasks: Task[];
}

const AlertsPanel: React.FC<AlertsPanelProps> = ({ upcomingTasks, overdueTasks }) => {
  if (upcomingTasks.length === 0 && overdueTasks.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-2 mb-4">
        <Bell size={20} className="text-amber-500" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Alerts</h2>
      </div>

      <div className="space-y-4">
        {overdueTasks.length > 0 && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <AlertCircle size={18} className="text-red-600 dark:text-red-400" />
              <h3 className="font-medium text-red-800 dark:text-red-300">Overdue Tasks</h3>
            </div>
            <div className="space-y-2">
              {overdueTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between">
                  <span className="text-sm text-red-700 dark:text-red-300">{task.title}</span>
                  <span className="text-xs text-red-600 dark:text-red-400">
                    {formatDistanceToNow(task.dueDate, { addSuffix: true })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {upcomingTasks.length > 0 && (
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Clock size={18} className="text-amber-600 dark:text-amber-400" />
              <h3 className="font-medium text-amber-800 dark:text-amber-300">Upcoming Deadlines</h3>
            </div>
            <div className="space-y-2">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between">
                  <span className="text-sm text-amber-700 dark:text-amber-300">{task.title}</span>
                  <span className="text-xs text-amber-600 dark:text-amber-400">
                    {formatDistanceToNow(task.dueDate, { addSuffix: true })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsPanel;