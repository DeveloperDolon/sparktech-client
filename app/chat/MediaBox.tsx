import { Header } from "antd/es/layout/layout";
import { RightOutlined } from "@ant-design/icons";
import { Button } from "antd";

const MediaBox = () => {
  return (
    <div className="h-[calc(100vh-125px)]">
      <Header
        style={{
          background: "white",
          padding: "30px 20px",
          height: "fit-content",
        }}
      >
        <div className="flex justify-between">
          <div className="flex gap-3.5">
            <h4 className="text-lg font-semibold">Media</h4>
            <p className="text-sm text-gray-500">38</p>
          </div>
          <Button type="text">
            View All <RightOutlined />
          </Button>
        </div>
      </Header>
    </div>
  );
};

export default MediaBox;
