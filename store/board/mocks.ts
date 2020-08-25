import {BoardType} from './types';

export const mockBoards: BoardType[] = [
  {
    title: '1st',
    id: '0',
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
  {title: '2nd', id: '1', lists: []},
];
