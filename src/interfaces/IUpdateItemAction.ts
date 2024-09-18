export interface IUpdateItemActionPayload {
	productId: string;
	amount: number;
}

export interface IUpdateItemAction {
	type: string;
	payload: IUpdateItemActionPayload;
}
