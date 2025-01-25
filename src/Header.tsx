import { Hyperlink } from "./components/Hyperlink";

export const Header: React.FC = () => {
  return (
    <header className="flex justify-evenly items-center w-full border-2">
      <h1>RVA Games</h1>
      <Hyperlink href="/signup" text="Sign up" />
    </header>
  );
};
