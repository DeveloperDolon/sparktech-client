import { TChatRoom } from "@/app/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TChatSlice {
  userChat: TChatRoom | null;
  newMessage?: string | null;
}

const initialState: TChatSlice = {
  userChat: null,
};

const chatSlice = createSlice({
  name: "chatSlice",
  initialState,
  reducers: {
    setUserChat(state, action: PayloadAction<TChatSlice["userChat"]>) {
      state.userChat = action.payload;
    },
    setNewMessage(state, action: PayloadAction<TChatSlice["newMessage"]>) {
      state.newMessage = action.payload;
    },
  },
});

export const { setUserChat, setNewMessage } = chatSlice.actions;
export default chatSlice;
