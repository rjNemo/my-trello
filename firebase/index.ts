import app from 'firebase/app';
import 'firebase/firestore';

import {BoardType, ListType} from '../store/board/types';

export const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Check that window is in scope. Useful for analytics module
if (typeof window !== undefined && !app.apps.length) {
  app.initializeApp(config);
}

const db = app.firestore();

const BOARDS = 'boards';

const dataStore = {
  async getAllBoards(): Promise<BoardType[]> {
    const boards = await db.collection(BOARDS).get();

    return boards.docs.map(b => ({
      id: b.id,
      title: b.data().title as string,
      lists: b.data().lists as ListType[],
    }));
  },
  async addBoard(boardName: string): Promise<BoardType> {
    const newBoard = {
      title: boardName,
      lists: [],
    };
    const doc = await db.collection(BOARDS).add(newBoard);

    return {...newBoard, id: doc.id};
  },
  async updateBoard(bid: string, board: any): Promise<void> {
    await db.collection(BOARDS).doc(bid).update(board);
    return board;
  },
};

export default dataStore;
