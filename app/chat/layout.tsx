"use client";

import React from "react";
import {
  MessageOutlined,
  UsergroupAddOutlined,
  VideoCameraOutlined,
  PhoneOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, Spin } from "antd";
import logoImage from "@/public/logo.png";
import Image from "next/image";
import "./style.css";
import { useMeQuery } from "../store/api/auth.api";
import { useRouter } from "next/navigation";

const { Sider } = Layout;

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
    <MessageOutlined
      style={{
        color: "#6D42D8",
        fontSize: "24px",
      }}
    />
  ),
  getItem(
    "",
    "2",
    <UsergroupAddOutlined
      style={{
        color: "#6D42D8",
        fontSize: "24px",
      }}
    />
  ),
  getItem(
    "",
    "9",
    <VideoCameraOutlined
      style={{
        color: "#6D42D8",
        fontSize: "24px",
      }}
    />
  ),
  getItem(
    "",
    "3",
    <PhoneOutlined
      style={{
        color: "#6D42D8",
        fontSize: "24px",
      }}
    />
  ),
  getItem(
    "",
    "4",
    <CalendarOutlined
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
  const { data, isLoading } = useMeQuery(1);
  const route = useRouter();

  if (isLoading) {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider width={"120px"} theme="light" />
        <Layout.Content
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div>
            <span>
              <span>Loading...</span>
              <br />
              <br />
              <Spin size="large" />
            </span>
          </div>
        </Layout.Content>
      </Layout>
    );
  }
  console.log(data)
  if (!data?.data?.id) {
    route.push("/login");
  }

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
            border: "none",
          }}
        />
      </Sider>

      <>{data?.data?.id ? children : null}</>
    </Layout>
  );
};

export default ChatLayout;
