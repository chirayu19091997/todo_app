import { todo } from "@/utils/constants";
import React, { useState } from "react";
import { MdFormatListBulletedAdd } from "react-icons/md";

interface AddTodoProps {
	data: todo;
	setData: (arg0: todo) => void;
	onAddTodo: () => void;
}

const AddTodo = ({ data, setData, onAddTodo }: AddTodoProps) => {
	const [error, setError] = useState(false);

	return (
		<form
			className="flex w-full justify-between items-center"
			onSubmit={(e) => {
				e.preventDefault();
				if (data.label === "") {
					setError(true);
					return;
				}
				onAddTodo();
			}}
		>
			<input
				type="text"
				maxLength={30}
				placeholder={error ? "This Feild Cannot be Empty" : "Add Task"}
				value={data.label}
				onChange={(e) => {
					setError(false);
					setData({ ...data, label: e.target.value });
				}}
				className="border-b border-slate-400 text-black text-xl w-full px-4 p-2"
				style={{ borderBottom: error ? "2px solid red" : "" }}
			/>
			<button type="submit" className="ml-4 text-black" disabled={error}>
				<MdFormatListBulletedAdd size={40} />
			</button>
		</form>
	);
};

export default AddTodo;
