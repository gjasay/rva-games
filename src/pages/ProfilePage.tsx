import { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import { User } from "@supabase/supabase-js";

export const ProfilePage: React.FC<{ id: string }> = ({ id }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {}, [id]);

  return (
    <div>
      {error && <p>{error}</p>}
      {user && (
        <div>
          <h1>{user.user_metadata.username}</h1>
          <p>{user.email}</p>
        </div>
      )}
    </div>
  );
};
