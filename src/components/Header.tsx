import { useRef, useContext } from 'react';
import { CartContext } from '../store/CartContext';
import { ICartRefObj } from './CartModal.js';

import CartModal from './CartModal.js';

export default function Header() {
	const modal = useRef<ICartRefObj>(null);
	const cartCtx = useContext(CartContext)

	const cartQuantity = cartCtx.items.length;

	function handleOpenCartClick() {
		modal.current?.open();
	}

	let modalActions = <button>Close</button>;

	if (cartQuantity > 0) {
		modalActions = (
			<>
				<button>Close</button>
				<button>Checkout</button>
			</>
		);
	}

	return (
		<>
			<CartModal
				ref={modal}
				title="Your Cart"
				actions={modalActions}
			/>
			<header id="main-header">
				<div id="main-title">
					<img src="logo.png" alt="Elegant model" />
					<h1 className='underline'>Elegant Context</h1>
				</div>
				<p>
					<button onClick={handleOpenCartClick}>Cart ({cartQuantity})</button>
				</p>
			</header>
		</>
	);
}
