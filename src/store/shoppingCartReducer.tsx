import { DUMMY_PRODUCTS, IDUMMY_PRODUCTS } from "../dummy-products";
import { IItem } from "../interfaces/IItem";

enum ActionTypes {
	ADD_ITEM,
	UPDATE_ITEM,
	LOAD_PRODUCTS
}

interface IAddItemPayload {
	id: string
}

interface IAddItem {
	type: ActionTypes.ADD_ITEM
	payload: IAddItemPayload
}

interface IUpdateItemPayload {
	productId: string;
	amount: number
}

interface IUpdateItem {
	type: ActionTypes.UPDATE_ITEM,
	payload: IUpdateItemPayload
}

interface ILoadProducts {
	type: ActionTypes.LOAD_PRODUCTS,
	payload: IDUMMY_PRODUCTS[]
}

export type shoppingCartReducerActions = IAddItem | IUpdateItem | ILoadProducts;

export const actionCreator = {
	addItemAction: (id: string): IAddItem => {
		return {
			type: ActionTypes.ADD_ITEM,
			payload: {
				id
			}
		}
	},
	updateItemAction: (productId: string, amount: number): IUpdateItem => {
		return {
			type: ActionTypes.UPDATE_ITEM,
			payload: {
				productId,
				amount
			}
		}
	},
	loadProducts: (products: IDUMMY_PRODUCTS[]): ILoadProducts => {
		return {
			type: ActionTypes.LOAD_PRODUCTS,
			payload: products
		}
	}
}

export interface IState {
	items: IItem[]
	products: IDUMMY_PRODUCTS[];
}

const INITIAL_SHOPPING_CART_REDUCER_STATE: IState = {
	items: [],
	products: []
}


const addItem = (state: typeof INITIAL_SHOPPING_CART_REDUCER_STATE, action: IAddItem) => {
	const updatedItems = [...state.items];

	//Check if item exist in array return item or null
	const existingCartItemIndex = updatedItems.findIndex(
		(cartItem) => cartItem.id === action.payload.id
	);
	const existingCartItem = updatedItems[existingCartItemIndex];

	if (existingCartItem) {
		const updatedItem = {
			...existingCartItem,
			quantity: existingCartItem.quantity + 1,
		};
		updatedItems[existingCartItemIndex] = updatedItem;
	} else {
		const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload.id);
		if (typeof product == "undefined") {
			return state;
		}
		updatedItems.push({
			id: action.payload.id,
			name: product.title,
			price: product.price,
			quantity: 1,
		});
	}

	return {
		...state,
		items: updatedItems,
	};
}

const updateItem = (state: typeof INITIAL_SHOPPING_CART_REDUCER_STATE, action: IUpdateItem) => {
	const updatedItems = [...state.items];
	const updatedItemIndex = updatedItems.findIndex(
		(item) => item.id === action.payload.productId
	);

	const updatedItem = {
		...updatedItems[updatedItemIndex],
	};

	updatedItem.quantity += action.payload.amount;

	if (updatedItem.quantity <= 0) {
		//Remove item from array when amount less than or equal to 0
		updatedItems.splice(updatedItemIndex, 1);
	} else {
		updatedItems[updatedItemIndex] = updatedItem;
	}

	return {
		...state,
		items: updatedItems,
	};
}

const loadProducts = (state: typeof INITIAL_SHOPPING_CART_REDUCER_STATE, action: ILoadProducts) => {
	console.log("products", action.payload);
	return {
		...state,
		products: action.payload
	};
}


const shoppingCartReducer = (state: typeof INITIAL_SHOPPING_CART_REDUCER_STATE, action: shoppingCartReducerActions) => {
	console.log("state", state, "action", action);
	switch (action.type) {
		case ActionTypes.LOAD_PRODUCTS:
			return loadProducts(state, action);
		case ActionTypes.ADD_ITEM:
			return addItem(state, action);
		case ActionTypes.UPDATE_ITEM:
			return updateItem(state, action);
		default:
			return state;
	}
}

export default shoppingCartReducer;
