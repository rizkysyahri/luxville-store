import { FC } from "react";
import { Input } from "./ui/input";

interface SignUpProps {}

const SignUp: FC<SignUpProps> = ({}) => {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
        <h1 className="text-center text-2xl font-normal">Create Account</h1>
      <div>
        <Input type="email" placeholder="email" />
      </div>
    </div>
  );
};

export default SignUp;
