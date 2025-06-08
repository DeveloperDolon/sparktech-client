import { TUser } from "@/app/signup/SignupForm";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  isAuthenticated: boolean;
  user: null | {
    id: string;
    name: string;
    email: string;
  };
  token: string | null;
  loading: boolean;
  error: string | null;
  onlineUsers?: TUser[]; 
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(
      state,
      action: PayloadAction<AuthState["user"]>
    ) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
    },
    onlineUsers(state, action: PayloadAction<TUser[]>) {
      state.onlineUsers = action.payload;
    }
  },
});

export const { setUser, loginFailure, logout, onlineUsers } =
  authSlice.actions;
export default authSlice;
