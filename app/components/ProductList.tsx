import { type Product } from "../actions/products";
export default function ProductList({ products }: { products: Product[] }) {
	if (products.length === 0) {
		return <p className="text-gray-500">No products found.</p>;
	}

	return (
		<div className="space-y-4">
			<h2 className="text-xl font-semibold">Products</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{products.map((product) => (
					<div key={product.id} className="border rounded-lg p-4 shadow-sm">
						<h3 className="font-medium text-lg">{product.name}</h3>
						<p className="text-gray-600">${product.price}</p>
						{product.description && (
							<p className="text-sm text-gray-500 mt-2">
								{product.description}
							</p>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
