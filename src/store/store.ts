import rootReducer from "./rootReducer";
import apiSlice from "@/features/apiSlice";
import { configureStore } from "@reduxjs/toolkit";
// import { createLogger } from "redux-logger";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
// Create a custom logger to ignore specific actions
// const logger = createLogger({
//   predicate: (getState, action) => {
//     // Exclude redux-persist actions
//     const ignoreActions = [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER];
//     return !ignoreActions.includes(action.type);
//   },
// });

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
