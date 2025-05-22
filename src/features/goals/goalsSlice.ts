import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Goal } from './goalType';

const initialState: { goals: Goal[] } = {
	goals: [
		{
			id: '1',
			title: 'Learn React Native',
			prerequisites: [],
		},
		{
			id: '2',
			title: 'Build a mobile app',
			prerequisites: ['1'],
		},
		{
			id: '3',
			title: 'Launch an app on the App Store',
			prerequisites: ['2'],
		},
		{
			id: '4',
			title: 'Complete JavaScript Basics',
			prerequisites: [],
		},
	],
};

const goalsSlice = createSlice({
	name: 'goals',
	initialState,
	reducers: {
		setGoals: (state, action: PayloadAction<Goal[]>) => {
			state.goals = action.payload;
		},
	},
});

export const { setGoals } = goalsSlice.actions;

export const selectGoals = (state: RootState) => state.goals.goals;

export default goalsSlice.reducer;
