import { configureStore } from '@reduxjs/toolkit';
import goalsReducer from '../features/goals/goalsSlice';

export const store = configureStore({
	reducer: {
		goals: goalsReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
