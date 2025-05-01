import ForgetPassword from "./ForgetPassword";
import OtpVerify from "./OtpVerify";
import ResetPassword from "./ResetPassword";


const page = () => {
  return (
   <div>
      <ForgetPassword />
      <OtpVerify />
      <ResetPassword />
   </div>
  );
};

export default page;
