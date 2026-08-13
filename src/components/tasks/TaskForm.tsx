"use client";

import { useState } from "react";
import { TASK_FORM_DEFAULTS } from "@/constants/api";
import { useTasks } from "@/hooks";
import type { CreateTaskDTO } from "@/types";

export default function TaskForm() {
	const { createTask } = useTasks();
	const [formData, setFormData] = useState({
		nombre: TASK_FORM_DEFAULTS.nombre,
		descripcion: TASK_FORM_DEFAULTS.descripcion,
		fechaLimite: TASK_FORM_DEFAULTS.fechaLimite,
		estado: TASK_FORM_DEFAULTS.estado,
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value, type } = e.target as HTMLInputElement;
		setFormData((prev) => ({
			...prev,
			[name]:
				type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);

		if (
			!formData.nombre.trim() ||
			!formData.descripcion.trim() ||
			!formData.fechaLimite
		) {
			setError("Por favor completa todos los campos");
			return;
		}

		try {
			setIsSubmitting(true);
			const taskData: CreateTaskDTO = {
				nombre: formData.nombre,
				descripcion: formData.descripcion,
				fechaLimite: new Date(formData.fechaLimite),
				estado: formData.estado,
			};

			await createTask(taskData);

			// Limpiar formulario después de crear la tarea
			setFormData({
				nombre: TASK_FORM_DEFAULTS.nombre,
				descripcion: TASK_FORM_DEFAULTS.descripcion,
				fechaLimite: TASK_FORM_DEFAULTS.fechaLimite,
				estado: TASK_FORM_DEFAULTS.estado,
			});
		} catch (err) {
			setError(err instanceof Error ? err.message : "Error al crear tarea");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl w-full"
		>
			<input
				type="text"
				name="nombre"
				placeholder="Nombre"
				value={formData.nombre}
				onChange={handleChange}
				className="border border-gray-300 px-3 py-2 rounded w-full"
			/>
			<input
				type="text"
				name="descripcion"
				placeholder="Descripción"
				value={formData.descripcion}
				onChange={handleChange}
				className="border border-gray-300 px-3 py-2 rounded w-full"
			/>
			<input
				type="date"
				name="fechaLimite"
				value={formData.fechaLimite}
				onChange={handleChange}
				className="border border-gray-300 px-3 py-2 rounded w-full"
			/>
			<button
				type="submit"
				disabled={isSubmitting}
				className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition disabled:bg-gray-400"
			>
				{isSubmitting ? "Agregando..." : "Agregar"}
			</button>
			{error && <p className="text-red-600 col-span-full text-sm">{error}</p>}
		</form>
	);
}
