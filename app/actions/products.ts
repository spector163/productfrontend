"use server";
const API_URL = process.env.API_URL;

export interface Product {
	id?: string;
	name: string;
	price: number;
	description?: string;
}
interface ProductFormState {
	errors: Record<string, string>;
	message: string;
}

export async function getProducts(search?: string): Promise<Product[]> {
	const url = search
		? `${API_URL}/products?search=${search}`
		: `${API_URL}/products`;

	const res = await fetch(url);
	if (!res.ok) {
		throw new Error("Failed to fetch products");
	}
	return res.json();
}

export async function addProduct(
	prevState: ProductFormState,
	formData: FormData
) {
	const rawData = {
		name: formData.get("name") as string,
		price: parseFloat(formData.get("price") as string),
		description: formData.get("description") as string,
	};

	const errors: Record<string, string> = {};
	// use zod here
	if (!rawData.name) errors.name = "Name is required";
	if (!(rawData.name.length > 4)) errors.name = "should be 10 characters long";
	if (isNaN(rawData.price)) errors.price = "Price must be a number";
	if (rawData.price < 0) errors.price = "Price must be positive";

	if (Object.keys(errors).length > 0) {
		return { errors, message: "Validation failed" };
	}

	try {
		const res = await fetch(`${API_URL}/products`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(rawData),
		});

		if (!res.ok) {
			throw new Error("Failed to add product"); // should return here
		}

		return { message: "Product added successfully", errors: {} };
	} catch (error) {
		return { message: (error as Error).message, errors: {} };
	}
}
