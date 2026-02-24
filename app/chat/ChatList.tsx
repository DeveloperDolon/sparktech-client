import { Avatar, Badge, Input } from "antd";
import { CheckOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { TUser } from "../signup/SignupForm";
import {
  useChatroomListQuery,
  useCreateChatroomMutation,
} from "../store/api/chatroom.api";
import { TChatRoom, TMessage } from "../types";
import { setUserChat } from "../store/features/chatSlice";
import { formatTo12HourTime } from "../utils/formatTo12HourTime";
import { useChatSocket } from "../_hooks/useChatSocket";

const ChatList = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const newMessage = useSelector((state: RootState) => state.chat.newMessage);
  const users = useSelector((state: RootState) => state.auth.onlineUsers);
  const user = useSelector((state: RootState) => state.auth.user);
  const { socket } = useChatSocket(user?.id);
  const [createChatroom] = useCreateChatroomMutation();
  const { data: chatroomList, refetch } = useChatroomListQuery(1);
  const dispatch = useDispatch();

  useEffect(() => {
    refetch();
  }, [newMessage]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;

    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();

    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMessageSeen = useCallback(
    () => (data: { message: TMessage; chatRoomId: string }) => {
      chatroomList?.data?.forEach((chatRoom: TChatRoom) => {
        if (chatRoom.id === data.chatRoomId) {
          chatRoom.messages = chatRoom.messages.map((msg: TMessage) =>
            msg.id === data.message.id ? data?.message : msg,
          );
        }
      });
    },
    [chatroomList?.data],
  );

  const handleChatRoom = async (
    userId: string,
    unSeenMessage: TMessage | null = null,
  ) => {
    try {
      const chatBox = document.getElementById("chat_box");
      const chatList = document.getElementById("chat_list");

      const result: { data: TChatRoom } = await createChatroom({
        userId,
      }).unwrap();

      dispatch(
        setUserChat({
          ...result?.data,
          user: user as TUser,
        }),
      );

      if (unSeenMessage && socket) {
        socket.emit("messageSeen", {
          messageId: unSeenMessage.id as string,
          chatRoomId: result?.data.id as string,
        });

        socket.on("messageSeen", handleMessageSeen);
      }

      refetch();

      if (chatBox?.classList.contains("hidden")) {
        chatBox?.classList.remove("hidden");
      }

      if (!chatList?.classList.contains("hidden")) {
        chatList?.classList.add("hidden");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-screen overflow-y-auto px-10 pt-12 border-l border-gray-200">
      <div className="2xl:block flex items-center 2xl:gap-0 gap-5">
        <h1 className="md:text-4xl sm:text-3xl text-xl font-semibold">Chat</h1>

        <Input
          className="
          bg-[#F8F8F9]       
            !p-[10px]        
            2xl:!p-[16px]     
            2xl:mt-[40px]
            !text-[15px]         
            md:!text-[16px]      
            2xl:!text-[20px]     
          "
          size="large"
          placeholder="Search people or message"
          prefix={
            <SearchOutlined
              className="
                !text-[20px]         
                md:!text-[22px]      
                2xl:!text-[28px]
                "
              style={{ color: "gray" }}
            />
          }
        />
      </div>

      <div className="relative">
        <h2 className="text-xl font-semibold mt-6">Online</h2>
        <div
          ref={sliderRef}
          className="mt-4 w-full flex gap-5 overflow-x-auto select-none cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: "none" }}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {users?.map((user: TUser) => (
            <div
              onClick={() => handleChatRoom(user?.id as string)}
              key={user?.id}
              className="flex-shrink-0"
            >
              <div className="flex justify-center">
                <Badge
                  dot
                  style={{ height: "10px", width: "10px" }}
                  color="green"
                  offset={[-5, 50]}
                >
                  <Avatar
                    size={55}
                    icon={<UserOutlined />}
                    className="hover:scale-105 transition-transform mx-auto"
                  />
                </Badge>
              </div>
              <p className="text-sm mt-3 font-poppins">{user?.name}</p>
            </div>
          ))}
        </div>

        <style jsx>{`
          .overflow-x-auto::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>

      <div className="mt-7">
        <h2 className="text-xl font-semibold ">Messages</h2>

        <div className="mt-5 w-full space-y-5">
          {chatroomList?.data?.map(
            (
              chatRoom: TChatRoom & {
                usersData: TUser[];
                latestMessage: (TMessage & { createdAt: Date })[];
              },
            ) => {
              const chatUser = chatRoom?.usersData?.find(
                (ctUser: TUser) =>
                  typeof ctUser !== "string" && ctUser?.id !== user?.id,
              );

              const dotColor =
                chatUser?.status === "online" ? "green" : "white";

              const notSeenByReceiver =
                !chatRoom?.latestMessage[0]?.isSeen &&
                chatRoom?.latestMessage[0]?.receiverId === user?.id;
              return (
                <div
                  key={chatRoom?.id}
                  onClick={() =>
                    handleChatRoom(
                      chatUser?.id as string,
                      chatRoom?.latestMessage[0]?.isSeen
                        ? null
                        : chatRoom?.latestMessage[0],
                    )
                  }
                  className={`flex gap-4 cursor-pointer ${notSeenByReceiver ? "bg-gray-100" : ""}`}
                >
                  <Badge
                    dot
                    style={{ height: "10px", width: "10px" }}
                    color={dotColor}
                    offset={[-5, 50]}
                  >
                    <Avatar
                      size={55}
                      icon={<UserOutlined />}
                      className="hover:scale-105 transition-transform"
                    />
                  </Badge>

                  <div className="flex-1 border-b border-gray-200 pb-3">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="2xl:text-lg md:text-base text-sm font-semibold">
                        {(chatUser as TUser)?.name}
                      </h4>

                      <p className="2xl:text-sm md:text-xs text-[10px] ml-auto">
                        {formatTo12HourTime(
                          chatRoom?.latestMessage[0]?.createdAt as Date,
                        )}
                      </p>
                    </div>

                    <div className={`flex gap-3 items-center`}>
                      <div className="relative text-[#F1674A]">
                        <CheckOutlined />
                        <CheckOutlined className="absolute top-0.5 left-1" />
                      </div>

                      <p
                        className={`2xl:text-sm md:text-xs text-[10px] w-full`}
                      >
                        {chatRoom?.latestMessage[0]?.content?.length > 15 ? (
                          chatRoom?.latestMessage[0]?.content.slice(0, 15) +
                          "..."
                        ) : (
                          <span
                            className={
                              notSeenByReceiver
                                ? "flex text-black font-bold w-full justify-between items-center"
                                : "text-gray-500"
                            }
                          >
                            {chatRoom?.latestMessage[0]?.content}
                            <span
                              className={
                                notSeenByReceiver
                                  ? "inline-block 2xl:h-2 2xl:w-2 h-1 w-1 bg-red-500 rounded-full"
                                  : ""
                              }
                            />
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              );
            },
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatList;
