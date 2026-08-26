"use client";

import { useAuth } from "@/hooks";

export default function Navbar() {
	const { user, logout } = useAuth();

	return (
		<nav className="bg-gray-100 p-4 flex justify-between items-center">
			<span>Hola, {user?.name}</span>
			<button
				type="button"
				onClick={logout}
				className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
			>
				Cerrar sesión
			</button>
		</nav>
	);
}
