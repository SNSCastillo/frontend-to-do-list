"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Navbar, TaskForm, TaskList } from "@/components";
import { useAuth } from "@/hooks";

export default function TodosPage() {
	const { user, token, isLoading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!isLoading && (!user || !token)) {
			router.push("/login");
		}
	}, [user, token, isLoading, router]);

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<p className="text-gray-500">Verificando sesión...</p>
			</div>
		);
	}

	if (!user || !token) {
		return null;
	}

	return (
		<div className="min-h-screen bg-gray-50 text-black">
			<Navbar />
			<div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
				<div className="space-y-8">
					<div>
						<h1 className="text-4xl font-bold text-gray-800 mb-2">
							Tus tareas
						</h1>
						<p className="text-gray-600">
							Organiza y gestiona tus tareas diarias
						</p>
					</div>

					<div className="bg-white rounded-lg shadow p-6">
						<h2 className="text-lg font-semibold text-gray-800 mb-4">
							Crear nueva tarea
						</h2>
						<TaskForm />
					</div>

					<div className="bg-white rounded-lg shadow p-6">
						<h2 className="text-lg font-semibold text-gray-800 mb-4">
							Lista de tareas
						</h2>
						<TaskList />
					</div>
				</div>
			</div>
		</div>
	);
}
