import {createAsyncThunk} from '@reduxjs/toolkit';

import {v4} from 'uuid';
import {addTask, toggleValidateTaskByID} from '.';

import dataStore from '../../firebase/index'; // must write 'index' otherwise it reads firebase.json

import {
  AddTaskToListType,
  AddToListType,
  BoardType,
  TaskParamsType,
} from './types';

export const fetchAllBoards = createAsyncThunk<BoardType[]>(
  'boards/fetchAll',
  async () => await dataStore.getAllBoards(),
);

export const createOneBoard = createAsyncThunk<BoardType, string>(
  'board/createOne',
  async boardName => await dataStore.addBoard(boardName),
);

export const addListToBoard = createAsyncThunk<void, AddToListType>(
  'board/addListToBoard',
  async (data, thunkAPI) => {
    const {bid, title} = data;
    const board = thunkAPI
      .getState()
      .board.boards.find((b: BoardType) => b.id === bid);
    if (!board) return;

    // don't add id
    const newBoard = {
      title: board.title,
      lists: [
        ...board.lists,
        {
          id: v4(),
          title,
          tasks: [],
        },
      ],
    };
    return await dataStore.updateBoard(bid, newBoard);
  },
);

export const addTaskToList = createAsyncThunk<void, AddTaskToListType>(
  'board/addTaskToList',
  async (data, thunkAPI) => {
    const {bid} = data;

    thunkAPI.dispatch(addTask(data));

    const board = thunkAPI
      .getState()
      .board.boards.find((b: BoardType) => b.id === bid);
    if (!board) return;

    return await dataStore.updateBoard(bid, board);
  },
);

export const storeValidation = createAsyncThunk<void, TaskParamsType>(
  'board/validateTask',
  async (data, thunkAPI) => {
    thunkAPI.dispatch(toggleValidateTaskByID(data));
    const {boardID: bid} = data;

    const board = thunkAPI
      .getState()
      .board.boards.find((b: BoardType) => b.id === bid);
    if (!board) return;

    return await dataStore.updateBoard(bid, board);
  },
);
