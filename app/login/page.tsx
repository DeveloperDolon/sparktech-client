import Image from "next/image";
import LoginForm from "./LoginForm";
import loginImage from "@/public/login.png";

const page = () => {
  return (
    <div className="max-w-5xl mx-auto grid md:grid-cols-2 grid-cols-1 items-center h-screen">
      <div><Image src={loginImage} alt="Login image" className="w-full" /></div>

      <div className="md:px-0 px-6">
        <h1 className="md:text-2xl sm:text-xl text-lg font-semibold">Hello, Welcome</h1>
        <p className="md:text-base text-sm md:mt-5 mt-3.5">Please Enter Your Details Bellow to Continue.</p>
        <LoginForm />
      </div>
    </div>
  );
};

export default page;
