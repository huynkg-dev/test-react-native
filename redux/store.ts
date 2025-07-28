import { configureStore } from '@reduxjs/toolkit';
import {
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import { mmkvStorage } from './mmkv';
import rootSaga from './sagas';
import rootReducer from './slices';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const createSagaMiddleware = require('redux-saga').default;

// Redux Persist Configuration
const persistConfig = {
  key: 'root',
  storage: mmkvStorage,
  whitelist: ['user'], // Only persist these reducers
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create Saga Middleware
const sagaMiddleware = createSagaMiddleware();

// Configure Store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          PERSIST,
          REHYDRATE,
          PAUSE,
          PURGE,
          REGISTER,
        ],
      },
    }).concat(sagaMiddleware),
});

// Run Root Saga
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>;
export const persistor = persistStore(store);
export default store;