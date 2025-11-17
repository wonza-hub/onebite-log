import supabase from "@/lib/supabase";
import { getRandomNickname } from "@/lib/utils";

/**
 * READ: 프로필
 * @param userId
 */
export async function fetchProfile(userId: string) {
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw error;

  return data;
}

/**
 * CREATE: 프로필
 * @param userId
 */
export async function createProfile(userId: string) {
  const { data, error } = await supabase
    .from("profile")
    .insert({
      id: userId,
      nickname: getRandomNickname(),
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}
