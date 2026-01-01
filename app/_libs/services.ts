import { supabase } from "./supabase-client";

export interface NoteItem {
  id: string;
  title: string;
  tags: string[];
  lastEdited: string;
  content?: string;
  user_id?: string;
}

interface CreateNotePayload {
  title: string;
  content: string;
  tags: string[];
}

interface UpdateNotePayload {
  id: string;
  title?: string;
  content?: string;
  tags?: string[];
}

interface UserSettings {
  id: string;
  user_id: string;
  theme: string;
  font: string;
  created_at: string;
  updated_at: string;
}

// GET USER SERVICES
async function getCurrentUser() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session) {
    throw new Error("No active user session. Please log in.");
  }

  return session.user;
}

// NOTES SERVICES
async function getAllNotes(tag?: string): Promise<NoteItem[]> {
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

  const { data: notes, error } = await query;
  if (error) throw new Error(error.message);

  return notes ?? [];
}

async function getNoteById(id: string): Promise<NoteItem> {
  const user = await getCurrentUser();

  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error || !data) {
    throw new Error("Note not found");
  }

  return data;
}

async function getArchivedNotes(): Promise<NoteItem[]> {
  const user = await getCurrentUser();

  const { data: notes, error } = await supabase
    .from("notes")
    .select("id,title,tags,lastEdited")
    .eq("user_id", user.id)
    .eq("isArchived", true)
    .order("lastEdited", { ascending: false });

  if (error) throw new Error("Failed to Fetch Notes");
  return notes ?? [];
}

async function createNote(note: CreateNotePayload): Promise<NoteItem[]> {
  const user = await getCurrentUser();

  const payload = {
    title: note.title,
    content: note.content,
    tags: note.tags,
    user_id: user.id,
  };

  const { data, error } = await supabase
    .from("notes")
    .insert([payload])
    .select();

  if (error) throw new Error(error.message);

  return data;
}

async function updateNote(note: UpdateNotePayload): Promise<NoteItem[]> {
  const user = await getCurrentUser();

  const { data, error } = await supabase
    .from("notes")
    .update({ ...note, lastEdited: new Date().toISOString() })
    .eq("id", note.id)
    .eq("user_id", user.id)
    .select();

  if (error) throw new Error(error.message);

  return data;
}

async function deleteNote(id: string): Promise<NoteItem[]> {
  const user = await getCurrentUser();

  const { data, error } = await supabase
    .from("notes")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id)
    .select();

  if (error) throw new Error(error.message);

  return data;
}

async function getTags(): Promise<{ tags: string[] }[]> {
  const user = await getCurrentUser();

  const { data: notes, error } = await supabase
    .from("notes")
    .select("tags")
    .eq("user_id", user.id);

  if (error) throw error;

  return notes;
}

async function updateArchived(
  method: "archive" | "restore",
  id: string
): Promise<NoteItem[]> {
  const user = await getCurrentUser();
  const isArchived = method === "archive";

  const { data, error } = await supabase
    .from("notes")
    .update({ isArchived })
    .eq("id", id)
    .eq("user_id", user.id)
    .select();

  if (error) throw new Error(error.message);

  return data;
}

// USER SETTINGS SERVICES

async function getUserSettings(): Promise<UserSettings[]> {
  const user = await getCurrentUser();

  const { data: settings, error } = await supabase
    .from("settings")
    .select("*")
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  return settings;
}

async function updateTheme(theme: string): Promise<UserSettings[]> {
  const user = await getCurrentUser();

  const { data, error } = await supabase
    .from("settings")
    .update({ theme, updated_at: new Date().toISOString() })
    .eq("user_id", user.id)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

async function updateFont(font: string): Promise<UserSettings[]> {
  const user = await getCurrentUser();

  const { data, error } = await supabase
    .from("settings")
    .update({ font, updated_at: new Date().toISOString() })
    .eq("user_id", user.id)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// AUTHENTICATION SERVICES

async function signUpUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) throw new Error(error.message);

  return data;
}

async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);

  return data;
}

async function signWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${window.location.origin}/dashboard`,
    },
  });

  if (error) throw error;

  return data;
}

async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) throw error;
}

export {
  getAllNotes,
  getArchivedNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
  getTags,
  updateArchived,
  signUpUser,
  loginUser,
  signWithGoogle,
  getUserSettings,
  updateTheme,
  updateFont,
  signOut,
};
