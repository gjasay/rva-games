import { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import { User } from "@supabase/supabase-js";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";

const useSupabaseUser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then((res) => {
      if (res.error) {
        navigate("/login");
      } else {
        setUser(res.data.user);
      }
    });
  }, []);

  return user;
};

export const MyProfile: React.FC = () => {
  const navigate = useNavigate();

  const user = useSupabaseUser();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center h-full">
      {user && (
        <div className="flex flex-col justify-around items-center bg-zinc-900 border-violet-500 border-4 rounded-2xl">
          <h1 className="text-xl font-extrabold py-5 border-b-4 border-violet-500 text-center align-middle">
            My Profile
          </h1>
          <div className="flex flex-col items-center justify-center h-6/8">
            <p className="text-xl">Username: {user.user_metadata.username}</p>
            <p className="text-xl">Email: {user.email}</p>
            <Button onClick={() => navigate("/upload-game")}>
              Upload Game
            </Button>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        </div>
      )}
    </div>
  );
};
