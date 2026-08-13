"use client";

import { useTasks } from "@/hooks";
import TaskItem from "./TaskItem";

export default function TaskList() {
	const { tasks, isLoading, error } = useTasks();

	if (isLoading) {
		return (
			<div className="text-center py-8">
				<p className="text-gray-500">Cargando tareas...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="bg-red-50 border border-red-200 rounded p-4">
				<p className="text-red-700">Error: {error}</p>
			</div>
		);
	}

	if (tasks.length === 0) {
		return (
			<div className="text-center py-8">
				<p className="text-gray-500">No hay tareas. ¡Crea una nueva!</p>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			{tasks.map((task) => (
				<TaskItem key={task.id} task={task} />
			))}
		</div>
	);
}
