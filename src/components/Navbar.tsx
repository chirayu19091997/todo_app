"use client";
import { NavigationOptions } from "@/utils/Navigation";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import { SiTodoist } from "react-icons/si";
import ProfileManagement from "./ProfileManagement";
import { useUser } from "@/utils/contexts";

const Navbar = () => {
	const pathname = usePathname();
	const { user, isLogin } = useUser();
	const [isMenuVisible, setIsMenuVisible] = useState(false);
	const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
	const isLoggedIn = isLogin;

	return (
		<div className="bg-indigo-500 sticky top-0 z-50">
			<nav className="relative px-4 py-4 flex justify-between items-center bg-white">
				<Link className="text-3xl text-black font-bold leading-none" href="/">
					<SiTodoist size={50} />
				</Link>
				<div className="lg:hidden">
					<button
						className="navbar-burger flex items-center text-primaryColor p-3"
						onClick={() => setIsMenuVisible(true)}
					>
						<svg
							className="block h-4 w-4 fill-current"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<title>Mobile menu</title>
							<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
						</svg>
					</button>
				</div>
				<ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-6">
					{NavigationOptions.map((item, index) => {
						return (
							<li key={index}>
								<Link
									className="text-sm text-secondaryColor hover:text-gray-500"
									href={item.route}
									style={{
										color: pathname === item.route ? "#1D4ED8" : "",
									}}
								>
									{item.title}
								</Link>
							</li>
						);
					})}
				</ul>
				{!isLoggedIn ? (
					<>
						<Link
							className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-4 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200"
							href="/login"
						>
							Sign In
						</Link>
						<Link
							className="hidden lg:inline-block py-4 px-6 bg-indigo-500 hover:bg-primaryColor text-sm text-white font-bold rounded-xl transition duration-200"
							href="/signup"
						>
							Sign up
						</Link>
					</>
				) : (
					<div className="lg:inline-block max-md:hidden min-w-[10%]">
						<ProfileManagement
							isOpen={isProfileMenuOpen}
							toggle={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
							name={user?.name}
						/>
					</div>
				)}
			</nav>
			<div
				className="navbar-menu relative z-50"
				style={{ display: isMenuVisible ? "" : "none" }}
			>
				<div
					className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25 text-black"
					onClick={() => setIsMenuVisible(false)}
				></div>
				<nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
					<div className="flex items-center mb-8">
						<Link
							className="mr-auto text-3xl font-bold leading-none text-black"
							href="/"
						>
							<SiTodoist size={50} />
						</Link>
						<button
							className="navbar-close"
							onClick={() => setIsMenuVisible(false)}
						>
							<RxCross1 size={24} />
						</button>
					</div>
					<div>
						<ul>
							{NavigationOptions.map((item) => (
								<li className="mb-1" key={item.title}>
									<Link
										className="block p-4 text-sm font-semibold text-gray-400 hover:bg-indigo-50 hover:text-primaryColor rounded"
										href={item.route}
									>
										{item.title}
									</Link>
								</li>
							))}
						</ul>
					</div>
					<div className="text-black">
						{!isLoggedIn ? (
							<div className="py-6">
								<Link
									className="block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold  bg-gray-50 hover:bg-gray-100 rounded-xl"
									href="/login"
								>
									Sign in
								</Link>
								<Link
									className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-primaryColor hover:bg-indigo-700  rounded-xl"
									href="/signup"
								>
									Sign Up
								</Link>
							</div>
						) : (
							<ProfileManagement
								isOpen={isProfileMenuOpen}
								toggle={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
								name={user?.name}
							/>
						)}
					</div>
				</nav>
			</div>
		</div>
	);
};

export default Navbar;
