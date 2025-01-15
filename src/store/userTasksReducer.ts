import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Task } from '../interfaces/TasksInterfaces';

const initialState: Task[] = [
  {
    name: 'Form responsiveness',
    description: 'Make the form responsive for mobile and tablet devices',
    subtasks: [{ name: 'Background video', completed: true }, { name: 'Headings', completed: true }, { name: 'Inputs', completed: false }],
    status: 'In progress',
    dueDate: '2024-01-14',
    priority: 'Medium',
    tag: { name: 'Work', backgroundColor: 'bg-blue-400', borderColor: 'border-blue-400' }
  },
  {
    name: 'Math test',
    description: 'Prepare for the math test',
    subtasks: [{ name: 'Addition', completed: true }, { name: 'Subtraction', completed: true }, { name: 'Multiplication', completed: false }, { name: 'Division', completed: false }],
    status: 'In progress',
    priority: 'Low',
    tag: { name: 'School', backgroundColor: 'bg-yellow-400', borderColor: 'border-yellow-400' }
  },
  {
    name: 'Cleaning',
    description: 'Clean the house',
    status: 'To do',
    dueDate: '2024-01-01',
    priority: 'High',
    tag: { name: 'Home', backgroundColor: 'bg-green-400', borderColor: 'border-green-400' }
  },
  {
    name: 'Subtasks',
    description: 'Resolve issues with subtasks',
    subtasks: [{ name: 'Create functionality for deleting a subtask', completed: true }, { name: 'Enable ediitng subtasks title', completed: false }],
    status: 'To do',
    dueDate: '2024-01-12',
    priority: 'High',
    tag: { name: 'Work', backgroundColor: 'bg-blue-400', borderColor: 'border-blue-400' }
  }
]

const userTasksSlice = createSlice({
  name: 'userTasks',
  initialState,
  reducers: {
    addNewTask(state, action: PayloadAction<Task>) {
      state.push(action.payload);
    },
    updateTask(state, action: PayloadAction<Task>) {
      const index = state.findIndex(task => task.name === action.payload.name);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    removeSubtask(state, action: PayloadAction<{ taskName: string; subtaskName: string }>) {
      const { taskName, subtaskName } = action.payload;
      const task = state.find(task => task.name === taskName);
      if (task && task.subtasks) {
        task.subtasks = task.subtasks.filter(subtask => subtask.name !== subtaskName);
      }
    },
    updateSubtask(state, action: PayloadAction<{ taskName: string; subtaskName: string; updatedSubtask: { name: string; completed: boolean } }>) {
      const { taskName, subtaskName, updatedSubtask } = action.payload;
      const task = state.find(task => task.name === taskName);
      if (task && task.subtasks) {
        const subtaskIndex = task.subtasks.findIndex(subtask => subtask.name === subtaskName);
        if (subtaskIndex !== -1) {
          task.subtasks[subtaskIndex] = updatedSubtask;
        }
      }
    },
  },
});

export const { addNewTask, updateTask, removeSubtask, updateSubtask } = userTasksSlice.actions;

export default userTasksSlice.reducer;