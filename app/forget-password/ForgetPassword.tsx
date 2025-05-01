"use client";

import Image from "next/image";
import forgetPassword from "@/public/forget_password.png";
import { LeftOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { Controller, useForm } from "react-hook-form";
import { MailFilled } from "@ant-design/icons";

const ForgetPassword = () => {
  const { control, handleSubmit } = useForm();
  return (
    <div className="max-w-5xl mx-auto grid md:grid-cols-2 grid-cols-1 md:gap-10 gap-7 items-center h-screen">
      <div>
        <Image
          src={forgetPassword}
          alt="Forget password image"
          className="w-full"
        />
      </div>

      <div className="md:px-0 px-6">
        <div className="flex ">
          <button className="md:text-3xl text-2xl font-semibold px-2 cursor-pointer">
            <LeftOutlined />
          </button>

          <h1 className="md:text-2xl sm:text-xl text-lg font-semibold">
            Forget Password
          </h1>
        </div>
        <p className="md:text-base text-sm md:mt-3 mt-2">
          Enter the email address associated with your account. We&apos;ll send
          you an verification code to your email.
        </p>

        <form className="md:mt-10 mt-6 md:space-y-8 space-y-5">
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
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
