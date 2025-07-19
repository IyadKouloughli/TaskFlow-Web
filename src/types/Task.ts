export interface Task {
  id: string;
  title: string;
  importance: 'low' | 'medium' | 'high';
  dueDate: Date;
  colorTag: string;
  completed: boolean;
  createdAt: Date;
  userId: string;
}

export interface TaskFilters {
  period: 'today' | 'week' | 'all' | 'completed';
  search: string;
}