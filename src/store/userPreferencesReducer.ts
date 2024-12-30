import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserPreferences {
  filterType: string;
  sortType: [string, string];
}

const initialState: UserPreferences = {
    filterType: 'All',
    sortType: ['Category', 'Descending'],
}

const userTasksSlice = createSlice({
  name: 'userPreferences',
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