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

export const sanitize = (str: string) => {
  str = str.replace(/[^A-Za-z0-9 \.@,_-]/gim, "");
  return str.trim();
};

export const validateInput = (email: string, password: string) => {
  if (
    !String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  ) {
    return { success: false, message: "Enter valid email" };
  }
  if (
    !String(password)
      .toLowerCase()
      .match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
  ) {
    return {
      success: false,
      message: `Password Must be \n - Minimum 8 length  \n - One letter \n - One number \n - One Special Character`,
    };
  }
  return { success: true, message: "" };
};
