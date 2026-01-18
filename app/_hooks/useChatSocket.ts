import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useDispatch } from "react-redux";
import { onlineUsers } from "../store/features/authSlice";
import { setUserChat } from "../store/features/chatSlice";
import { TUser } from "../signup/SignupForm";
import { TChatRoom } from "../types";

const SOCKET_URL = "http://localhost:3005";

export const useChatSocket = (userId: string | undefined) => {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userId) return;

    const socket = io(SOCKET_URL, {
      query: { userId },
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      setIsConnected(true);
      console.log("Connected to socket server");
    });

    socket.on(
      "chatroom",
      (data: { chatRoom: TChatRoom; newMessage: string }) => {
        dispatch(setUserChat(data?.chatRoom));
      },
    );

    socket.on("getOnlineUsers", (data: { users: TUser[] }) => {
      dispatch(onlineUsers(data?.users));
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [userId, dispatch]);

  return { socket: socketRef.current, isConnected };
};
