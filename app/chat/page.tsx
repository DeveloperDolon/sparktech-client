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
      <Sider theme="light" width="25%">
        <ChatList />
      </Sider>

      <Content>
        <ChatBox />
      </Content>

      <Sider theme="light" width="20%" className="hidden 2xl:block">
        <MediaBox />
      </Sider>
    </Layout>
  );
};

export default page;
