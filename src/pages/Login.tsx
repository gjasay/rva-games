import { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import supabase from "../utils/supabase";
import { Hyperlink } from "../components/Hyperlink";
import { Card } from "../components/Card";

interface LoginProps {
  email: string;
  password: string;
}

export const Login: React.FC = () => {
  const [error, setError] = useState("");
  const [accountInfo, setAccountInfo] = useState<LoginProps>({
    email: "",
    password: "",
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setAccountInfo({ ...accountInfo, [name]: value });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const user = await supabase.auth.signInWithPassword({
        email: accountInfo.email,
        password: accountInfo.password,
      });
      if (user.error) {
        setError(user.error.message);
        return;
      }
      window.location.href = "/";
      console.log(user.data.user?.user_metadata.username);
    } catch (e: any) {
      console.error(e.error_description || e.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-full w-full">
      <Card title="Login">
        <form
          className="flex flex-col items-center justify-center"
          onSubmit={handleFormSubmit}
        >
          {error && <p className="text-red-500">{error}</p>}
          <div>
            <Input
              label="Email"
              name="email"
              type="text"
              placeholder="example@example.com"
              required={true}
              value={accountInfo.email || ""}
              onChange={handleFormChange}
            />
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Password"
              required={true}
              value={accountInfo.password || ""}
              onChange={handleFormChange}
            />
          </div>
          <Button type="submit" className="my-6 px-6">Login</Button>
        </form>
        <div className="flex justify-evenly">
          <h2>New here? </h2>
          <Hyperlink href="/register" text="Create account" />
        </div>
      </Card>
    </div>
  );
};
