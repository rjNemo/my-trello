import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {v4} from 'uuid';

import {
  addListToBoard,
  createOneBoard,
  fetchAllBoards,
  addTaskToList,
  storeValidation,
} from './thunks';
import {BoardSliceState, BoardType, ListType, TaskParamsType} from './types';

const initialState: BoardSliceState = {
  boards: [],
};

const boardSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    loadAll: (state, action: PayloadAction<BoardType[]>) => {
      const boards = action.payload;
      return {...state, boards};
    },
    addOne: (state, action: PayloadAction<string>) => {
      const newBoard: BoardType = {
        title: action.payload,
        id: state.boards.length.toString(),
        lists: [],
      };
      return {...state, boards: [...state.boards, newBoard]};
    },
    addList: (state, action: PayloadAction<{bid: string; title: string}>) => {
      const {bid, title} = action.payload;
      const board = state.boards.find(b => b.id === bid);

      if (!board) return state;

      const newList: ListType = {
        id: v4(),
        title,
        tasks: [],
      };

      board.lists.push(newList);
    },
    addTask: (
      state,
      action: PayloadAction<{bid: string; lid: string; taskName: string}>,
    ) => {
      const {bid, taskName, lid} = action.payload;

      const board = state.boards.find(b => b.id === bid);
      if (!board) return state;

      const list = board.lists.find(l => l.id === lid);
      if (!list) return state;

      const newTask = {
        id: v4(),
        value: taskName,
        isDone: false,
      };
      list.tasks.push(newTask);
    },
    toggleValidateTaskByID: (state, action: PayloadAction<TaskParamsType>) => {
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
  extraReducers: {
    [fetchAllBoards.fulfilled.toString()]: (
      state,
      action: PayloadAction<BoardType[]>,
    ) => {
      state.boards = action.payload;
    },
    [createOneBoard.fulfilled.toString()]: (
      state,
      action: PayloadAction<BoardType>,
    ) => {
      const newBoard = action.payload;
      return {...state, boards: [...state.boards, newBoard]};
    },
    [addListToBoard.fulfilled.toString()]: (
      state,
      action: PayloadAction<BoardType>,
    ) => {
      const newBoard = action.payload;
      return {...state, boards: [...state.boards, newBoard]};
    },
    [addTaskToList.fulfilled.toString()]: (
      state,
      action: PayloadAction<BoardType>,
    ) => {
      const newBoard = action.payload;
      return {...state, boards: [...state.boards, newBoard]};
    },
    [storeValidation.fulfilled.toString()]: (
      state,
      action: PayloadAction<BoardType>,
    ) => {
      const newBoard = action.payload;
      return {...state, boards: [...state.boards, newBoard]};
    },
  },
});

export const {
  loadAll,
  addOne,
  addList,
  addTask,
  toggleValidateTaskByID,
} = boardSlice.actions;

export default boardSlice.reducer;
