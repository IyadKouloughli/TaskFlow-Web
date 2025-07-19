import React, { useState } from 'react';
import { Clock, Trash2, CheckCircle, Circle, AlertCircle } from 'lucide-react';
import { Task } from '../../types/Task';
import { formatDistanceToNow, isToday, isTomorrow, isPast } from 'date-fns';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit?: (id: string, newTitle: string) => void;
  showEditOption?: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onToggleComplete, onDelete, onEdit, showEditOption = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleEditSubmit = () => {
    if (editTitle.trim() && onEdit) {
      onEdit(task.id, editTitle.trim());
      setIsEditing(false);
    }
  };

  const handleEditCancel = () => {
    setEditTitle(task.title);
    setIsEditing(false);
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'high':
        return 'border-red-500 bg-red-50 dark:bg-red-900/20';
      case 'medium':
        return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'low':
        return 'border-green-500 bg-green-50 dark:bg-green-900/20';
      default:
        return 'border-gray-300 bg-gray-50 dark:bg-gray-700';
    }
  };

  const getImportanceTextColor = (importance: string) => {
    switch (importance) {
      case 'high':
        return 'text-red-600 dark:text-red-400';
      case 'medium':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'low':
        return 'text-green-600 dark:text-green-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getTimeStatus = () => {
    if (isPast(task.dueDate) && !task.completed) {
      return { text: 'Overdue', color: 'text-red-600 dark:text-red-400', icon: <AlertCircle size={16} /> };
    }
    if (isToday(task.dueDate)) {
      return { text: 'Due today', color: 'text-orange-600 dark:text-orange-400', icon: <Clock size={16} /> };
    }
    if (isTomorrow(task.dueDate)) {
      return { text: 'Due tomorrow', color: 'text-blue-600 dark:text-blue-400', icon: <Clock size={16} /> };
    }
    return { 
      text: `Due ${formatDistanceToNow(task.dueDate, { addSuffix: true })}`, 
      color: 'text-gray-600 dark:text-gray-400', 
      icon: <Clock size={16} /> 
    };
  };

  const timeStatus = getTimeStatus();

  return (
    <div className={`p-4 rounded-lg border-l-4 transition-all duration-300 hover:shadow-md ${getImportanceColor(task.importance)} ${task.completed ? 'opacity-60' : ''}`}>
      <div className="flex items-start space-x-3">
        <button
          onClick={() => onToggleComplete(task.id)}
          className={`mt-1 transition-colors duration-200 ${task.completed ? 'text-green-500' : 'text-gray-400 hover:text-green-500'}`}
        >
          {task.completed ? <CheckCircle size={20} /> : <Circle size={20} />}
        </button>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleEditSubmit()}
                onBlur={handleEditSubmit}
                className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                autoFocus
              />
              <button
                onClick={handleEditCancel}
                className="text-gray-400 hover:text-gray-600 text-sm"
              >
                Cancel
              </button>
            </div>
          ) : (
            <h3 
              className={`font-semibold text-gray-900 dark:text-white ${task.completed ? 'line-through' : ''} ${showEditOption && !task.completed ? 'cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400' : ''}`}
              onClick={() => showEditOption && !task.completed && setIsEditing(true)}
              title={showEditOption && !task.completed ? 'Click to edit' : ''}
            >
              {task.title}
            </h3>
          )}
          
          <div className="flex items-center space-x-4 mt-2">
            <span className={`text-sm font-medium ${getImportanceTextColor(task.importance)}`}>
              {task.importance.charAt(0).toUpperCase() + task.importance.slice(1)} Priority
            </span>
            
            <div className={`flex items-center space-x-1 text-sm ${timeStatus.color}`}>
              {timeStatus.icon}
              <span>{timeStatus.text}</span>
            </div>
          </div>

          {task.colorTag && (
            <div className="mt-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: task.colorTag }}
              />
            </div>
          )}
        </div>

        <button
          onClick={() => onDelete(task.id)}
          className="text-gray-400 hover:text-red-500 transition-colors duration-200"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;