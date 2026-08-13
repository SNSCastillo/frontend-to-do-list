import { API_ENDPOINTS } from "@/constants/api";
import type {
	CreateTaskDTO,
	Task,
	TasksResponse,
	UpdateTaskDTO,
} from "@/types";
import apiClient from "./apiClient";

export const taskService = {
	fetchTasks: async (): Promise<TasksResponse> => {
		const res = await apiClient.get<TasksResponse>(API_ENDPOINTS.TASKS.LIST);
		return res.data;
	},

	createTask: async (task: CreateTaskDTO): Promise<Task> => {
		const res = await apiClient.post<Task>(API_ENDPOINTS.TASKS.CREATE, task);
		return res.data;
	},

	updateTask: async (id: string, task: UpdateTaskDTO): Promise<Task> => {
		const res = await apiClient.patch<Task>(
			API_ENDPOINTS.TASKS.UPDATE(id),
			task,
		);
		return res.data;
	},

	deleteTask: async (id: string): Promise<void> => {
		await apiClient.delete(API_ENDPOINTS.TASKS.DELETE(id));
	},

	updateTaskStatus: async (id: string, estado: boolean): Promise<Task> => {
		const res = await apiClient.patch<Task>(
			API_ENDPOINTS.TASKS.UPDATE_STATUS(id),
			{ estado },
		);
		return res.data;
	},
};
