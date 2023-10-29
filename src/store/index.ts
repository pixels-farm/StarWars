import { configureStore } from "@reduxjs/toolkit";
import createReducer from "./rootReducer";
import type { Reducer } from "redux";

// if (process.env.NODE_ENV === 'development' && module.hot) {
//   module.hot.accept('./rootReducer', () => {
//     const newRootReducer = require('./rootReducer').default;
//     store.replaceReducer(newRootReducer.createReducer());
//   });
// }

const asyncReducers: { [key: string]: Reducer } = {};

const store = configureStore({
  reducer: createReducer(false),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: {
        ignoredActions: ["message/showMessage", "message/hideMessage"],
      },
    }),
  ...asyncReducers,
  devTools: process.env.NODE_ENV === "development",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const injectReducer = (key: string, reducer: Reducer) => {
  if (asyncReducers[key]) {
    return false;
  }
  asyncReducers[key] = reducer;
  store.replaceReducer(createReducer(asyncReducers));
  return store;
};

export default store;
