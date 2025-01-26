import supabase from "../utils/supabase";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import useSupabaseUser from "../hooks/useSupabaseUser";
import { Card } from "../components/Card";
import { useState } from "react";

export const MyProfile: React.FC = () => {
  const [updatePicture, setUpdatePicture] = useState(false);
  const [picture, setPicture] = useState<File | undefined>(undefined);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const user = useSupabaseUser().value;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handlePhotoSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!picture || !user) return;

    const { data: url, error } = await supabase.storage
      .from("avatars")
      .upload(`${user.id}/${picture.name}`, picture);
    if (error) {
      console.error(error);
      setError(error.message);
      return;
    } else {
      setSuccess("Uploading...");
      console.log(url);
    }

    supabase.auth
      .updateUser({
        data: {
          avatar_url: `https://aopplcfhmbnprixvhihr.supabase.co/storage/v1/object/public/${url.fullPath}`,
          username: user.user_metadata.username,
        },
      })
      .then((res) => {
        if (res.error) {
          setError(res.error.message);
        } else {
          setSuccess("Successfully updated picture.");
        }
      });

    setUpdatePicture(false);
  };

  return (
    <div className="flex justify-center items-center h-full">
      {user && (
        <Card title="My Profile">
          <div className="flex flex-col items-center justify-center gap-4 p-4">
            <img
              src={user.user_metadata.avatar_url}
              alt="avatar"
              className="rounded-full h-24 w-24"
            />
            {!updatePicture && (
              <Button onClick={() => setUpdatePicture(!updatePicture)}>
                Change Picture
              </Button>
            )}
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            {updatePicture && (
              <form
                className="flex flex-col justfify-center items-center"
                onSubmit={handlePhotoSubmit}
              >
                <input
                  type="file"
                  onChange={(e) => setPicture(e.target.files?.[0])}
                />
                <Button type="submit">Upload</Button>
              </form>
            )}
            <p className="text-xl">Username: {user.user_metadata.username}</p>
            <p className="text-xl">Email: {user.email}</p>
            <div className="flex justify-between gap-4">
              <Button onClick={() => navigate("/upload-game")}>
                Upload Game
              </Button>
              <Button onClick={handleLogout}>Logout</Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
