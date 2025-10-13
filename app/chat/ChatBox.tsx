
"use client";
import { Avatar, Badge, Button, Input } from "antd";
import { Header } from "antd/es/layout/layout";
import {
  SendOutlined,
  PaperClipOutlined,
  SmileOutlined,
  UserOutlined,
  VideoCameraOutlined,
  PhoneOutlined,
  DashOutlined,
} from "@ant-design/icons";
import { io, Socket } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { onlineUsers } from "../store/features/authSlice";
import { TUser } from "../signup/SignupForm";
import { TChatRoom, TMessage } from "../types";
import Message from "./Message";
import "./style.css";
import { setUserChat } from "../store/features/chatSlice";

interface SendMessageEvent extends React.FormEvent<HTMLFormElement> {
  target: HTMLFormElement & {
    message: { value: string };
  };
}

const ChatBox = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const userChat = useSelector((state: RootState) => state.chat.userChat);
  const socketRef = useRef<Socket | null>(null);
  const dispatch = useDispatch();
  const chatUser = (userChat?.users as TUser[])?.find(
    (item: TUser) => item.id !== user?.id
  );

  const [messages, setMessages] = useState<TMessage[]>([]);

  useEffect(() => {
    if (userChat?.messages) {
      setMessages(userChat?.messages as TMessage[]);
    }
  }, [userChat?.messages]);
  // Move socket initialization to a shared context or a custom hook for reuse across components.

  useEffect(() => {
    if (user?.id && !socketRef.current) {
      socketRef.current = io("http://localhost:3005", {
        query: {
          userId: user.id,
        },
      });

      socketRef.current.on("connect", () => {
        console.log("Connected to server");
      });

      socketRef.current.on("chatroom", (data: { chatRoom: TChatRoom, newMessage: string }) => {
        console.log("This is the data collection for create chat room and new message.", data?.chatRoom);
        dispatch(setUserChat(data?.chatRoom));
      });

      socketRef.current.on("message", (data: TMessage) => {
        if (chatUser?.id !== data.sender) {
          setMessages((prev) => [...prev, data]);
        }
      });

      socketRef.current.on("getOnlineUsers", (data: { users: TUser[] }) => {
        dispatch(onlineUsers(data?.users));
        console.log("Online users:", data);
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [user]);

  // To use socket events in another component:
  // 1. Move socketRef and its initialization to a React context or a custom hook (e.g., useSocket).
  // 2. In other components, use the context/hook to access the socket instance and add event listeners as needed.
  // Example:
  // const socket = useSocket();
  // useEffect(() => {
  //   socket?.on("someEvent", handler);
  //   return () => socket?.off("someEvent", handler);
  // }, [socket]);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (data: SendMessageEvent): Promise<void> => {
    try {
      data.preventDefault();
      
      if (message && socketRef.current) {
        setMessages((prev) => [
          ...prev,
          {
            content: message,
            chatRoom: userChat?.id ?? "",
            receiverId: chatUser?.id ?? "",
            sender: user?.id ?? "",
          },
        ]);
        setMessage("");
        socketRef.current.emit("message", {
          message,
          roomId: userChat?.id,
          authId: user?.id,
          userId: chatUser?.id,
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  
  return (
    <div className="h-[calc(100vh-125px)]">
      {chatUser ? (
        <>
          <Header
            style={{
              background: "white",
              padding: "30px 20px",
              height: "fit-content",
            }}
          >
            <div className="flex justify-between items-center">
              <div className="flex gap-5 items-center cursor-pointer">
                <Badge
                  dot
                  style={{ height: "10px", width: "10px" }}
                  color="green"
                  offset={[-5, 50]}
                >
                  <Avatar
                    size={55}
                    icon={<UserOutlined />}
                    className="hover:scale-105 transition-transform"
                  />
                </Badge>

                <div>
                  <h4 className="text-lg font-semibold">{chatUser?.name}</h4>

                  <p className="text-sm text-[#F1674A]">Typing...</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  size="large"
                  variant="text"
                  style={{ border: "none", fontSize: "25px" }}
                  icon={<VideoCameraOutlined />}
                />

                <Button
                  size="large"
                  variant="text"
                  style={{ border: "none", fontSize: "25px" }}
                  icon={<PhoneOutlined />}
                />

                <Button
                  size="large"
                  variant="text"
                  style={{ border: "none", fontSize: "25px" }}
                  icon={<DashOutlined />}
                />
              </div>
            </div>
          </Header>

          <div className="flex flex-col h-full">
            <div className="flex-1 px-[20px] h-0 flex flex-col">
              <div className="flex-1 flex flex-col gap-4 overflow-y-auto hide-scrollbar">
                {messages?.map((message, idx) => (
                  <Message
                    key={idx}
                    message={message?.content}
                    isSender={user?.id === message?.sender}
                  />
                ))}
                <div ref={bottomRef} />
              </div>
            </div>

            <form
              onSubmit={handleSendMessage}
              className=" w-full place-self-end bg-white py-3 px-[20px]"
            >
              <Input
                name="message"
                placeholder="Write a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                prefix={
                  <div>
                    <Button
                      type="text"
                      style={{ fontSize: "20px" }}
                      icon={<PaperClipOutlined />}
                    />
                    <Button
                      type="text"
                      style={{ fontSize: "20px" }}
                      icon={<SmileOutlined />}
                    />
                  </div>
                }
                suffix={
                  <Button
                    htmlType="submit"
                    type="text"
                    style={{ fontSize: "20px" }}
                    icon={<SendOutlined />}
                  />
                }
                style={{
                  borderRadius: "20px",
                  padding: "8px 16px",
                  border: "none",
                }}
              />
            </form>
          </div>
        </>
      ) : (
        <div className="h-full w-full flex justify-center items-center font-semibold">
          Select a user for chat
        </div>
      )}
    </div>
  );
};

export default ChatBox;
