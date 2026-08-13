"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/hooks";

export default function ProtectedLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { user, token, isLoading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!isLoading && (!user || !token)) {
			router.push("/login");
		}
	}, [user, token, isLoading, router]);

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="text-center">
					<div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
					<p className="text-gray-500 mt-4">Verificando sesión...</p>
				</div>
			</div>
		);
	}

	if (!user || !token) {
		return null;
	}

	return <>{children}</>;
}
