import supabase from "./supabase";

export interface Profile {
  id: string;
  username: string;
  email: string;
  avatar_url: string;
}

export const fetchProfile = async (userId: string): Promise<Profile | null> => {
  supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single()
    .then(({ data: profile, error }) => {
      if (error) {
        console.error(error.message);
      } else {
        console.log(profile);
        return profile as Profile;
      }
    });

  return null;
};
