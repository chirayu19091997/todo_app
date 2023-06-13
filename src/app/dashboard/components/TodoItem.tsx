import { getNewTodo, todo } from "@/utils/constants";
import React, { useState } from "react";
import { BsChevronCompactUp, BsChevronCompactDown } from "react-icons/bs";
import AddTodo from "./AddTodo";
import TodoLabel from "./TodoLabel";

interface TodoItemProps {
	item: todo;
	index: number;
	updateTodo: (arg0: todo) => void;
}

const TodoItem = ({ item, index, updateTodo }: TodoItemProps) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [data, setData] = useState(getNewTodo());
	const [subTasks, setSubTasks] = useState(item.subTasks);

	const onAddSubTodo = () => {
		const temp = [...subTasks];
		temp.push(data);
		setSubTasks(temp);
		updateTodo({ ...item, subTasks: temp });
		setData(getNewTodo());
	};

	const onItemChange = () => {
		updateTodo({ ...item, isCompleted: !item.isCompleted });
	};

	const onSubItemChange = (subIndex: number) => {
		const temp = [...subTasks];
		temp[subIndex].isCompleted = !temp[subIndex].isCompleted;
		updateTodo({ ...item, subTasks: temp });
	};

	return (
		<div className="flex flex-col w-full border items-center justify-between rounded-md p-4 px-8 mt-2">
			<div className="flex w-full justify-between">
				<TodoLabel item={item} index={index} onChangeFunction={onItemChange} />
				{isExpanded ? (
					<BsChevronCompactUp
						size={30}
						onClick={() => {
							setIsExpanded(!isExpanded);
						}}
					/>
				) : (
					<BsChevronCompactDown
						size={30}
						onClick={() => {
							setIsExpanded(!isExpanded);
						}}
					/>
				)}
			</div>
			{/* nested todos */}
			{isExpanded && (
				<div className="ml-16 m-4 flex flex-col w-full space-y-2">
					{subTasks.map((subItem: todo, subIndex: number) => {
						return (
							<div
								key={`st-${subIndex}`}
								className="flex w-full justify-between"
							>
								<TodoLabel
									item={subItem}
									index={subIndex}
									onChangeFunction={onSubItemChange}
								/>
							</div>
						);
					})}
					{!item.isCompleted && (
						<AddTodo data={data} setData={setData} onAddTodo={onAddSubTodo} />
					)}
				</div>
			)}
		</div>
	);
};

export default TodoItem;
