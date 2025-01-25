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
    <header className="flex justify-between items-center py-4 px-8 border-b-zinc-700 border-b-4">
      <div className="flex gap-[5rem]">
        <h1 className="font-extrabold size-xl">RVA Games</h1>
        <div className="flex justify-evenly items-center gap-8">
          <Hyperlink href="/" text="Home" />
          <Hyperlink href="/games" text="Browse Games" />
          <Hyperlink href="/forum" text="Forums" />
        </div>
      </div>
      <div className="flex justify-evenly items-center">
        {user && (
          <div className="flex flex-row justify-between w-full">
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
