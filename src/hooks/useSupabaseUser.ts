import { User } from "@supabase/supabase-js";
import { signal, useSignalEffect } from "@preact/signals-react";
import { useNavigate } from "react-router-dom";
import supabase from "../utils/supabase";

const user = signal<User | null>(null);

const useSupabaseUser = () => {
  const navigate = useNavigate();

  useSignalEffect(() => {
    if (user.value) return;

    supabase.auth.getUser().then((res) => {
      if (res.error) {
        navigate("/login");
      } else {
        user.value = res.data.user;
      }
    });
  });

  return user;
};

export default useSupabaseUser;
