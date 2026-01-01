export interface NoteItem {
  id: string;
  title: string;
  tags: string[];
  lastEdited: string;
  content?: string;
  user_id?: string;
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tags: string[];
}

export interface UpdateNotePayload {
  id: string;
  title?: string;
  content?: string;
  tags?: string[];
}

export interface UserSettings {
  id: string;
  user_id: string;
  theme: string;
  font: string;
  created_at: string;
  updated_at: string;
}
