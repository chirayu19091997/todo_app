import React, { useEffect } from "react";
import { useUser } from "./contexts";
import { usePathname, useRouter } from "next/navigation";

interface ProtectedRoutesProps {
	children: React.ReactNode;
}

const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
	const protectedRoutes = ["/dashboard"];
	const { isLogin } = useUser();
	const pathname = usePathname();
	const router = useRouter();

	useEffect(() => {
		if (!isLogin) {
			if (protectedRoutes.includes(pathname)) router.push("/login");
		} else {
			router.push("/dashboard");
		}
	}, [pathname, isLogin]);

	return <>{children}</>;
};

export default ProtectedRoutes;
