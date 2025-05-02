import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const ChatList = () => {
  return (
    <div className="h-screen px-10 pt-12 border-l border-gray-200">
      <h1 className="md:text-4xl sm:text-3xl text-2xl font-semibold">Chat</h1>

      <Input
        size="large"
        style={{
          padding: "16px",
          background: "#F8F8F9",
          marginTop: "40px"
        }}
        placeholder="Search people or message"
        prefix={<SearchOutlined style={{ fontSize: "25px", color: "gray" }} />}
      />
    </div>
  );
};

export default ChatList;
