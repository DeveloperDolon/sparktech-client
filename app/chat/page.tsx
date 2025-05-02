"use client";

import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import ChatList from "./ChatList";
import ChatBox from "./ChatBox";

const page = () => {
  return (
    <Layout>
      <Sider theme="light" width="25%">
        <ChatList />
      </Sider>

      <Content>
        <ChatBox />
      </Content>

      <Sider theme="light" width="20%">Sider</Sider>
    </Layout>
  );
};

export default page;
