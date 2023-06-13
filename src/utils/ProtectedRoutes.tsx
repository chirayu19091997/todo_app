import React, { useEffect } from "react";
import { useUser } from "./contexts";
import { usePathname, useRouter, redirect } from "next/navigation";

interface ProtectedRoutesProps {
	children: React.ReactNode;
}

const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
	const protectedRoutes = ["/dashboard"];
	const { isLogin } = useUser();
	const pathname = usePathname();

	useEffect(() => {
		if (!isLogin) {
			if (protectedRoutes.includes(pathname)) redirect("/login");
		} else {
			redirect("/dashboard");
		}
	}, [pathname, isLogin]);

	return <>{children}</>;
};

export default ProtectedRoutes;
