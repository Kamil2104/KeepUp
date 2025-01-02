import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TagType } from '../interfaces/TasksInterfaces';

export interface UserPreferencesType {
  filterType: string;
  sortType: [string, string];
  tags: TagType[];
}

const initialState: UserPreferencesType = {
    filterType: 'All',
    sortType: ['Category', 'Descending'],
    tags: [
      { name: 'Work', backgroundColor: 'bg-blue-400', borderColor: 'border-blue-400' },
      { name: 'School', backgroundColor: 'bg-yellow-400', borderColor: 'border-yellow-400' },
      { name: 'Home', backgroundColor: 'bg-green-400', borderColor: 'border-green-400' }
    ]
}

const userTasksSlice = createSlice({
  name: 'UserPreferencesType',
  initialState,
  reducers: {
    setFilterType(state, action: PayloadAction<string>) {
        state.filterType = action.payload;
    },
    setSortType(state, action: PayloadAction<[string, string]>) {
      state.sortType = action.payload;
    }
  },
});

export const { setFilterType, setSortType } = userTasksSlice.actions;

export default userTasksSlice.reducer;