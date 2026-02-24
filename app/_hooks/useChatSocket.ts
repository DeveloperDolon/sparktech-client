import { useCallback, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useDispatch } from "react-redux";
import { onlineUsers } from "../store/features/authSlice";
import { TUser } from "../signup/SignupForm";
import { TMessage } from "../types";
import { setNewMessage } from "../store/features/chatSlice";

export const useChatSocket = (userId: string | undefined) => {
  const socketRef = useRef<Socket | null>(null);
  const dispatch = useDispatch();

  const handleOnlineUsers = useCallback(
    (data: { users: TUser[] }) => {
      dispatch(onlineUsers(data?.users));
    },
    [dispatch],
  );

  const handleMessage = useCallback(
    (data: TMessage) => {
      dispatch(setNewMessage(data?.content));
    },
    [dispatch],
  );

  useEffect(() => {
    if (!userId) return;

    const socket = io("http://localhost:3005", { query: { userId } });
    socketRef.current = socket;

    socket.on("getOnlineUsers", handleOnlineUsers);

    socket.on("message", handleMessage);

    return () => {
      socket.off("getOnlineUsers");
      socket.off("chatroom");
      socket.disconnect();
      socketRef.current = null;
    };
  }, [userId, dispatch, handleOnlineUsers, handleMessage]);

  return { socket: socketRef.current };
};
