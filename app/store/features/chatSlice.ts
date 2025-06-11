import { TChatRoom } from "@/app/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TChatSlice {
  userChat: TChatRoom | null;
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
  },
});

export const { setUserChat } = chatSlice.actions;
export default chatSlice;
