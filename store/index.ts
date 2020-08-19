import {configureStore} from '@reduxjs/toolkit';

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

export default store;
