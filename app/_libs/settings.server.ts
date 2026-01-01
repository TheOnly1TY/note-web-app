import { createSupabaseServer } from "./supabase-server";
import type { UserSettings } from "./types";

async function getCurrentUser() {
  const supabase = createSupabaseServer();
  const { data } = await supabase.auth.getUser();

  if (!data.user) throw new Error("Unauthorized");
  return data.user;
}

export async function getUserSettings(): Promise<UserSettings[]> {
  const supabase = createSupabaseServer();
  const user = await getCurrentUser();
  const { data, error } = await supabase
    .from("settings")
    .select("*")
    .eq("user_id", user.id);

  if (error) throw error;
  return data ?? [];
}

export async function updateTheme(theme: string): Promise<UserSettings[]> {
  const supabase = createSupabaseServer();
  const user = await getCurrentUser();

  const { data, error } = await supabase
    .from("settings")
    .update({ theme, updated_at: new Date().toISOString() })
    .eq("user_id", user.id)
    .select();

  if (error) throw error;
  return data;
}

export async function updateFont(font: string): Promise<UserSettings[]> {
  const supabase = createSupabaseServer();
  const user = await getCurrentUser();

  const { data, error } = await supabase
    .from("settings")
    .update({ font, updated_at: new Date().toISOString() })
    .eq("user_id", user.id)
    .select();

  if (error) throw error;
  return data;
}
