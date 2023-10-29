import { combineReducers } from "@reduxjs/toolkit";
import message from "./slices/messageSlice";
import type { Reducer } from "redux";

const createReducer =
  (asyncReducers: { [key: string]: Reducer } | false) =>
  (state: any, action: any) => {
    const combinedReducer = combineReducers({
      message,
      ...asyncReducers,
    });

    /*
	Reset the redux store when user logged out
	 */
    if (action.type === "user/userLoggedOut") {
      // state = undefined;
    }

    return combinedReducer(state, action);
  };

export default createReducer;
