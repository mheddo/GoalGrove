import { useAppSelector } from '../lib/hooks';
import { Link } from 'expo-router';
import { View, Text, FlatList, Pressable } from 'react-native';

export default function HomeScreen() {
	const goals = useAppSelector((state) => state.goals.goals);

	return (
		<View>
			<Text>Your Goals</Text>
			<FlatList
				data={goals}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<Link
						href={`/goal/${item.id}`}
						asChild
					>
						<Pressable>
							<Text>{item.title}</Text>
						</Pressable>
					</Link>
				)}
				ListEmptyComponent={
					<Text>No goals yet! Add some goals to get started.</Text>
				}
			/>
		</View>
	);
}
