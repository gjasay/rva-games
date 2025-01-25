import { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

interface RegisterProps {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export const Register: React.FC = () => {
  const [accountInfo, setAccountInfo] = useState<RegisterProps>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setAccountInfo({ ...accountInfo, [name]: value });
    console.log(accountInfo);
  };

  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="flex flex-col justify-center items-center h-2/3 w-1/4 bg-zinc-800 border-violet-300 border-2">
        <h1 className="font-bold py-4">Register an RVA Games account:</h1>
        <form className="flex flex-col items-center justify-evenly h-3/4">
          <div className="">
            <Input
              label="Email"
              name="email"
              type="text"
              placeholder="Email"
              value={accountInfo.email || ""}
              onChange={handleFormChange}
            />
            <Input
              label="Username"
              name="username"
              type="text"
              placeholder="Username"
              value={accountInfo.username || ""}
              onChange={handleFormChange}
            />
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Password"
              value={accountInfo.password || ""}
              onChange={handleFormChange}
            />
            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={accountInfo.confirmPassword || ""}
              onChange={handleFormChange}
            />
          </div>
          <Button text="Register" type="submit" className="" />
        </form>
      </div>
    </div>
  );
};
