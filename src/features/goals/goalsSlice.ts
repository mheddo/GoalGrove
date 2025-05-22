import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../lib/store';

export type Subgoal = {
	id: string;
	title: string;
	children?: Subgoal[];
};

export type Goal = {
	id: string;
	title: string;
	subgoals: Subgoal[];
};

type GoalsState = {
	goals: Goal[];
};

const initialState: GoalsState = {
	goals: [
		{
			id: 'goal-1',
			title: 'Learn React Native',
			subgoals: [],
		},
		{
			id: 'goal-2',
			title: 'Build My First App',
			subgoals: [],
		},
		{
			id: 'goal-3',
			title: 'Publish to App Store',
			subgoals: [],
		},
	],
};

function addSubgoalAtPath(
	subgoals: Subgoal[],
	path: string[],
	newSubgoal: Subgoal
): Subgoal[] {
	if (path.length === 0) {
		return [...subgoals, newSubgoal];
	}

	return subgoals.map((sub) => {
		if (sub.id === path[0]) {
			const children = sub.children ? [...sub.children] : [];
			return {
				...sub,
				children: addSubgoalAtPath(children, path.slice(1), newSubgoal),
			};
		}
		return sub;
	});
}

const goalsSlice = createSlice({
	name: 'goals',
	initialState,
	reducers: {
		addGoal: (state, action: PayloadAction<{ id: string; title: string }>) => {
			state.goals.push({
				id: action.payload.id,
				title: action.payload.title,
				subgoals: [],
			});
		},
		deleteGoal: (state, action: PayloadAction<string>) => {
			state.goals = state.goals.filter((g) => g.id !== action.payload);
		},
		addSubgoal: (
			state,
			action: PayloadAction<{
				goalId: string;
				path: string[]; // path to where to insert (array of subgoal IDs)
				newSubgoal: Subgoal;
			}>
		) => {
			const goal = state.goals.find((g) => g.id === action.payload.goalId);
			if (!goal) return;

			goal.subgoals = addSubgoalAtPath(
				goal.subgoals,
				action.payload.path,
				action.payload.newSubgoal
			);
		},
	},
});

export const selectGoals = (state: RootState) => state.goals.goals;

export const selectGoalById = (goalId: string) => (state: RootState) =>
	state.goals.goals.find((g) => g.id === goalId);

export const { addGoal, deleteGoal, addSubgoal } = goalsSlice.actions;

export default goalsSlice.reducer;
