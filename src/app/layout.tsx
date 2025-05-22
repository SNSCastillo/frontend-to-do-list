"use client";
import { useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";
import "./globals.css";
import { useRouter } from "next/navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedEmail = localStorage.getItem("email");

    if (savedToken && savedEmail) {
      router.push("/todos");
    }

  }, []);

  return (
    <AuthProvider>
      <html lang="es">
        <body>{children}</body>
      </html>
    </AuthProvider>
  );
}
