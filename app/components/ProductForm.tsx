"use client";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { addProduct } from "../actions/products";

export default function ProductForm() {
	const router = useRouter();
	// progressive enhancment

	const [state, formAction, isPending] = useActionState(addProduct, {
		message: "",
		errors: {},
	});

	useEffect(() => {
		if (state.message === "Product added successfully") {
			router.refresh(); // current page refresh
		}
	}, [state.message, router]);

	return (
		<form action={formAction} className="space-y-4 max-w-md">
			<div>
				<label
					htmlFor="name"
					className="block text-sm font-medium text-gray-700"
				>
					Product Name
				</label>
				<input
					type="text"
					id="name"
					name="name"
					required //native validation
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
				/>
				{state?.errors?.name && (
					<p className="mt-1 text-sm text-red-600">{state.errors.name}</p>
				)}
			</div>

			<div>
				<label
					htmlFor="price"
					className="block text-sm font-medium text-gray-700"
				>
					Price
				</label>
				<input
					type="number"
					id="price"
					name="price"
					step="0.01"
					min="0"
					required // native validation
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
				/>
				{state?.errors?.price && (
					<p className="mt-1 text-sm text-red-600">{state.errors.price}</p>
				)}
			</div>

			<div>
				<label
					htmlFor="description"
					className="block text-sm font-medium text-gray-700"
				>
					Description (Optional)
				</label>
				<textarea
					id="description"
					name="description"
					rows={3}
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
				/>
			</div>

			<button
				type="submit"
				disabled={isPending}
				className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
			>
				{isPending ? "Adding..." : "Add Product"}
			</button>

			{state?.message && state.message !== "Product added successfully" && (
				<p className="mt-2 text-sm text-red-600">{state.message}</p>
			)}
			{state?.message === "Product added successfully" && (
				<p className="mt-2 text-sm text-green-600">{state.message}</p>
			)}
		</form>
	);
}
