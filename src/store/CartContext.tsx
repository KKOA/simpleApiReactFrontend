import { createContext, useReducer, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IItem } from '../interfaces/IItem';
import shoppingCartReducer, { actionCreator, IState, shoppingCartReducerActions } from './shoppingCartReducer';
import axios, { AxiosResponse } from 'axios';
import { IDUMMY_PRODUCTS } from '../dummy-products';

interface IStateAction {
	addItemToCart: (id: string) => void,
	updateItemQuantity: (productId: string, amount: number) => void;
}


type IDefaultCartContextValue = IState & IStateAction;

export const defaultCartContextValue: IDefaultCartContextValue = {
	items: [],
	addItemToCart: (id: string) => { },
	updateItemQuantity: (productId: string, amount: number) => { },
	products: [],
}

/* Should PascalCase because React expects all Custom Components to start with uppercase. 
This going to be wrapped around a component.
The default value set when creating the context is only used if a component that was not wrapped by Provider Component tries try access the context value
*/
export const CartContext = createContext(defaultCartContextValue);


interface ICartContextProvider {
	children: React.ReactNode
}

const getProducts = async (fn: (value: shoppingCartReducerActions) => void) => {
	const url = 'http://127.0.0.1:8000/api/products';

	const responseData = await axios
		.get<IDUMMY_PRODUCTS[]>(url)
		.then((response: AxiosResponse) => response.data);
	fn(actionCreator.loadProducts(responseData));
	return responseData;

	// return await axios
	// 	.get<IDUMMY_PRODUCTS[]>(url)
	// 	.then((response: AxiosResponse) => {
	// 		console.log("response", response);
	// 		console.log("data", response.data);
	// 		return response.data
	// 	})
}

const CartContextProvider = (props: ICartContextProvider) => {

	const { data, isLoading, error } = useQuery({
		queryKey: ['products'],
		queryFn: async () => getProducts(shoppingCartDispatch),
	})

	//[state, dispatchfunction] = useReducer(reducerFunction, initialValue)
	//dispatchFunction allow dispatch actions to reducer which will in turn update state
	//first argument for useReducer is pointer to reducer function
	//Second argument for useReducer is initial state (use when if state has never been updated)
	//reducer will executed when dispatch
	//useReducer return array contain state, and function used for dispatching an action reducer function
	const [shoppingCartState, shoppingCartDispatch] = useReducer(
		shoppingCartReducer,
		{
			items: [],
			products: []
		}
	);

	function handleAddItemToCart(id: string) {
		shoppingCartDispatch(actionCreator.addItemAction(id));
	}

	function handleUpdateCartItemQuantity(productId: string, amount: number) {
		shoppingCartDispatch(actionCreator.updateItemAction(productId, amount));
	}

	/*
	Wrap the components that need access to the shared data with a Provider component. 
	The Provider component accepts a "value" prop that holds the shared data, 
	and any component that is a child of the Provider component can access that shared data.
	You specify that you want consume context in child component. 
	This not done automatically as only some will interest in context
	*
	/*
	The default value set when creating the context is only used if a component that was not wrapped by Provider Component tries try access the context value
	*/

	interface IctxValue {
		addItemToCart: (id: string) => void;
		updateItemQuantity: (productId: string, amount: number) => void;
	}

	type ICartContextValue = IState & IctxValue;

	if (isLoading) {
		return <div></div>
	}

	if (error) {
		return <div></div>
	}

	// useEffect(() => {
	// 	// if (data) {
	// 	shoppingCartDispatch(actionCreator.loadProducts(data))
	// 	// }
	// }, [])


	const ctxValue: ICartContextValue = {
		items: shoppingCartState.items,
		addItemToCart: handleAddItemToCart,
		updateItemQuantity: handleUpdateCartItemQuantity,
		// products: data
		products: shoppingCartState.products
	};



	return (
		<CartContext.Provider value={ctxValue}>
			{props.children}
		</CartContext.Provider>
	)
}

export default CartContextProvider;
