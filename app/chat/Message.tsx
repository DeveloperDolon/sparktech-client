import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

interface MessageProps {
  message: string;
  isSender: boolean;
}

const Message = ({ message, isSender }: MessageProps) => {
  return (
    <>
      {isSender ? (
        <div className="flex gap-5 items-start justify-end">
          <div className="bg-blue-500 p-3 rounded-lg max-w-[70%]">
            <p className="text-sm text-white font-semibold">{message}</p>
          </div>
          <Avatar size={40} icon={<UserOutlined />} />
        </div>
      ) : (
        <div className="flex gap-5 items-start">
          <Avatar size={40} icon={<UserOutlined />} />
          <div className="bg-[#E0E0E0] p-3 rounded-lg max-w-[70%]">
            <p className="text-sm font-semibold">{message}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Message;
