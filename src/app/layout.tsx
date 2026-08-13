"use client";

import { useEffect } from "react";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";
import { useRouter } from "next/navigation";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();

	useEffect(() => {
		const savedToken = localStorage.getItem("token");
		const savedEmail = localStorage.getItem("email");

		if (savedToken && savedEmail) {
			router.push("/todos");
		}
	}, [router]);

	return (
		<AuthProvider>
			<html lang="es">
				<head>
					<meta charSet="utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<meta
						name="description"
						content="To Do List - Gestiona tus tareas en tiempo real"
					/>
					<title>To Do List</title>
				</head>
				<body>{children}</body>
			</html>
		</AuthProvider>
	);
}
