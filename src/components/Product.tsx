import { useContext } from "react";
import { CartContext } from "../store/CartContext";

export default function Product({
	id,
	image,
	title,
	price,
	description,
}: {
	id: string,
	image: string,
	title: string;
	price: number;
	description: string;
}) {
	// console.log(dreamGown);
	const cartCtx = useContext(CartContext);
	return (
		<article className="product">
			{/* <img src={image} alt={title} /> */}
			<img src={`/src/assets/${image}.jpg`} alt={title} />
			<div className="product-content">
				<div>
					<h3 className="mt-6 mb-2">{title}</h3>
					<p className='product-price'>${price}</p>
					<p>{description}</p>
				</div>
				<p className='product-actions'>
					<button onClick={() => cartCtx.addItemToCart(id)}>Add to Cart</button>
				</p>
			</div>
		</article>
	);
}
