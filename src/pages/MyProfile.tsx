import supabase from "../utils/supabase";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import useSupabaseUser from "../hooks/useSupabaseUser";

export const MyProfile: React.FC = () => {
  const navigate = useNavigate();
  const user = useSupabaseUser();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center h-full">
      {user.value && (
        <div className="flex flex-col justify-around bg-zinc-900 border-violet-500 border-4 rounded-2xl">
          <h1 className="text-xl font-extrabold py-5 border-b-4 border-violet-500 text-center">
            My Profile
          </h1>
          <div className="flex flex-col items-center justify-center gap-4 p-4">
            <img
              src={user.value.user_metadata.avatar_url}
              alt="avatar"
              className="rounded-full h-24 w-24"
              />
            <p className="text-xl">
              Username: {user.value.user_metadata.username}
            </p>
            <p className="text-xl">Email: {user.value.email}</p>
            <div className="flex justify-between gap-4">
              <Button onClick={() => navigate("/upload-game")}>
                Upload Game
              </Button>
              <Button onClick={handleLogout}>Logout</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
