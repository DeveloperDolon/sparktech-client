import { Content } from "antd/es/layout/layout";
import { RightOutlined } from "@ant-design/icons";
import { Button, Image } from "antd";

const MediaBox = () => {
  return (
    <div className="h-[calc(100vh-125px)]">
      <Content
        style={{
          background: "white",
          padding: "30px 20px",
          height: "fit-content",
        }}
      >
        <div className="flex justify-between">
          <div className="flex gap-3.5 items-end">
            <h4 className="text-lg font-semibold">Media</h4>
            <p className="text-sm text-gray-500">38</p>
          </div>
          <Button type="text">
            View All <RightOutlined />
          </Button>
        </div>

        <div className="flex gap-4 mt-5">
          <Image
            src="https://media.istockphoto.com/id/1209793467/photo/crash-tesh-dummy-in-car.jpg?s=612x612&w=0&k=20&c=exV6ExZZ-wIS_lmRicJZf8Xtn8mzDEt4TczkATuqx48="
            alt="media image"
            width={100}
            height={80}
            className="rounded-lg hover:scale-105 transition-transform cursor-pointer object-cover"
          />
          <Image
            src="https://media.istockphoto.com/id/1209793467/photo/crash-tesh-dummy-in-car.jpg?s=612x612&w=0&k=20&c=exV6ExZZ-wIS_lmRicJZf8Xtn8mzDEt4TczkATuqx48="
            alt="media image"
            width={100}
            height={80}
            className="rounded-lg hover:scale-105 transition-transform cursor-pointer object-cover"
          />
          <Image
            src="https://media.istockphoto.com/id/1209793467/photo/crash-tesh-dummy-in-car.jpg?s=612x612&w=0&k=20&c=exV6ExZZ-wIS_lmRicJZf8Xtn8mzDEt4TczkATuqx48="
            alt="media image"
            width={100}
            height={80}
            className="rounded-lg hover:scale-105 transition-transform cursor-pointer object-cover"
          />
        </div>
      </Content>

      <Content
        style={{
          background: "white",
          padding: "30px 20px",
          height: "fit-content",
        }}
      >
        <div className="flex justify-between">
          <div className="flex gap-3.5 items-end">
            <h4 className="text-lg font-semibold">Link</h4>
            <p className="text-sm text-gray-500">38</p>
          </div>
          <Button type="text">
            View All <RightOutlined />
          </Button>
        </div>

        <div>
          <div className="border border-gray-300 rounded-lg mt-5">
            <div className="flex gap-5 p-4">
              <img
                src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
                alt="link image"
                className="h-[50px] w-[50px] rounded-lg hover:scale-105 transition-transform cursor-pointer object-cover"
              />

              <p className="text-sm break-all overflow-hidden">
                https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png
              </p>
            </div>

            <Button
              type="text"
              size="large"
              style={{
                borderTop: "1px solid #D1D5DB", // Tailwind's border-gray-300 hex value
                borderRadius: "0px",
                padding: "4px",
                color: "#6D42D8",
                fontWeight: "600",
              }}
              className="text-base font-semibold w-full p-4 border-t"
            >
              View Messages <RightOutlined color="gray" />
            </Button>
          </div>
          <div className="border border-gray-300 rounded-lg mt-5">
            <div className="flex gap-5 p-4 ">
              <img
                src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
                alt="link image"
                className="h-[50px] w-[50px] rounded-lg hover:scale-105 transition-transform cursor-pointer object-cover"
              />

              <p className="text-sm break-all overflow-hidden">
                https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png
              </p>
            </div>

            <Button
              type="text"
              size="large"
              style={{
                borderTop: "1px solid #D1D5DB", // Tailwind's border-gray-300 hex value
                borderRadius: "0px",
                padding: "4px",
                color: "#6D42D8",
                fontWeight: "600",
              }}
              className="text-base font-semibold w-full p-4 border-t"
            >
              View Messages <RightOutlined color="gray" />
            </Button>
          </div>
        </div>
      </Content>
    </div>
  );
};

export default MediaBox;
