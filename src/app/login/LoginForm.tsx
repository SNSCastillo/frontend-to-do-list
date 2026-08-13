"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks";

export default function LoginForm() {
	const router = useRouter();
	const { login, user, token } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	// Redirigir si ya está autenticado
	useEffect(() => {
		if (user && token) {
			router.push("/todos");
		}
	}, [user, token, router]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		try {
			await login(email, password);
		} catch (err) {
			const message =
				err instanceof Error ? err.message : "Credenciales inválidas";
			setError(message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="max-w-md mx-auto space-y-4 text-black"
		>
			<div>
				<label htmlFor="email" className="block text-sm font-medium mb-2">
					Correo
				</label>
				<input
					type="email"
					placeholder="tu@correo.com"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					className="w-full border p-2 rounded"
				/>
			</div>
			<div>
				<label htmlFor="password" className="block text-sm font-medium mb-2 ">
					Contraseña
				</label>
				<input
					type="password"
					placeholder="Contraseña"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					className="w-full border p-2 rounded"
				/>
			</div>
			{error && (
				<div className="bg-red-50 border border-red-200 rounded p-3">
					<p className="text-red-700 text-sm">{error}</p>
				</div>
			)}
			<button
				type="submit"
				disabled={isLoading}
				className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:bg-gray-400"
			>
				{isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
			</button>
		</form>
	);
}
