import { useContext } from 'react';
import { DUMMY_PRODUCTS } from '../dummy-products.ts';
import Product from './Product';
import { CartContext } from '../store/CartContext.tsx';

export default function Shop() {

	const cartCtx = useContext(CartContext);
	console.log("??", cartCtx.products);

	return (
		<section id="shop">
			<h2 className="mt-6 mb-6">Elegant Clothing For Everyone</h2>

			<ul id="products">
				{/* {DUMMY_PRODUCTS.map((product) => (
					<li key={product.id}>
						<Product {...product} />
					</li>
				))} */}
				{cartCtx.products.map((product) => (
					<li key={product.id}>
						<Product {...product} />
					</li>
				))}
			</ul>
		</section>
	);
}
