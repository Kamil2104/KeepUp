import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Task } from '../interfaces/TasksInterfaces';

const initialState: Task[] = [
  // {
  //   name: 'Form responsiveness',
  //   description: 'Make the form responsive for mobile and tablet devices',
  //   subtasks: [{ name: 'Background video', completed: true }, { name: 'Headings', completed: true }, { name: 'Inputs', completed: false }],
  //   status: 'In progress',
  //   dueDate: '14.01.2024',
  //   priority: 'Medium',
  //   tag: { name: 'Work', backgroundColor: 'bg-blue-400', borderColor: 'border-blue-400' }
  // },
  // {
  //   name: 'Math test',
  //   description: 'Prepare for the math test',
  //   subtasks: [{ name: 'Addition', completed: true }, { name: 'Subtraction', completed: true }, { name: 'Multiplication', completed: false }, { name: 'Division', completed: false }],
  //   status: 'In progress',
  //   priority: 'Low',
  //   tag: { name: 'School', backgroundColor: 'bg-yellow-400', borderColor: 'border-yellow-400' }
  // },
  // {
  //   name: 'Cleaning',
  //   description: 'Clean the house',
  //   status: 'To do',
  //   dueDate: '1.01.2024',
  //   priority: 'High',
  //   tag: { name: 'Home', backgroundColor: 'bg-green-400', borderColor: 'border-green-400' }
  // },
  // {
  //   name: 'English test',
  //   description: 'Prepare for the english test which is about the present simple tense',
  //   status: 'To do',
  //   dueDate: '6.01.2024',
  //   priority: 'Medium',
  //   tag: { name: 'School', backgroundColor: 'bg-yellow-400', borderColor: 'border-yellow-400' }
  // }
]

const userTasksSlice = createSlice({
  name: 'userTasks',
  initialState,
  reducers: {
    addNewTask(state, action: PayloadAction<Task>) {
      state.push(action.payload);
    },
    completeTask: (state, action: PayloadAction<string>) => {
      return state.filter(task => task.name !== action.payload);
    }
  },
});

export const { addNewTask, completeTask } = userTasksSlice.actions;

export default userTasksSlice.reducer;