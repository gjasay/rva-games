import { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import supabase from "../utils/supabase";
import { Hyperlink } from "../components/Hyperlink";
import { Card } from "../components/Card";

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
          data: {
            username: accountInfo.username,
            avatar_url:
              "https://aopplcfhmbnprixvhihr.supabase.co/storage/v1/object/public/avatars/default.jpg", // Default avatar
          },
        },
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
      {!success && (
          <Card title="Create and RVA Games account">
          <form
            className="flex flex-col items-center justify-evenly"
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
            <Button type="submit" className="m-4">
              Create Account
            </Button>
          </form>
          <div className="flex justify-evenly">
            <h2>Already signed up? </h2>
            <Hyperlink href="/login" text="Login" />
          </div>
        </Card>
      )}
    </div>
  );
};
