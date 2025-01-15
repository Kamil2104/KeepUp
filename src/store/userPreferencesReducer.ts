import { createSlice } from '@reduxjs/toolkit';

import { TagType } from '../interfaces/TasksInterfaces';

export interface UserPreferencesType {
  tags: TagType[];
}

const initialState: UserPreferencesType = {
    tags: [
      { name: 'Work', backgroundColor: 'bg-blue-400', borderColor: 'border-blue-400' },
      { name: 'School', backgroundColor: 'bg-yellow-400', borderColor: 'border-yellow-400' },
      { name: 'Home', backgroundColor: 'bg-green-400', borderColor: 'border-green-400' },
    ]
}

const userTasksSlice = createSlice({
  name: 'UserPreferencesType',
  initialState,
  reducers: {

  },
});

export default userTasksSlice.reducer;