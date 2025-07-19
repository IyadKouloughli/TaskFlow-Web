import React, { useState } from 'react';
import { Plus, Calendar, Flag, Palette } from 'lucide-react';
import { Task } from '../../types/Task';

interface TaskFormProps {
  onAddTask: (task: Omit<Task, 'id' | 'userId' | 'createdAt'>) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [importance, setImportance] = useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = useState('');
  const [colorTag, setColorTag] = useState('#3b82f6');
  const [showColorPicker, setShowColorPicker] = useState(false);

  const colorOptions = [
    '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#f97316', '#06b6d4', '#84cc16'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !dueDate) return;

    onAddTask({
      title: title.trim(),
      importance,
      dueDate: new Date(dueDate),
      colorTag,
      completed: false
    });

    setTitle('');
    setDueDate('');
    setImportance('medium');
    setColorTag('#3b82f6');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Add New Task</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Task Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="What needs to be done?"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="importance" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <Flag size={16} className="inline mr-1" />
              Priority
            </label>
            <select
              id="importance"
              value={importance}
              onChange={(e) => setImportance(e.target.value as 'low' | 'medium' | 'high')}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>

          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <Calendar size={16} className="inline mr-1" />
              Due Date
            </label>
            <input
              type="datetime-local"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            <Palette size={16} className="inline mr-1" />
            Color Tag
          </label>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600"
              style={{ backgroundColor: colorTag }}
            />
            {showColorPicker && (
              <div className="flex space-x-2">
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => {
                      setColorTag(color);
                      setShowColorPicker(false);
                    }}
                    className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600 hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-500 to-emerald-500 text-white py-2 px-4 rounded-lg hover:from-indigo-600 hover:to-emerald-600 transition-all duration-300 font-medium flex items-center justify-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Task</span>
        </button>
      </div>
    </form>
  );
};

export default TaskForm;