export type User = {
	name: string;
	email: string;
};

export type AuthContextType = {
	user: User | null;
	token: string | null;
	isLoading: boolean;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
};

export type Task = {
	id: string;
	nombre: string;
	descripcion: string;
	createdAt: string;
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

export type LoginResponse = {
	token: string;
	email: string;
	name: string;
};

export type TasksResponse = Task[];
