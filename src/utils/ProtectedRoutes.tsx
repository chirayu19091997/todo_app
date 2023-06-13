import React, { useEffect } from "react";
import { useUser } from "./contexts";
import { usePathname, useRouter, redirect } from "next/navigation";

interface ProtectedRoutesProps {
	children: React.ReactNode;
}

const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
	const router = useRouter();
	const protectedRoutes = ["/dashboard"];
	const { user, isLogin } = useUser();
	const pathname = usePathname();

	useEffect(() => {
		if (user.id !== "") {
			if (!isLogin) {
				if (protectedRoutes.includes(pathname)) {
					router.replace("/login");
				}
			} else {
				router.replace("/dashboard");
			}
		}
	}, [pathname, user, isLogin]);

	return <>{children}</>;
};

export default ProtectedRoutes;
