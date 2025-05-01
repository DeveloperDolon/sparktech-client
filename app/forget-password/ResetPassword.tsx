"use client";

import resetPasswordImage from "@/public/reset_password.png";
import Image from "next/image";
import { LeftOutlined, LockFilled } from "@ant-design/icons";
import { Button, Input } from "antd";
import { Controller, useForm } from "react-hook-form";

const ResetPassword = () => {
  const { control, handleSubmit } = useForm();
  return (
    <div className="max-w-5xl mx-auto grid md:grid-cols-2 grid-cols-1 md:gap-10 gap-7 items-center h-screen">
      <div>
        <Image
          src={resetPasswordImage}
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
            Update Password
          </h1>
        </div>
        <p className="md:text-base text-sm md:mt-3 mt-2">
          We&apos;ll send to verification code to your email. Check your inbox
          and enter the code here.
        </p>

        <form className="md:mt-10 mt-6 md:space-y-8 space-y-5">
          <div>
            <label
              className="md:text-base text-sm font-semibold pb-2 inline-block"
              htmlFor="new_password"
            >
              New Password
            </label>
            <Controller
              name="new_password"
              control={control}
              render={({ field }) => (
                <Input.Password
                  color="#6D42D8"
                  size="large"
                  {...field}
                  placeholder="Enter new Password"
                  prefix={<LockFilled style={{ color: "#6D42D8" }} />}
                />
              )}
            />
          </div>

          <div>
            <label
              className="md:text-base text-sm font-semibold pb-2 inline-block"
              htmlFor="confirm_password"
            >
              Confirm Password
            </label>
            <Controller
              name="new_password"
              control={control}
              render={({ field }) => (
                <Input.Password
                  color="#6D42D8"
                  size="large"
                  {...field}
                  placeholder="Enter confirm Password"
                  prefix={<LockFilled style={{ color: "#6D42D8" }} />}
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
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
