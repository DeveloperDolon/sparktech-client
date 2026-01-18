import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useDispatch } from "react-redux";
import { onlineUsers } from "../store/features/authSlice";
import { setUserChat } from "../store/features/chatSlice";
import { TUser } from "../signup/SignupForm";
import { TChatRoom } from "../types";

export const useChatSocket = (userId: string | undefined) => {
  const socketRef = useRef<Socket | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userId) return;

    const socket = io("http://localhost:3005", { query: { userId } });
    socketRef.current = socket;

    socket.on("getOnlineUsers", (data: { users: TUser[] }) => {
      dispatch(onlineUsers(data?.users));
    });

    socket.on("chatroom", (data: { chatRoom: TChatRoom; newMessage: string }) => {
      dispatch(setUserChat(data?.chatRoom));
    });

    return () => {
      socket.off("getOnlineUsers");
      socket.off("chatroom");
      socket.disconnect();
      socketRef.current = null;
    };
  }, [userId, dispatch]);

  return { socket: socketRef.current };
};
