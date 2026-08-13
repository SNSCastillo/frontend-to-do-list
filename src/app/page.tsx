import Link from "next/link";

export const metadata = {
	title: "To Do List | Gestiona tus tareas",
	description: "Aplicación de gestión de tareas con Nest.js y Next.js",
};

export default function Home() {
	return (
		<main className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 px-4 sm:px-6 lg:px-8">
			<div className="text-center space-y-8 max-w-2xl">
				<div className="space-y-4">
					<h1 className="text-5xl sm:text-6xl font-bold text-gray-900">
						To Do List
					</h1>
					<p className="text-xl sm:text-2xl text-gray-600">
						Gestiona tus tareas en tiempo real
					</p>
					<p className="text-gray-500">
						Construido con Nest.js y Next.js para una experiencia rápida y
						confiable
					</p>
				</div>

				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Link
						href="/login"
						className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium shadow-lg hover:bg-blue-700 transition transform hover:scale-105"
					>
						Iniciar sesión
					</Link>
					<Link
						href="/login"
						className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-medium shadow-lg border-2 border-blue-600 hover:bg-blue-50 transition"
					>
						Registrarse
					</Link>
				</div>

				<div className="pt-8 border-t border-gray-300">
					<h2 className="text-2xl font-semibold text-gray-800 mb-6">
						Características
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
						<div className="space-y-2">
							<div className="text-4xl">⚡</div>
							<h3 className="font-semibold text-gray-800">Tiempo real</h3>
							<p className="text-gray-600 text-sm">
								Actualizaciones instantáneas con WebSocket
							</p>
						</div>
						<div className="space-y-2">
							<div className="text-4xl">🔒</div>
							<h3 className="font-semibold text-gray-800">Seguro</h3>
							<p className="text-gray-600 text-sm">
								Autenticación robusta con JWT
							</p>
						</div>
						<div className="space-y-2">
							<div className="text-4xl">📱</div>
							<h3 className="font-semibold text-gray-800">Responsivo</h3>
							<p className="text-gray-600 text-sm">
								Funciona en todos los dispositivos
							</p>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
