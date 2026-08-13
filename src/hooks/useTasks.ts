"use client";

import { useCallback, useEffect, useState } from "react";
import socket from "@/app/lib/socket";
import { SOCKET_EVENTS } from "@/constants/api";
import { taskService } from "@/services/taskService";
import type { CreateTaskDTO, Task, UpdateTaskDTO } from "@/types";

export const useTasks = () => {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchTasks = useCallback(async () => {
		try {
			setIsLoading(true);
			setError(null);
			const data = await taskService.fetchTasks();
			setTasks(data);
		} catch (err) {
			const message =
				err instanceof Error ? err.message : "Error cargando tareas";
			setError(message);
			console.error("Error cargando tareas:", err);
		} finally {
			setIsLoading(false);
		}
	}, []);

	const createTask = useCallback(
		async (taskData: CreateTaskDTO) => {
			try {
				setError(null);
				await taskService.createTask(taskData);
				await fetchTasks();
			} catch (err) {
				const message =
					err instanceof Error ? err.message : "Error al crear tarea";
				setError(message);
				console.error("Error al crear tarea:", err);
				throw err;
			}
		},
		[fetchTasks],
	);

	const updateTask = useCallback(
		async (id: string, taskData: UpdateTaskDTO) => {
			try {
				setError(null);
				await taskService.updateTask(id, taskData);
				await fetchTasks();
			} catch (err) {
				const message =
					err instanceof Error ? err.message : "Error al actualizar tarea";
				setError(message);
				console.error("Error al actualizar tarea:", err);
				throw err;
			}
		},
		[fetchTasks],
	);

	const deleteTask = useCallback(
		async (id: string) => {
			try {
				setError(null);
				await taskService.deleteTask(id);
				await fetchTasks();
			} catch (err) {
				const message =
					err instanceof Error ? err.message : "Error al eliminar tarea";
				setError(message);
				console.error("Error al eliminar tarea:", err);
				throw err;
			}
		},
		[fetchTasks],
	);

	const updateTaskStatus = useCallback(
		async (id: string, estado: boolean) => {
			try {
				setError(null);
				await taskService.updateTaskStatus(id, estado);
				await fetchTasks();
			} catch (err) {
				const message =
					err instanceof Error ? err.message : "Error al cambiar estado";
				setError(message);
				console.error("Error al cambiar estado:", err);
				throw err;
			}
		},
		[fetchTasks],
	);

	useEffect(() => {
		fetchTasks();

		// Escuchar eventos de WebSocket
		const handleTaskCreated = (nuevaTarea: Task) => {
			setTasks((prev) => [nuevaTarea, ...prev]);
		};

		const handleTaskUpdated = () => {
			fetchTasks();
		};

		socket.on(SOCKET_EVENTS.TASK_CREATED, handleTaskCreated);
		socket.on(SOCKET_EVENTS.TASK_UPDATED, handleTaskUpdated);

		return () => {
			socket.off(SOCKET_EVENTS.TASK_CREATED, handleTaskCreated);
			socket.off(SOCKET_EVENTS.TASK_UPDATED, handleTaskUpdated);
		};
	}, [fetchTasks]);

	return {
		tasks,
		isLoading,
		error,
		fetchTasks,
		createTask,
		updateTask,
		deleteTask,
		updateTaskStatus,
	};
};
