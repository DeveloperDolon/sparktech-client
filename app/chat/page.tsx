"use client";

import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import ChatList from "./ChatList";
import ChatBox from "./ChatBox";
import MediaBox from "./MediaBox";

const page = () => {
  return (
    <Layout className="bg-red-400">
      <div id="chat_list" className="2xl:hidden block relative 2xl:w-auto w-full">
        <ChatList />
      </div>

      <Sider theme="light" width="25%" className="hidden 2xl:block">
        <ChatList />
      </Sider>

      <Content id="chat_box" className="2xl:block hidden">
        <ChatBox />
      </Content>

      <Sider theme="light" width="20%" className="hidden 2xl:block">
        <MediaBox height="100vh" />
      </Sider>
    </Layout>
  );
};

export default page;
