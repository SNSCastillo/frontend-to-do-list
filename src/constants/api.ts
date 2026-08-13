// API Endpoints
export const API_ENDPOINTS = {
	AUTH: {
		LOGIN: "/auth/login",
	},
	TASKS: {
		LIST: "/tareas",
		CREATE: "/tareas",
		UPDATE: (id: string) => `/tareas/${id}`,
		DELETE: (id: string) => `/tareas/${id}`,
		UPDATE_STATUS: (id: string) => `/tareas/${id}/estado`,
	},
} as const;

// Socket Events
export const SOCKET_EVENTS = {
	TASK_CREATED: "tareaCreada",
	TASK_UPDATED: "tareaActualizada",
} as const;

// Storage Keys
export const STORAGE_KEYS = {
	TOKEN: "token",
	EMAIL: "email",
} as const;

// Default values
export const TASK_FORM_DEFAULTS = {
	nombre: "",
	descripcion: "",
	fechaLimite: "",
	estado: false,
} as const;
