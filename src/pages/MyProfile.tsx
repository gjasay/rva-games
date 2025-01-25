import { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import { User } from "@supabase/supabase-js";
import { Button } from "../components/Button";

export const MyProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>();

  useEffect(() => {
    supabase.auth.getUser().then((res) => {
      if (res.error) {
        setError(res.error.message);
        return;
      } else {
        setUser(res.data.user);
      }
    });
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setError(error.message);
    } else {
      window.location.href = "/";
    }
  }

  return (
    <div className="flex justify-center items-center h-full">
      {error && <p>{error}</p>}
      {user && 
        <div className="flex flex-col justify-around items-center h-3/4 w-1/3 bg-zinc-900 border-violet-500 border-4 rounded-2xl">
          <h1 className="text-xl font-extrabold py-5 -my-5 border-b-4 border-violet-500 w-full text-center align-middle">
            My Profile
          </h1>
          <div className="flex flex-col items-center justify-center h-6/8">
            <p className="text-xl">Username: {user.user_metadata.username}</p>
            <p className="text-xl">Email: {user.email}</p>
            <Button text="Upload Game" onClick={() => window.location.href = "/upload-game"} />
            <Button text="Logout" onClick={handleLogout}/>
          </div>
        </div>
      }
    </div>
  );
};
