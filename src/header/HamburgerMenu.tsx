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
      className={`${isOpen ? "-translate-x-full" : "translate-x-0"} bg-zinc-900 border-violet-500 border-4 rounded-sm fixed top-0 left-full h-screen w-4/5 z-10 transition-transform duration-300 ease-in-out flex flex-col gap-2 justify-evenly items-center text-xl`}
    >
      <Hyperlink href="/" onClick={onLinkClick}>Home</Hyperlink>
      <Hyperlink href="/games" onClick={onLinkClick}>Browse Games</Hyperlink>
      <Hyperlink href="/forum" onClick={onLinkClick}>Forums</Hyperlink>
      <div className="flex gap-18">
        {user.value && (
          <Hyperlink href="/my-profile" className="flex flex-col gap-4 justify-center items-center" onClick={onLinkClick}>
            <Avatar avatarUrl={() => user.value?.user_metadata.avatar_url} />
            View Profile
          </Hyperlink>
        )}
        {!user.value && (
          <>
            <Hyperlink href="/login" onClick={onLinkClick}>Login</Hyperlink>
            <Hyperlink href="/register" onClick={onLinkClick}>Register</Hyperlink>
          </>
        )}
      </div>
    </div>
  );
};
