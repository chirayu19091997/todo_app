//@ts-nocheck
import React, { createContext, useContext, useEffect, useState } from "react";
import { signToken, verifyToken } from "./authHelper";
import { getNewId, user, todo } from "./constants";
const UserContext = createContext({});

export const UserProvider = ({ children }: any) => {
	const initialState = {
		token: "",
		todos: [],
		name: "",
		email: "",
		id: null,
	};
	const [userArray, setUserArray] = useState<user[]>([]);
	const [user, setUser] = useState({
		...initialState,
		token: localStorage.getItem("token"),
	});
	const [isLogin, setIsLogin] = useState(false);
	const handleChangeUserArray = (value: user[]) => {
		setUserArray(value);
		localStorage.setItem("users", JSON.stringify({ users: value }));
	};
	const Login = async (email: string, password: string) => {
		try {
			const currentUser = userArray.find((user: user) => {
				if (user.email === email) {
					if (user.password === password) return user;
				}
			});
			if (!currentUser) {
				return { success: false, message: "User Not Found" };
			}
			const payload = { email: currentUser.email, id: currentUser.id };
			const token = (await signToken(payload)) || "";
			localStorage.setItem("token", token);
			setUser({
				token: token,
				todos: currentUser.todos,
				name: currentUser.name,
				email: currentUser.email,
				id: currentUser.id,
			});
			setIsLogin(true);
			return { success: true, message: "Login Success" };
		} catch (err) {
			console.log(err);
			return { err, message: "Login Failed" };
		}
	};
	const SignUp = async (name: string, email: string, password: string) => {
		try {
			const isExistingUser = userArray.findIndex(
				(user: user) => user.email === email
			);
			if (isExistingUser !== -1) {
				return { success: false, message: "User already exists." };
			}
			const newUser = { id: getNewId(), name, email, password, todos: [] };
			handleChangeUserArray([...userArray, newUser]);

			return { success: true, message: "Signup Success" };
		} catch (err) {
			return { err, message: "Signup Failed" };
		}
	};
	const CheckToken = async (users: user[]) => {
		try {
			const { payload } = await verifyToken(user.token);
			setIsLogin(true);
			console.log(users, payload.id);
			// console.log(userArray.find((user: user) => user.id === payload.id));
			setUser(users.find((user: user) => user.id === payload.id));
			return payload;
		} catch (err) {
			console.log(err);
			setIsLogin(false);
			setUser(initialState);
			return false;
		}
	};
	const Logout = () => {
		setUser(initialState);
		localStorage.setItem("token", "");
		setIsLogin(false);
	};
	const UpdateUser = (userData: user) => {
		const userIndex = userArray.findIndex(
			(user: user) => user.id === userData.id
		);
		const temp = [...userArray];
		temp[userIndex].todos = userData.todos;
		handleChangeUserArray(temp);
	};
	const getUserArrayFromLocalStorage = () =>
		JSON.parse(localStorage.getItem("users"))?.users;

	useEffect(() => {
		if (!localStorage.getItem("users")) {
			localStorage.setItem(
				"users",
				JSON.stringify({
					users: [
						{
							id: getNewId(),
							email: "astha@marquee-equity.com",
							name: "astha",
							password: "astha@123",
							todos: [],
						},
						{
							id: getNewId(),
							email: "admin@todo.com",
							name: "admin",
							password: "admin",
							todos: [],
						},
					],
				})
			);
		}
		setUserArray(getUserArrayFromLocalStorage());
		CheckToken(getUserArrayFromLocalStorage());
		// CheckToken().then((currentUser) => {
		// 	setUser(userArray.find((user) => user.id === currentUser.id));
		// });
	}, []);

	return (
		<UserContext.Provider
			value={{ user, isLogin, Login, SignUp, Logout, UpdateUser }}
		>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => {
	const { user, isLogin, Login, SignUp, Logout, UpdateUser } =
		useContext(UserContext);
	return { user, isLogin, Login, SignUp, Logout, UpdateUser };
};
