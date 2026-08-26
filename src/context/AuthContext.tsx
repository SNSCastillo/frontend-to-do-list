"use client";

import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { STORAGE_KEYS } from "@/constants/api";
import { authService } from "@/services/authService";
import type { AuthContextType, User } from "@/types";

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined,
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const savedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);
		const savedEmail = localStorage.getItem(STORAGE_KEYS.EMAIL);
		const savedUser = localStorage.getItem(STORAGE_KEYS.USER);

		if (savedToken && savedEmail && savedUser) {
			setToken(savedToken);
			setUser({ name: savedUser, email: savedEmail });
		}

		setIsLoading(false);
	}, []);

	const login = async (email: string, password: string) => {
		try {
			const { token: newToken, email: userEmail, name: userName } = await authService.login(
				email,
				password,
			);

			if (!newToken) {
				throw new Error("No se recibió un token");
			}
			if (!userEmail) {
				throw new Error("No se recibió un email");
			}
      if (!userName) {
				throw new Error("No se recibió nombre de usuario");
			}

			localStorage.setItem(STORAGE_KEYS.TOKEN, newToken);
			localStorage.setItem(STORAGE_KEYS.EMAIL, userEmail);
			localStorage.setItem(STORAGE_KEYS.USER, userName);

			setToken(newToken);
			setUser({ name: userName,email: userEmail });

			router.push("/todos");
		} catch (err) {
			console.error("Error en login:", err);
			throw err instanceof Error ? err : new Error("Error al iniciar sesión");
		}
	};

	const logout = () => {
		localStorage.removeItem(STORAGE_KEYS.TOKEN);
		localStorage.removeItem(STORAGE_KEYS.EMAIL);

		setToken(null);
		setUser(null);

		router.push("/login");
	};

	return (
		<AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
			{children}
		</AuthContext.Provider>
	);
};
