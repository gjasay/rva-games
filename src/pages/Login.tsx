import { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import supabase from "../utils/supabase";
import { Hyperlink } from "../components/Hyperlink";

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
      <div className="flex flex-col justify-around items-center h-3/4 w-1/3 bg-zinc-900 border-violet-500 border-4 rounded-2xl">
        <h1 className="text-xl font-extrabold py-5 -my-5 border-b-4 border-violet-500 w-full text-center align-middle">
          Login
        </h1>
        <form
          className="flex flex-col items-center justify-center h-6/8"
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
          <Button text="Login" type="submit" className="my-6 px-6" />
        </form>
        <div className="flex w-2/3 justify-evenly">
          <h2>New here? </h2>
          <Hyperlink href="/register" text="Create account" />
        </div>
      </div>
      )
    </div>
  );
};
