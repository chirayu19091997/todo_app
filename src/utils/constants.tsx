export const getNewTodo = (): todo => ({
	key: getNewId(),
	label: "",
	isCompleted: false,
	subTasks: [],
});

export const getNewId = () => {
	return Math.floor(Math.random() * 90000) + 10000;
};

export interface todo {
	key: number;
	label: string;
	isCompleted: boolean;
	subTasks: todo[];
}

export interface user {
	id: number;
	name: string;
	email: string;
	password: string;
	todos: todo[];
}
