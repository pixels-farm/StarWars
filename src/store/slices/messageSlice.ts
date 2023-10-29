import MessageType from "../../enum/MessageType";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

interface MessageState {
  state: boolean;
  options: {
    anchorOrigin: {
      vertical: "top" | "bottom";
      horizontal: "center" | "left" | "right";
    };
    autoHideDuration: 2000;
    message: string;
    variant: MessageType;
  };
}
const initialState: MessageState = {
  state: false,
  options: {
    anchorOrigin: {
      vertical: "top",
      horizontal: "center",
    },
    autoHideDuration: 2000,
    message: "",
    variant: MessageType.info,
  },
};
const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    showMessage: (state, action) => {
      state.state = true;
      state.options = {
        ...initialState.options,
        ...action.payload,
      };
    },
    hideMessage: (state) => {
      state.state = false;
    },
  },
});

export const { hideMessage, showMessage } = messageSlice.actions;

export const selectMessageState = ({ message }: RootState) => message.state;

export const selectMessageOptions = ({ message }: RootState) => message.options;

export default messageSlice.reducer;
