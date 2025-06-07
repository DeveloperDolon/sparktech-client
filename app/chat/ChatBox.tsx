import { Avatar, Badge, Button, Input } from "antd";
import { Header } from "antd/es/layout/layout";
import {
  SendOutlined,
  PaperClipOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import {
  UserOutlined,
  VideoCameraOutlined,
  PhoneOutlined,
  DashOutlined,
} from "@ant-design/icons";
import { io } from "socket.io-client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface SendMessageEvent extends React.FormEvent<HTMLFormElement> {
  target: HTMLFormElement & {
    message: { value: string };
  };
}

const ChatBox = () => {

  const user = useSelector((state: RootState) => state.auth.user);
  
  const socket = io("http://localhost:3005", {
    query: {
      userId: user?.id,
    },
  });

  const handleSendMessage = async (data: SendMessageEvent): Promise<void> => {
    try {
      data.preventDefault();
      const message = data.target.message.value.trim();

      if (message) {
        socket.emit("message", { text: message });
        data.target.message.value = "";
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {

    socket.on("connect", () => {
      console.log("Connected to server");
      socket.emit("message", "Hello from client!");
    });

    socket.on("message", (data: unknown) => {
      console.log("New message received:", data);
    });

    socket.on("getOnlineUsers", (data: unknown) => {
      console.log("Online users:", data);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <div className="h-[calc(100vh-125px)]">
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
              <h4 className="text-lg font-semibold">Jason Susanto</h4>

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

      <div className="flex flex-col h-full mt-5">
        <div className="flex-1/2 px-[20px] h-full">
          <div className="flex flex-col gap-4 h-full overflow-y-auto">
            <div className="flex gap-5 items-start">
              <Avatar size={40} icon={<UserOutlined />} />
              <div className="bg-[#E0E0E0] p-3 rounded-lg max-w-[70%]">
                <p className="text-sm font-semibold">Hello, how are you?</p>
              </div>
            </div>

            <div className="flex gap-5 items-start justify-end">
              <div className="bg-blue-500 p-3 rounded-lg max-w-[70%]">
                <p className="text-sm text-white font-semibold">
                  I&apos;m good, thanks! And you? The quick fox jump over the
                  lazy dog wshnb.
                </p>
              </div>
              <Avatar size={40} icon={<UserOutlined />} />
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSendMessage}
          className=" w-full place-self-end bg-white py-6 px-[20px]"
        >
          <Input
            name="message"
            placeholder="Write a message..."
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
    </div>
  );
};

export default ChatBox;
