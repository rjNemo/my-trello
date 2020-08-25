export type BoardSliceState = {
  boards: BoardType[];
};

export type ListType = {
  id: string;
  title: string;
  tasks: TaskType[];
};

export type TaskType = {
  id: string;
  value: string;
  isDone: boolean;
};

export type BoardType = {
  id: string;
  title: string;
  lists: ListType[];
};

export type AddToListType = {bid: string; title: string};

export type AddTaskToListType = {bid: string; lid: string; taskName: string};

export type TaskParamsType = {taskID: string; listID: string; boardID: string};
