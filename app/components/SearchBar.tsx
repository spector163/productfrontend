"use client";

import { useRouter, useSearchParams } from "next/navigation";
// import { useDebouncedCallback } from "use-debounce";

export default function SearchBar({ searchTerm }: { searchTerm: string }) {
	const searchParams = useSearchParams();
	const { replace } = useRouter();

	const handleSearch = (term: string) => {
		const params = new URLSearchParams(searchParams);
		if (term) {
			params.set("search", term);
		} else {
			params.delete("search");
		}
		replace(`/?${params.toString()}`);
	};

	return (
		<div className="mb-4">
			<label htmlFor="search" className="sr-only">
				Search products
			</label>
			<input
				type="text"
				id="search"
				placeholder="Search products..."
				defaultValue={searchTerm}
				onChange={(e) => handleSearch(e.target.value)}
				className="w-full rounded-md border-gray-300 shadow-sm p-2 border"
			/>
		</div>
	);
}
