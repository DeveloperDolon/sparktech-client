"use client";

import { Button, Checkbox, Input, message } from "antd";
import { Controller, useForm } from "react-hook-form";
import {
  GoogleOutlined,
  LockFilled,
  MailFilled,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useSignupMutation } from "../store/api/auth.api";
import { useRouter } from "next/navigation";

export interface TUser {
  name: string;
  email: string;
  password: string;
}

const SignupForm = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { control, handleSubmit, reset } = useForm<TUser>();
  const [signup] = useSignupMutation();
  const router = useRouter();
  const onSubmit = async (data: TUser) => {
    try {
      const key = "signup";
      messageApi.open({
        key,
        type: "loading",
        content: "User data registering...",
      });
      const formattedData = {
        password: data?.password,
        user: {
          email: data?.email,
          name: data?.name,
        },
      };

      const result = await signup(formattedData);
      console.log(result);

      if (result?.data) {
        messageApi.open({
          key,
          type: "success",
          content: "Register complete!",
        });
        reset();
        router.push("/login");
      } else if (result?.error && "data" in result.error) {
        const errorData = result.error.data as { message: string };
        messageApi.open({ key, type: "error", content: errorData.message });
      } else {
        messageApi.open({
          key,
          type: "error",
          content: "An unexpected error occurred.",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="mt-8">
      {contextHolder}
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
