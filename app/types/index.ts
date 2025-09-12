import { TUser } from "../signup/SignupForm";

export type TSignUpUser = {
  password: string;
  user: {
    name: string;
    email: string;
  };
};

export type TLoginUser = {
  email: string;
  password: string;
};

export type TChatRoom = {
  id?: string;
  name?: string;
  users: string[] | TUser[];
  messages: TMessage[];
  isGroup: boolean;
  newMessage?: string;
};

export type TMessage = {
  id?: string;
  content: string;
  chatRoom: string;
  receiverId: string;
  sender: string;
};
