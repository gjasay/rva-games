import { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import supabase from "../utils/supabase";
import { Hyperlink } from "../components/Hyperlink";

interface RegisterProps {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export const Register: React.FC = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [accountInfo, setAccountInfo] = useState<RegisterProps>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setAccountInfo({ ...accountInfo, [name]: value });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Error handling
    if (!validateEmail(accountInfo.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(accountInfo.password)) {
      setError(
        "Password must be at least 8 characters long and contain at least one number, one lowercase letter, and one uppercase letter.",
      );
      return;
    }

    if (accountInfo.password !== accountInfo.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");

    try {
      const user = await supabase.auth.signUp({
        email: accountInfo.email,
        password: accountInfo.password,
        options: {
          data: { username: accountInfo.username },
        }
      });
      setSuccess(true);
      console.log(user.data.user?.user_metadata.username);
    } catch (e: any) {
      setError(e.error_description || e.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-full w-full">
      {success && <h1>Please check your email to verify your account.</h1>}
    {!success && <div className="flex flex-col justify-around items-center h-3/4 w-1/3 bg-zinc-900 border-violet-500 border-4 rounded-2xl">
        <h1 className="text-xl font-extrabold py-5 -my-5 border-b-4 border-violet-500 w-full text-center align-middle">Create an RVA Games account</h1>
        <form
          className="flex flex-col items-center justify-evenly h-6/8"
          onSubmit={handleFormSubmit}
        >
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="">
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
              label="Username"
              name="username"
              type="text"
              placeholder="Username"
              required={true}
              value={accountInfo.username || ""}
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
            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              required={true}
              value={accountInfo.confirmPassword || ""}
              onChange={handleFormChange}
            />
          </div>
          <Button text="Create account" type="submit" className="m-4"/>
        </form>
          <div className="flex w-2/3 justify-evenly">
            <h2>Already signed up? </h2>
            <Hyperlink href="/login" text="Login" />
        </div>
      </div>}
    </div>
  );
};
