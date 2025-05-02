"use client";

import React from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import logoImage from "@/public/logo.png";
import Image from "next/image";
import "./style.css";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(
    "",
    "1",
    <PieChartOutlined
      style={{
        color: "#6D42D8",
        fontSize: "24px", 
      }}
    />
  ),
  getItem(
    "",
    "2",
    <DesktopOutlined
      style={{
        color: "#6D42D8",
        fontSize: "24px", 
      }}
    />
  ),
  getItem(
    "",
    "9",
    <FileOutlined
      style={{
        color: "#6D42D8",
        fontSize: "24px", 
      }}
    />
  ),
];

const ChatLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        width={"120px"}
        theme="light"
        style={{
          position: "relative",
        }}
      >
        <div
          className="demo-logo-vertical flex justify-center items-center p-5"
          style={{ marginBottom: "16px" }}
        >
          <Image src={logoImage} alt="Logo Image" />
        </div>
        <Menu
          theme="light"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default ChatLayout;
