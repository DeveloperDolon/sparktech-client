"use client";

import { Button, Checkbox, Input, message } from "antd";
import { Controller, useForm } from "react-hook-form";
import { GoogleOutlined, LockFilled, MailFilled } from "@ant-design/icons";
import Link from "next/link";
import { TLoginUser } from "../types";
import { useLoginMutation } from "../store/api/auth.api";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const { control, handleSubmit, reset } = useForm<TLoginUser>();
  const router = useRouter();
  const [login] = useLoginMutation();
  const [messageApi, contextHolder] = message.useMessage();

  const onSubmit = async (data: TLoginUser) => {
    try {
      const key = "signup";
      messageApi.open({
        key,
        type: "loading",
        content: "Logging user...",
      });
      const result = await login(data);

      if (result?.data) {
        messageApi.open({
          key,
          type: "success",
          content: "Logged in successful!",
        });
        reset();
        router.push("/chat");
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
          Login
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
        <p className="md:text-base text-sm font-light text-center">
          Or <Link href={"/signup"} className="font-semibold">register</Link> an account.
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
