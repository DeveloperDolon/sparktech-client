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
  MediumSquareFilled,
  CloseOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { TUser } from "../signup/SignupForm";
import { TChatRoom, TMessage } from "../types";
import Message from "./Message";
import "./style.css";
import { setNewMessage, setUserChat } from "../store/features/chatSlice";
import MediaBox from "./MediaBox";
import { useChatSocket } from "../_hooks/useChatSocket";

interface SendMessageEvent extends React.FormEvent<HTMLFormElement> {
  target: HTMLFormElement & {
    message: { value: string };
  };
}

const ChatBox = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const userChat = useSelector((state: RootState) => state.chat.userChat);
  const { socket } = useChatSocket(user?.id);
  const dispatch = useDispatch();
  const chatUser = useSelector((state: RootState) => state.chat.chatUser);

  const [messages, setMessages] = useState<TMessage[]>([]);

  const handleChatRoom = useCallback(
    (data: { chatRoom: TChatRoom; newMessage: string }) => {
      if (!userChat) {
        dispatch(
          setUserChat({
            user: user as TUser,
            ...data?.chatRoom,
          }),
        );
      }
    },
    [dispatch, user, userChat],
  );

  useEffect(() => {
    if (userChat?.messages) {
      setMessages(userChat?.messages as TMessage[]);
    }
  }, [userChat?.id]);
  // Move socket initialization to a shared context or a custom hook for reuse across components.

  useEffect(() => {
    if (!socket || !chatUser?.id) return;

    const handleIncomingMessage = (data: TMessage) => {
      if (data.sender === chatUser.id) {
        if (data.isSeen === false && data.receiverId === user?.id && socket) {
          socket.emit("messageSeen", {
            messageId: data.id as string,
            chatRoomId: userChat?.id as string,
          });
        }
        dispatch(setNewMessage(data?.content));
        setMessages((prev) => [...prev, data]);
      } else {
        dispatch(setNewMessage(data?.content));
      }
    };

    socket.on("chatroom", handleChatRoom);

    socket.on("message", handleIncomingMessage);

    return () => {
      socket.off("message", handleIncomingMessage);
    };
  }, [socket, chatUser?.id]);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (data: SendMessageEvent): Promise<void> => {
    try {
      data.preventDefault();

      if (message && socket) {
        setMessages((prev) => [
          ...prev,
          {
            content: message,
            chatRoom: userChat?.id ?? "",
            receiverId: chatUser?.id ?? "",
            sender: user?.id ?? "",
            isSeen: false,
          },
        ]);
        socket.emit("message", {
          message,
          roomId: userChat?.id,
          authId: user?.id,
          userId: chatUser?.id,
        });
        dispatch(setNewMessage(message));
        setMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const openMediaSection = () => {
    const mediaSection = document.getElementById("media_section");
    if (mediaSection) {
      mediaSection.style.right = "0";
    }
  };

  const closeMediaSection = () => {
    const mediaSection = document.getElementById("media_section");
    if (mediaSection) {
      mediaSection.style.right = "-100%";
    }
  };

  const goBack = async () => {
    try {
      const chatBox = document.getElementById("chat_box");
      const chatList = document.getElementById("chat_list");

      if (!chatBox?.classList.contains("hidden")) {
        chatBox?.classList.add("hidden");
      }

      if (chatList?.classList.contains("hidden")) {
        chatList?.classList.remove("hidden");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-[calc(100vh-125px)] relative">
      {chatUser ? (
        <>
          <Header
            className="!px-[20px] 2xl:!py-[25px] md:!py-[20px] !py-[10px]"
            style={{
              background: "white",
              height: "fit-content",
            }}
          >
            <div className="flex justify-between items-center">
              <div className="flex gap-5 items-center cursor-pointer">
                <button
                  className="
                    !border-none 
                    2xl:!hidden
                    cursor-pointer
                    !text-[15px]
                  "
                  onClick={() => goBack()}
                >
                  <ArrowLeftOutlined />
                </button>
                <Badge
                  dot
                  style={{ height: "10px", width: "10px" }}
                  color="green"
                  offset={[-5, 50]}
                >
                  <Avatar
                    size={40}
                    icon={<UserOutlined />}
                    className="
                      hover:scale-105
                      transition-transform 
                      !w-[40px] !h-[40px] 
                      md:!w-[55px] md:!h-[55px]
                      lg:!w-[60px] lg:!h-[60px]
                    "
                  />
                </Badge>

                <div>
                  <h4 className="2xl:text-lg text-base font-semibold">
                    {chatUser?.name}
                  </h4>

                  <p className="2xl:text-sm text-xs text-[#F1674A]">
                    Typing...
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  size="large"
                  variant="text"
                  icon={<VideoCameraOutlined />}
                  className="
                    !border-none 
                    !text-xl 
                    2xl:!text-[25px]
                  "
                />

                <Button
                  size="large"
                  variant="text"
                  icon={<PhoneOutlined />}
                  className="
                    !border-none 
                    !text-xl 
                    2xl:!text-[25px]
                  "
                />

                <Button
                  size="large"
                  variant="text"
                  icon={<DashOutlined />}
                  className="
                    !border-none 
                    !text-xl 
                    2xl:!text-[25px]
                  "
                />

                <Button
                  className="
                    2xl:!hidden 
                    !border-none 
                    !text-xl
                "
                  size="large"
                  variant="text"
                  icon={<MediumSquareFilled />}
                  onClick={() => openMediaSection()}
                />
              </div>
            </div>
          </Header>

          <div className="flex flex-col h-full">
            <div className="flex-1 px-[20px] h-0 flex flex-col">
              <div className="flex-1 flex flex-col gap-4 overflow-y-auto hide-scrollbar pt-5">
                {messages?.map((message, idx) => {
                  return (
                    <Message
                      key={idx}
                      message={message?.content}
                      isSender={user?.id === message?.sender}
                    />
                  );
                })}
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

      <div
        id="media_section"
        className="absolute transition-all duration-500 top-0 2xl:right-[-100%] md:right-[-50%] 
        right-[-100%] bg-white shadow-lg z-50 p-2 h-[100vh] overflow-y-scroll 2xl:w-[50%] md:w-[50%] w-[100%]"
      >
        <Button
          type="text"
          style={{ fontSize: "20px", background: "red", color: "white" }}
          icon={<CloseOutlined />}
          onClick={() => closeMediaSection()}
        />

        <MediaBox height="auto" />
      </div>
    </div>
  );
};

export default ChatBox;
