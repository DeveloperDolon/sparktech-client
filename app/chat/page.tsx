"use client";

import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import ChatList from "./ChatList";

const page = () => {
  return (
    <Layout>
      <Sider theme="light" width="25%">
        <ChatList />
      </Sider>

      <Content>Content</Content>

      <Sider theme="light" width="20%">Sider</Sider>
    </Layout>
  );
};

export default page;
