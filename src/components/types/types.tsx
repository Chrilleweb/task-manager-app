// types.ts

export interface SubTask {
  _id: string;
  name: string;
  completed: boolean;
}

export interface ViewTaskResponse {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  subTasks: SubTask[];
  assignedTo: string[];
  userName: string;
  completed: boolean;
}
