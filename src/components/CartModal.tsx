import { forwardRef, Ref, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';
import Cart from './Cart';

export interface ICartRefObj {
	open: () => void;
}

const CartModal = forwardRef(function Modal(
	{ title, actions }: { title: string, actions: React.JSX.Element },
	ref: Ref<ICartRefObj>
) {
	const dialog = useRef<HTMLDialogElement>(null);

	//expose child method to parent
	useImperativeHandle(ref, () => {
		return {
			open: (): void => {
				dialog.current?.showModal();
			},
		};
	});

	const modalDivElement: HTMLDivElement = document.getElementById('modal') as HTMLDivElement;

	// Control where element should render in DOM below want render inside of div with id of modal
	// div with id of modal in this instance site out of div root.

	return createPortal(
		<dialog id="modal" ref={dialog}>
			<h2>{title}</h2>
			<Cart />
			<form method="dialog" id="modal-actions">
				{actions}
			</form>
		</dialog>,
		modalDivElement
	);
});

export default CartModal;
