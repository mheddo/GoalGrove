import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useAppSelector } from '../goal/../../lib/hooks';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function GoalDetails() {
	const router = useRouter();
	const { id } = useLocalSearchParams();
	const goals = useAppSelector((state) => state.goals.goals);

	const goal = goals.find((goal) => goal.id === id);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (goal) {
			setLoading(false);
		}
	}, [goal]);

	if (loading) {
		return (
			<View>
				<Text>Loading...</Text>
			</View>
		);
	}

	if (!goal) {
		return (
			<View>
				<Text>Goal not found</Text>
			</View>
		);
	}

	const getPrerequisites = (goalId: string) => {
		const currentGoal = goals.find((goal) => goal.id === goalId);
		if (!currentGoal) return [];

		return currentGoal.subgoals.map((subGoal) => {
			return goals.find((goal) => goal.id === subGoal.id);
		});
	};

	const prerequisites = getPrerequisites(goal.id);

	return (
		<View>
			<Text>{goal.title}</Text>
			<Text>Prerequisites:</Text>
			{prerequisites.length > 0 ? (
				prerequisites.map((prereq) => (
					<View key={prereq?.id}>
						<Text>{prereq?.title}</Text>
					</View>
				))
			) : (
				<Text>No prerequisites for this goal.</Text>
			)}

			<Button
				title="Back to Goals"
				onPress={() => router.back()}
			/>
		</View>
	);
}
