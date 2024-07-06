import { supabase } from "./supabaseClient";

export type loginType = {
  email: string;
  password: string;
};
export async function login({
  email,
  password,
}: loginType): Promise<{ success: boolean; message: string }> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.log(error);
    return { success: false, message: error.message };
  } else {
    console.log(data);
    return { success: true, message: "Login Successful ! :)" };
  }
}

export async function logOff() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
  }
}
