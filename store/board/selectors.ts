import {StoreState} from '..';

/** Get all Boards */
export const selectBoards = (state: StoreState) => state.board.boards;

/** Get a Board indentified by its id */
export const selectBoardByID = (bid: number) => (state: StoreState) =>
  state.board.boards.find(b => b.id === bid);
