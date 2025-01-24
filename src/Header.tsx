import { Hyperlink } from "./Hyperlink";

export const Header: React.FC = () => {
  return (
    <header className="flex justify-evenly items-center w-full border-2">
      <h1>RVA Games</h1>
      <Hyperlink href="https://www.google.com" text="Google" />
    </header>
  );
};
