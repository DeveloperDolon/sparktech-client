"use client";

import { Button, Checkbox, Input } from "antd";
import { Controller, useForm } from "react-hook-form";
import { GoogleOutlined, LockFilled, MailFilled } from "@ant-design/icons";
import Link from "next/link";

const LoginForm = () => {
  
const { control, handleSubmit } = useForm();
  return (
    <div className="mt-8">
      <form className="space-y-6">
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
              <Input
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
          icon={<GoogleOutlined/>}
        >
          Google
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
