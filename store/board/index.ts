import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {BoardSliceState, BoardType, ListType} from './types';

const initialState: BoardSliceState = {
  boards: [
    {
      title: '1st',
      id: 0,
      lists: [
        {
          id: 0,
          title: 'First thing to do',
          tasks: [
            {id: 0, value: 'First Task', isDone: false},
            {id: 1, value: 'Second Task', isDone: true},
          ],
        },
      ],
    },
    {title: '2nd', id: 1, lists: []},
  ],
};

const boardSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    newBoard: (state, action: PayloadAction<string>) => {
      const newBoard: BoardType = {
        title: action.payload,
        id: state.boards.length,
        lists: [],
      };
      return {...state, boards: [...state.boards, newBoard]};
    },
    addListToBoard: (
      state,
      action: PayloadAction<{bid: number; title: string}>,
    ) => {
      const {bid, title} = action.payload;
      const board = state.boards.find(b => b.id === bid);

      if (!board) return state;

      const newList: ListType = {
        id: board.lists.length,
        title,
        tasks: [],
      };

      board.lists.push(newList);
    },
    addTaskToList: (
      state,
      action: PayloadAction<{bid: number; lid: number; taskName: string}>,
    ) => {
      const {bid, taskName, lid} = action.payload;

      const board = state.boards.find(b => b.id === bid);
      if (!board) return state;

      const list = board.lists.find(l => l.id === lid);
      if (!list) return state;

      const newTask = {
        id: list.tasks.length,
        value: taskName,
        isDone: false,
      };
      list.tasks.push(newTask);
    },
    toggleValidateTaskByID: (
      state,
      action: PayloadAction<{taskID: number; listID: number; boardID: number}>,
    ) => {
      const {boardID, listID, taskID} = action.payload;

      const board = state.boards.find(b => b.id === boardID);
      if (!board) return state;

      const list = board.lists.find(l => l.id === listID);
      if (!list) return state;

      const task = list.tasks.find(t => t.id === taskID);
      if (!task) return state;

      task.isDone = !task.isDone;
    },
  },
});

export const {
  newBoard,
  addListToBoard,
  addTaskToList,
  toggleValidateTaskByID,
} = boardSlice.actions;

export default boardSlice.reducer;
