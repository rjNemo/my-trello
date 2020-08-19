export type BoardSliceState = {
  boards: BoardType[];
};

export type ListType = {
  id: number;
  title: string;
  tasks: TaskType[];
};

export type TaskType = {
  id: number;
  value: string;
  isDone: boolean;
};

export type BoardType = {
  title: string;
  id: number;
  lists: ListType[];
};
