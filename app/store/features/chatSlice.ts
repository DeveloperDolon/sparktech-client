import { TUser } from "@/app/signup/SignupForm";
import { TChatRoom } from "@/app/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TChatSlice {
  userChat: TChatRoom | null;
  newMessage?: string | null;
  chatUser?: TUser | null;
}

const initialState: TChatSlice = {
  userChat: null,
  newMessage: null,
  chatUser: null,
};

const chatSlice = createSlice({
  name: "chatSlice",
  initialState,
  reducers: {
    setUserChat(state, action: PayloadAction<TChatSlice["userChat"] & {user?: TUser}>) {
      state.userChat = action.payload;
      console.log('chat user room', state.userChat);
      if(action?.payload?.user?.id) {
        state.chatUser = (action.payload?.users as TUser[])?.find(
          (item: TUser) => item.id !== action.payload?.user?.id,
        );
      }
    },
    setNewMessage(state, action: PayloadAction<TChatSlice["newMessage"]>) {
      state.newMessage = action.payload;
    }
  },
});

export const { setUserChat, setNewMessage } = chatSlice.actions;
export default chatSlice;
