import { API_ENDPOINTS } from "@/constants/api";
import type { LoginResponse } from "@/types";
import apiClient from "./apiClient";

export const authService = {
	login: async (email: string, password: string): Promise<LoginResponse> => {
		const res = await apiClient.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, {
			email,
			password,
		});
		return res.data;
	},
};
