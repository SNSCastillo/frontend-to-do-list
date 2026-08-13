// Auth Types
export type User = {
	email: string;
};

export type AuthContextType = {
	user: User | null;
	token: string | null;
	isLoading: boolean;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
};

// Task Types
export type Task = {
	id: string;
	nombre: string;
	descripcion: string;
	fechaCreacion: string;
	fechaLimite: string;
	estado: boolean;
};

export type CreateTaskDTO = {
	nombre: string;
	descripcion: string;
	fechaLimite: Date;
	estado: boolean;
};

export type UpdateTaskDTO = Partial<CreateTaskDTO>;

// API Response Types
export type LoginResponse = {
	token: string;
	email: string;
};

export type TasksResponse = Task[];
