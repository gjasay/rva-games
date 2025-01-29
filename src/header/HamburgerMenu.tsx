import { Hyperlink } from "../components/Hyperlink";

interface HamburgerMenuProps {
  isOpen: boolean;
}

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isOpen }) => {
  return (
    <div
      className={`${isOpen ? "-translate-x-full" : "translate-x-0"} bg-zinc-900 border-violet-500 border-4 rounded-sm fixed top-0 left-full h-screen w-4/5 z-10 transition-transform duration-300 ease-in-out flex flex-col gap-2 justify-evenly items-center text-xl`}
    >
      <Hyperlink href="/">Home</Hyperlink>
      <Hyperlink href="/games">Browse Games</Hyperlink>
      <Hyperlink href="/forum">Forums</Hyperlink>
      <div className="flex gap-18">
        <Hyperlink href="/login">Login</Hyperlink>
        <Hyperlink href="/register">Register</Hyperlink>
      </div>
    </div>
  );
};
