import '@/global.css';
import { Stack } from 'expo-router';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Provider } from 'react-redux';
import { store } from '../lib/store';

// This is the root layout for the app, shared among all screens under the app directory.
export default function RootLayout() {
	return (
		<Provider store={store}>
			<GluestackUIProvider>
				<Stack />
			</GluestackUIProvider>
		</Provider>
	);
}
