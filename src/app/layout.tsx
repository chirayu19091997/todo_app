"use client";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";
import "./globals.css";
import { UserProvider } from "@/utils/contexts";
import { Toaster } from "react-hot-toast";
import ProtectedRoutes from "@/utils/ProtectedRoutes";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const notNavbarDisplayRoutes = ["/signup", "/login"];

	return (
		<html lang="en">
			<body>
				<UserProvider>
					{notNavbarDisplayRoutes.includes(pathname) ? null : <Navbar />}
					<Toaster position="top-right" reverseOrder={false} />
					<ProtectedRoutes>{children}</ProtectedRoutes>
				</UserProvider>
			</body>
		</html>
	);
}
