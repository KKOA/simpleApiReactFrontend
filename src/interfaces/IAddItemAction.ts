export interface IAddItemActionPayload {
	id: string;
}

export interface IAddItemAction {
	type: string;
	payload: IAddItemActionPayload;
}
