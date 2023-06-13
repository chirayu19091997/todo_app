"use client";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";
import "./globals.css";
import { UserProvider } from "@/utils/contexts";
import { Toaster } from "react-hot-toast";
import ProtectedRoutes from "@/utils/ProtectedRoutes";
import { useEffect, useState } from "react";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [render, setRender] = useState(false);
	const pathname = usePathname();
	const notNavbarDisplayRoutes = ["/signup", "/login"];

	useEffect(() => {
		if (typeof window !== "undefined") {
			// this makes sure the window is mounted before rendering since localstorage requires window for operation
			setRender(true);
		}
	}, []);

	return (
		<html lang="en">
			<body>
				{render && (
					<UserProvider>
						{notNavbarDisplayRoutes.includes(pathname) ? null : <Navbar />}
						<Toaster position="top-right" reverseOrder={false} />
						<ProtectedRoutes>{children}</ProtectedRoutes>
					</UserProvider>
				)}
			</body>
		</html>
	);
}
