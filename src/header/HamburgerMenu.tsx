import { Avatar } from "../components/Avatar";
import { Hyperlink } from "../components/Hyperlink";
import useSupabaseUser from "../hooks/useSupabaseUser";

interface HamburgerMenuProps {
  isOpen: boolean;
  onLinkClick: () => void;
}

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isOpen, onLinkClick }) => {
  const user = useSupabaseUser();

  return (
    <div
      className={`${isOpen ? "-translate-x-full" : "translate-x-0"} bg-zinc-900 border-violet-500 border-4 rounded-sm fixed top-0 left-full h-screen w-4/5 z-10 transition-transform duration-300 ease-in-out flex flex-col gap-2 justify-evenly items-center text-2xl `}
    >
      <Hyperlink href="/" className="border-b-2 border-b-violet-500 py-2" onClick={onLinkClick}>Home</Hyperlink>
      <Hyperlink href="/games" className="border-b-2 border-b-violet-500 py-2" onClick={onLinkClick}>Browse Games</Hyperlink>
      <Hyperlink href="/forum" className="border-b-2 border-b-violet-500 py-2" onClick={onLinkClick}>Forums</Hyperlink>
      <div className="flex gap-18">
        {user.value && (
          <Hyperlink href="/my-profile" className="flex flex-col gap-4 justify-center items-center border-b-2 border-b-violet-500 py-2" onClick={onLinkClick}>
            <Avatar avatarUrl={() => user.value?.user_metadata.avatar_url} className="w-18 h-18"/>
            View Profile
          </Hyperlink>
        )}
        {!user.value && (
          <>
            <Hyperlink href="/login" className="border-b-2 border-b-violet-500 py-2" onClick={onLinkClick}>Login</Hyperlink>
            <Hyperlink href="/register" className="border-b-2 border-b-violet-500 py-2" onClick={onLinkClick}>Register</Hyperlink>
          </>
        )}
      </div>
    </div>
  );
};
