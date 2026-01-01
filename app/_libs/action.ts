"use server";

import {
  createNote,
  getUserSettings,
  updateArchived,
  updateFont,
  updateNote,
  updateTheme,
} from "./services";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function actionCreateNote(note) {
  let data;
  if (!note.id) {
    data = await createNote(note);
  } else {
    data = await updateNote(note);
  }

  revalidatePath("/dashboard");
  return data;
}

export async function updateArhivedNote(id) {
  const note = await updateArchived("archive", id);

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function restoreNote(id) {
  const note = await updateArchived("restore", id);

  revalidatePath("/dashboard/archived");
  redirect("/dashboard/archived");
}

export async function updateUserTheme(theme: string) {
  const settings = await getUserSettings();

  if (settings && settings.length > 0 && settings[0].theme === theme) {
    return settings[0];
  }

  const updatedTheme = await updateTheme(theme);

  revalidatePath("/dashboard");
  return updatedTheme;
}


export async function updateFontTheme(Font: string) {
  const settings = await getUserSettings();

  if (settings && settings.length > 0 && settings[0].Font === Font) {
    return settings[0];
  }

  const updatedFont = await updateFont(Font);

  revalidatePath("/dashboard");
  return updatedFont;
}
