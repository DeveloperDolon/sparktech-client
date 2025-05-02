import { Avatar, Badge, Input } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";

const ChatList = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

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

  return (
    <div className="h-screen px-10 pt-12 border-l border-gray-200">
      <h1 className="md:text-4xl sm:text-3xl text-2xl font-semibold">Chat</h1>

      <Input
        size="large"
        style={{
          padding: "16px",
          background: "#F8F8F9",
          marginTop: "40px",
        }}
        placeholder="Search people or message"
        prefix={<SearchOutlined style={{ fontSize: "25px", color: "gray" }} />}
      />

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
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
            <div key={item} className="flex-shrink-0">
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
              <p className="text-sm mt-3 font-poppins">Hello world</p>
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

        <div className="md:mt-5">
          <div className="">
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
                
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatList;
