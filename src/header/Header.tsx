import { useEffect, useState } from "react";
import { Hyperlink } from "../components/Hyperlink";
import supabase from "../utils/supabase";
import { User } from "@supabase/supabase-js";

export const Header: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const user = await supabase.auth.getUser();
      if (user.error) {
        console.error(user.error.message);
        return;
      } else {
        setUser(user.data.user);
      }
    })();
  }, []);

  return (
    <header className="flex justify-between items-center gap-12 h-[5rem] px-8 border-b-zinc-700 border-b-4 whitespace-nowrap">
      <h1 className="font-extrabold size-xl">RVA Games</h1>
      <div className="flex-1 flex justify-center items-center gap-6">
        <Hyperlink href="/" text="Home" />
        <Hyperlink href="/games" text="Browse Games" />
        <Hyperlink href="/forum" text="Forums" />
      </div>
      <div className="flex justify-evenly items-center">
        {user && (
          <div className="flex justify-end flex-row flex-wrap w-full">
            <p className="mx-2">Logged in as</p>
            <Hyperlink href="/my-profile" text={user.user_metadata.username} />
          </div>
        )}
        {!user && (
          <>
            <Hyperlink href="/login" text="Login" />
            <Hyperlink href="/register" text="Register" />
          </>
        )}
      </div>
    </header>
  );
};
