import { configureStore } from '@reduxjs/toolkit';

import userTasksReducer from './store/userTasksReducer';
import userPreferencesReducer from './store/userPreferencesReducer';

const store = configureStore({
    reducer: {
        userTasks: userTasksReducer,
        userPreferences: userPreferencesReducer
    }
})

export default store;