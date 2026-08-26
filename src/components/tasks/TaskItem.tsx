"use client";

import { useState } from "react";
import { useTasks } from "@/hooks";
import type { Task, UpdateTaskDTO } from "@/types";

type Props = {
	task: Task;
};

export default function TaskItem({ task }: Props) {
	const { updateTask, deleteTask, updateTaskStatus } = useTasks();
	const [isEditing, setIsEditing] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		nombre: task.nombre,
		descripcion: task.descripcion,
		fechaLimite: task.fechaLimite,
		estado: task.estado,
	});

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

	const handleToggleStatus = async () => {
		try {
			setIsLoading(true);
			await updateTaskStatus(task.id, !formData.estado);
			setFormData((prev) => ({ ...prev, estado: !prev.estado }));
		} catch (err) {
			console.error("Error al cambiar estado:", err);
		} finally {
			setIsLoading(false);
		}
	};

	const handleUpdateTask = async () => {
		try {
			setIsLoading(true);
			const updateData: UpdateTaskDTO = {
				nombre: formData.nombre,
				descripcion: formData.descripcion,
				fechaLimite: new Date(formData.fechaLimite),
				estado: formData.estado,
			};
			await updateTask(task.id, updateData);
			setIsEditing(false);
		} catch (err) {
			console.error("Error al actualizar tarea:", err);
		} finally {
			setIsLoading(false);
		}
	};

	const handleDeleteTask = async () => {
		try {
			setIsLoading(true);
			await deleteTask(task.id);
		} catch (err) {
			console.error("Error al eliminar tarea:", err);
		} finally {
			setIsLoading(false);
		}
	};

	const handleCancelEdit = () => {
		setFormData({
			nombre: task.nombre,
			descripcion: task.descripcion,
			fechaLimite: task.fechaLimite,
			estado: task.estado,
		});
		setIsEditing(false);
	};

	return (
		<div className="bg-white border rounded p-4 shadow-sm space-y-3">
			{isEditing ? (
				<>
					<div>
						<label htmlFor="nombre" className="block text-sm font-medium mb-1">
							Nombre
						</label>
						<input
							type="text"
							name="nombre"
							value={formData.nombre}
							onChange={handleChange}
							className="p-2 border rounded w-full"
						/>
					</div>
					<div>
						<label
							htmlFor="descripcion"
							className="block text-sm font-medium mb-1"
						>
							Descripción
						</label>
						<textarea
							name="descripcion"
							value={formData.descripcion}
							onChange={handleChange}
							className="p-2 border rounded w-full"
						/>
					</div>
					<div>
						<label
							htmlFor="fechaLimite"
							className="block text-sm font-medium mb-1"
						>
							Fecha Límite
						</label>
						<input
							type="date"
							name="fechaLimite"
							value={formData.fechaLimite}
							onChange={handleChange}
							className="p-2 border rounded w-full"
						/>
					</div>
					<div className="flex items-center gap-2">
						<label className="flex items-center gap-2">
							<input
								type="checkbox"
								name="estado"
								checked={formData.estado}
								onChange={handleChange}
							/>
							<span>{formData.estado ? "Completada" : "Pendiente"}</span>
						</label>
					</div>
					<div className="flex gap-2 mt-4">
						<button
							type="button"
							onClick={handleUpdateTask}
							disabled={isLoading}
							className="text-green-600 hover:underline disabled:text-gray-400"
						>
							{isLoading ? "Actualizando..." : "Actualizar"}
						</button>
						<button
							type="button"
							onClick={handleCancelEdit}
							disabled={isLoading}
							className="text-gray-600 hover:underline disabled:text-gray-400"
						>
							Cancelar
						</button>
					</div>
				</>
			) : (
				<>
					<div className="space-y-1">
						<p>
							<strong>Nombre:</strong> {task.nombre}
						</p>
						<p>
							<strong>Descripción:</strong> {task.descripcion}
						</p>
						<p>
							<strong>Creación:</strong> {task.createdAt}
						</p>
						<p>
							<strong>Finalización:</strong> {task.fechaLimite}
						</p>
						<p>
							<strong>Estado:</strong>{" "}
							<span
								className={
									task.estado
										? "text-green-600 font-semibold"
										: "text-yellow-600 font-semibold"
								}
							>
								{task.estado ? "Completada" : "Pendiente"}
							</span>
						</p>
					</div>
					<div className="flex gap-2 mt-4">
						<button
							type="button"
							onClick={handleToggleStatus}
							disabled={isLoading}
							className="text-blue-600 hover:underline disabled:text-gray-400 text-sm"
						>
							{task.estado ? "Marcar Pendiente" : "Marcar Completada"}
						</button>
						<button
							type="button"
							onClick={() => setIsEditing(true)}
							disabled={isLoading}
							className="text-orange-600 hover:underline disabled:text-gray-400 text-sm"
						>
							Editar
						</button>
						<button
							type="button"
							onClick={handleDeleteTask}
							disabled={isLoading}
							className="text-red-600 hover:underline disabled:text-gray-400 text-sm"
						>
							Eliminar
						</button>
					</div>
				</>
			)}
		</div>
	);
}
