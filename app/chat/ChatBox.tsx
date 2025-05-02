import { Avatar, Badge, Button } from "antd";
import { Header } from "antd/es/layout/layout";
import {
  UserOutlined,
  VideoCameraOutlined,
  PhoneOutlined,
  DashOutlined,
} from "@ant-design/icons";

const ChatBox = () => {
  return (
    <div>
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
              style={{ border: "none", fontSize:"25px" }}
              icon={<VideoCameraOutlined />}
            />

            <Button
              size="large"
              variant="text"
              style={{ border: "none", fontSize:"25px" }}
              icon={<PhoneOutlined />}
            />

            <Button
              size="large"
              variant="text"
              style={{ border: "none", fontSize:"25px" }}
              icon={<DashOutlined />}
            />
          </div>
        </div>
      </Header>
    </div>
  );
};

export default ChatBox;
