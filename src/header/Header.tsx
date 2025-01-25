import { Hyperlink } from "../components/Hyperlink";

export const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center w-full py-4 border-b-zinc-900 border-b-4">
      <h1 className="px-8 font-extrabold size-xl">RVA Games</h1>
      <div id="links" className="flex justify-evenly items-center h-full w-1/3">
        <Hyperlink href="/" text="Home" />
        <Hyperlink href="/games" text="Browse Games" />
        <Hyperlink href="/forum" text="Forums" />
      </div>
      <div className="flex justify-evenly items-center h-full w-1/10">
        <Hyperlink href="/sign-in" text="Sign in" />
        <Hyperlink href="/register" text="Register" />
      </div>
    </header>
  );
};
