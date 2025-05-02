"use client";

import { Button, Checkbox, Input } from "antd";
import { Controller, useForm } from "react-hook-form";
import {
  GoogleOutlined,
  LockFilled,
  MailFilled,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";

export interface TUser {
    name: string;
    email: string;
    password: string;
}

const SignupForm = () => {
  const { control, handleSubmit } = useForm<TUser>();
  
  const onSubmit = (data: TUser) => {
    console.log(data);
  };
  return (
    <div className="mt-8">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            className="md:text-base text-sm font-semibold pb-2 inline-block"
            htmlFor="name"
          >
            Name
          </label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                color="#6D42D8"
                size="large"
                placeholder="Enter name"
                required
                {...field}
                prefix={
                  <UserOutlined style={{ color: "#6D42D8" }} color="#6D42D8" />
                }
              />
            )}
          />
        </div>

        <div>
          <label
            className="md:text-base text-sm font-semibold pb-2 inline-block"
            htmlFor="email"
          >
            Email
          </label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                color="#6D42D8"
                size="large"
                placeholder="Enter email"
                {...field}
                required
                prefix={
                  <MailFilled style={{ color: "#6D42D8" }} color="#6D42D8" />
                }
              />
            )}
          />
        </div>

        <div>
          <label
            className="md:text-base text-sm font-semibold pb-2 inline-block"
            htmlFor="password"
          >
            Password
          </label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input.Password
                color="#6D42D8"
                size="large"
                placeholder="Enter password"
                required
                {...field}
                prefix={<LockFilled style={{ color: "#6D42D8" }} />}
              />
            )}
          />
        </div>

        <div className="flex justify-between items-center">
          <Checkbox>Remember me</Checkbox>

          <Link href={"/forget-password"}>Forget password ?</Link>
        </div>

        <Button
          htmlType="submit"
          variant="filled"
          size="large"
          style={{
            background: "#6D42D8",
            color: "white",
            fontWeight: "bold",
            borderRadius: "100px",
          }}
          className="w-full"
        >
          Signup
        </Button>
        <p className="md:text-base text-sm font-light text-center">
          Or Sign in With
        </p>
        <Button
          size="large"
          style={{
            color: "#6D42D8",
            fontWeight: "bold",
            borderRadius: "100px",
          }}
          className="w-full"
          icon={<GoogleOutlined />}
        >
          Google
        </Button>
      </form>
    </div>
  );
};

export default SignupForm;
