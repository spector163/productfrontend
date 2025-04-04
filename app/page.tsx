import { Suspense } from "react";
import { getProducts } from "./actions/products";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import SearchBar from "./components/SearchBar";

export default async function Home({
	searchParams,
}: {
	searchParams?: Promise<{ search?: string }>;
}) {
	const searchTerm = (await searchParams)?.search || "";
	const products = await getProducts(searchTerm);

	return (
		<main className="container mx-auto py-8 px-4">
			<h1 className="text-2xl font-bold mb-8">Product Management</h1>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				<div>
					<h2 className="text-xl font-semibold mb-4">Add New Product</h2>
					<ProductForm />
				</div>

				<div>
					<SearchBar searchTerm={searchTerm} />
					<Suspense fallback={<div>loading..</div>}>
						<ProductList products={products} />
					</Suspense>
				</div>
			</div>
		</main>
	);
}
