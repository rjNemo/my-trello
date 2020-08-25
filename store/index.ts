import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';

import boardReducer from './board';

/**
 * Application State Store
 */
const store = configureStore({
  reducer: {board: boardReducer},
  devTools: true, // turn to false in production
});

/** Store State Type */
export type StoreState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, StoreState, unknown, Action<string>>;

export default store;
