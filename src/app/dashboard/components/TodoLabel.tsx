import { todo } from "@/utils/constants";
import React from "react";

interface TodoLabelProps {
	item: todo;
	index: number;
	onChangeFunction: (arg0: number) => void;
}

const TodoLabel = ({ item, index, onChangeFunction }: TodoLabelProps) => {
	return (
		<div className="flex items-center space-x-4 text-xl">
			<input
				type="checkbox"
				checked={item?.isCompleted}
				onChange={() => {
					onChangeFunction(index);
				}}
				className=" p-20 h-5 w-5"
			/>
			<p
				style={{
					textDecoration: item.isCompleted ? "line-through" : "",
				}}
			>
				{item?.label}
			</p>
		</div>
	);
};

export default TodoLabel;
