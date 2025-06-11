export type TSignUpUser = {
    password: string;
    user: {
        name: string;
        email: string;
    }
}

export type TLoginUser = {
    email: string;
    password: string;
}

export type TChatRoom = {
  id?: string;
  name?: string;
  users: string[];
  messages: string[];
  isGroup: boolean;
}
