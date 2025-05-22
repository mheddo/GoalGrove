import '@/global.css';
import { Stack } from 'expo-router';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';

// This is the root layout for the app, shared among all screens under the app directory.
export default function RootLayout() {
	return (
		<GluestackUIProvider>
			<Stack />
		</GluestackUIProvider>
	);
}
