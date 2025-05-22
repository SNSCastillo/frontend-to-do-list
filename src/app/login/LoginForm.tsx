"use client";

import { useEffect, useState } from "react";
import { useAuth } from "./../context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const router = useRouter();
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            await login(email, password);
        } catch (err) {
            setError("Credenciales inválidas");
        }
    };

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        const savedEmail = localStorage.getItem("email");

        if (savedToken && savedEmail) {
            router.push("/todos");
        }

    }, []);

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4">
            <input
                type="email"
                placeholder="Correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border p-2"
            />
            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border p-2"
            />
            {error && <p className="text-red-600">{error}</p>}
            <button type="submit" className="w-full bg-blue-600 text-white py-2">
                Iniciar sesión
            </button>
        </form>
    );
}
