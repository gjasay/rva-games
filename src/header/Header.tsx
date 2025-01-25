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
    <header className="flex justify-between items-center w-full py-4 border-b-zinc-900 border-b-4">
      <h1 className="px-8 font-extrabold size-xl">RVA Games</h1>
      <div id="links" className="flex justify-evenly items-center h-full w-1/3">
        <Hyperlink href="/" text="Home" />
        <Hyperlink href="/games" text="Browse Games" />
        <Hyperlink href="/forum" text="Forums" />
      </div>
      <div className="flex justify-evenly items-center h-full w-1/8">
        {user && <Hyperlink href="/user-settings" text={user.user_metadata.username} />}
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
