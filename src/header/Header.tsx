import { Avatar } from "../components/Avatar";
import { Hyperlink } from "../components/Hyperlink";
import useSupabaseUser from "../hooks/useSupabaseUser";

export const Header: React.FC = () => {
  const user = useSupabaseUser();

  return (
    <header className="flex justify-between items-center gap-12 h-[5rem] px-8 border-b-zinc-700 border-b-4 whitespace-nowrap">
      <h1 className="font-extrabold size-xl">RVA Games</h1>
      <div className="flex-1 flex justify-center items-center gap-6">
        <Hyperlink href="/" text="Home" />
        <Hyperlink href="/games" text="Browse Games" />
        <Hyperlink href="/forum" text="Forums" />
      </div>
      <div className="flex justify-evenly items-center">
        {user.value && (
          <div className="flex justify-end flex-row flex-wrap w-full gap-4 items-center">
            <p>Logged in as</p>
            <Hyperlink href="/my-profile" text={() => user.value?.user_metadata.username} />
            <Avatar avatarUrl={() => user.value?.user_metadata.avatar_url} />
          </div>
        )}
        {!user.value && (
          <div className="flex gap-6">
            <Hyperlink href="/login" text="Login" />
            <Hyperlink href="/register" text="Register" />
          </div>
        )}
      </div>
    </header>
  );
};
