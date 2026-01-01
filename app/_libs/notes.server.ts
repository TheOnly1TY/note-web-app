// import { revalidatePath } from "next/cache";
import { createSupabaseServer } from "./supabase-server";
import type { NoteItem, CreateNotePayload, UpdateNotePayload } from "./types";
import { redirect } from "next/navigation";

async function getCurrentUser() {
  const supabase = createSupabaseServer();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    throw new Error("Unauthorized");
  }

  return data.user;
}

export async function getAllNotes(tag?: string): Promise<NoteItem[]> {
  const supabase = createSupabaseServer();
  const user = await getCurrentUser();

  let query = supabase
    .from("notes")
    .select("id,title,tags,lastEdited")
    .eq("user_id", user.id)
    .eq("isArchived", false)
    .order("lastEdited", { ascending: false })
    .limit(10);

  if (tag?.trim()) {
    query = query.contains("tags", [tag]);
  }

  const { data, error } = await query;
  if (error) throw error;

  return data ?? [];
}

export async function getNoteById(id: string): Promise<NoteItem> {
  const supabase = createSupabaseServer();
  const user = await getCurrentUser();

  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error || !data) throw new Error("Note not found");
  return data;
}

export async function getArchivedNotes(): Promise<NoteItem[]> {
  const supabase = createSupabaseServer();
  const user = await getCurrentUser();

  const { data, error } = await supabase
    .from("notes")
    .select("id,title,tags,lastEdited")
    .eq("user_id", user.id)
    .eq("isArchived", true)
    .order("lastEdited", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function createNote(note: CreateNotePayload): Promise<NoteItem[]> {
  const supabase = createSupabaseServer();
  const user = await getCurrentUser();

  const { data, error } = await supabase
    .from("notes")
    .insert([{ ...note, user_id: user.id }])
    .select();

  if (error) throw error;
  return data;
}

export async function updateNote(note: UpdateNotePayload): Promise<NoteItem[]> {
  const supabase = createSupabaseServer();
  const user = await getCurrentUser();

  const { data, error } = await supabase
    .from("notes")
    .update({ ...note, lastEdited: new Date().toISOString() })
    .eq("id", note.id)
    .eq("user_id", user.id)
    .select();

  if (error) throw error;
  return data;
}

export async function deleteNote(id: string | undefined): Promise<NoteItem[]> {
  const supabase = createSupabaseServer();
  const user = await getCurrentUser();

  const { error } = await supabase
    .from("notes")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id)
    .select();

  if (error) throw error;
  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function updateArchived(
  method: "archive" | "restore",
  id: string
): Promise<NoteItem[]> {
  const supabase = createSupabaseServer();
  const user = await getCurrentUser();

  const { data, error } = await supabase
    .from("notes")
    .update({ isArchived: method === "archive" })
    .eq("id", id)
    .eq("user_id", user.id)
    .select();

  if (error) throw error;
  return data;
}
