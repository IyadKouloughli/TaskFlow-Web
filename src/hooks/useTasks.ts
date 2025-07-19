import { useState, useEffect } from 'react';
import { Task, TaskFilters } from '../types/Task';
import { useAuth } from '../contexts/AuthContext';
import { isToday, isThisWeek, addDays } from 'date-fns';

export const useTasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState<TaskFilters>({
    period: 'all',
    search: ''
  });

  useEffect(() => {
    if (user) {
      const savedTasks = localStorage.getItem(`tasks_${user.id}`);
      if (savedTasks) {
        try {
          const parsedTasks = JSON.parse(savedTasks).map((task: any) => ({
            ...task,
            dueDate: new Date(task.dueDate),
            createdAt: new Date(task.createdAt)
          }));
          setTasks(parsedTasks);
        } catch (error) {
          console.error('Error parsing saved tasks:', error);
          setTasks([]);
        }
      }
    }
  }, [user]);

  const saveTasks = (updatedTasks: Task[]) => {
    if (user) {
      try {
        localStorage.setItem(`tasks_${user.id}`, JSON.stringify(updatedTasks));
        setTasks(updatedTasks);
      } catch (error) {
        console.error('Error saving tasks:', error);
      }
    }
  };

  const addTask = (task: Omit<Task, 'id' | 'userId' | 'createdAt'>) => {
    if (!user) return;

    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      userId: user.id,
      createdAt: new Date()
    };

    const updatedTasks = [...tasks, newTask];
    saveTasks(updatedTasks);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, ...updates } : task
    );
    saveTasks(updatedTasks);
  };

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    saveTasks(updatedTasks);
  };

  const toggleComplete = (id: string) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasks(updatedTasks);
  };

  const getFilteredTasks = () => {
    let filtered = tasks;

    // Filter by period
    switch (filters.period) {
      case 'today':
        filtered = filtered.filter(task => isToday(task.dueDate));
        break;
      case 'week':
        filtered = filtered.filter(task => isThisWeek(task.dueDate));
        break;
      case 'completed':
        filtered = filtered.filter(task => task.completed);
        break;
      default:
        // For 'all', show all tasks (both completed and incomplete)
        break;
    }

    // Filter by search
    if (filters.search) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Sort by importance and due date
    return filtered.sort((a, b) => {
      // If showing completed tasks, sort by completion status first
      if (filters.period === 'all') {
        if (a.completed !== b.completed) {
          return a.completed ? 1 : -1; // Show incomplete tasks first
        }
      }
      
      const importanceOrder = { high: 3, medium: 2, low: 1 };
      const importanceDiff = importanceOrder[b.importance] - importanceOrder[a.importance];
      
      if (importanceDiff !== 0) return importanceDiff;
      
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
  };

  const getAllTasksStats = () => {
    const completedCount = tasks.filter(task => task.completed).length;
    const totalCount = tasks.length;
    const activeCount = totalCount - completedCount;
    
    return {
      total: totalCount,
      completed: completedCount,
      active: activeCount,
      completionRate: totalCount > 0 ? (completedCount / totalCount) * 100 : 0
    };
  };

  const getUpcomingTasks = () => {
    const now = new Date();
    const tomorrow = addDays(now, 1);
    
    return tasks.filter(task => 
      !task.completed && 
      task.dueDate <= tomorrow &&
      task.dueDate >= now
    );
  };

  const getOverdueTasks = () => {
    const now = new Date();
    return tasks.filter(task => 
      !task.completed && 
      task.dueDate < now
    );
  };

  return {
    tasks: getFilteredTasks(),
    filters,
    setFilters,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
    upcomingTasks: getUpcomingTasks(),
    overdueTasks: getOverdueTasks(),
    allTasksStats: getAllTasksStats()
  };
};