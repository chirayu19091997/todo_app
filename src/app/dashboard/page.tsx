"use client";
import React, { useEffect, useState } from "react";
import TodoItem from "./components/TodoItem";
import { getNewTodo, todo } from "@/utils/constants";
import AddTodo from "./components/AddTodo";
import { useUser } from "@/utils/contexts";

const Dashboard = () => {
	const { user, UpdateUser } = useUser();
	const [todos, setTodos] = useState(user?.todos);
	const [data, setData] = useState(getNewTodo());

	const onAddTodo = () => {
		setTodos([...todos, data]);
		UpdateUser({ ...user, todos: [...todos, data] });
		setData(getNewTodo());
	};

	const updateTodo = (data: todo) => {
		const temp = [...todos];
		const index = temp.findIndex((i: todo) => i.key === data.key);
		temp[index] = data;
		UpdateUser({ ...user, todos: temp });
		setTodos(temp);
	};
	useEffect(() => {
		setTodos(user.todos);
	}, [user]);
	return (
		<div className="flex flex-col items-center w-screen h-screen bg-[#8855ff] p-8">
			<div className="flex flex-col w-full h-full bg-white p-8 rounded-2xl overflow-hidden">
				<AddTodo data={data} setData={setData} onAddTodo={onAddTodo} />
				<div className="flex max-md:flex-col w-full h-full mt-4 text-black items-center justify-center">
					<div className="flex flex-col w-full h-full md:border-r max-md:border-b border-slate-400 md:p-8 items-center overflow-y-auto">
						<h1 className="text-xl">Pending Todos</h1>
						{todos
							.filter((item: todo) => item.isCompleted === false)
							.map((item: todo, index: number) => {
								return (
									<TodoItem
										key={`pt-${index}`}
										item={item}
										index={index}
										updateTodo={updateTodo}
									/>
								);
							})}
					</div>
					<div className="flex flex-col w-full h-full p-8 items-center overflow-y-auto">
						<h1 className="text-xl">Completed Todos</h1>
						{todos
							.filter((item: todo) => item.isCompleted === true)
							.map((item: todo, index: number) => {
								return (
									<TodoItem
										key={`ct-${index}`}
										item={item}
										index={index}
										updateTodo={updateTodo}
									/>
								);
							})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
