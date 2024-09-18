import Header from './Header.jsx';
import Shop from './Shop.jsx';
import CartContextProvider from '../store/CartContext.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {

	const queryClient = new QueryClient();
	return (
		<QueryClientProvider client={queryClient}>
			<CartContextProvider>
				<Header />
				<Shop />
			</CartContextProvider>
		</QueryClientProvider>
	)
}

export default App;
