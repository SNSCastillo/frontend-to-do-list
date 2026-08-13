import LoginForm from "./LoginForm";

export const metadata = {
	title: "Iniciar sesión | To Do List",
	description: "Inicia sesión en tu cuenta de To Do List",
};

export default function LoginPage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="w-full max-w-md">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold text-gray-800 mb-2">To Do List</h1>
					<p className="text-gray-800">Gestiona tus tareas en tiempo real</p>
				</div>
				<LoginForm />
			</div>
		</div>
	);
}
