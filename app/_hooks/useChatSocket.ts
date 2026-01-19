import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useDispatch } from "react-redux";
import { onlineUsers } from "../store/features/authSlice";
import { TUser } from "../signup/SignupForm";

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

    return () => {
      socket.off("getOnlineUsers");
      socket.off("chatroom");
      socket.disconnect();
      socketRef.current = null;
    };
  }, [userId, dispatch]);

  return { socket: socketRef.current };
};
