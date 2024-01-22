import db from "../../knex/db";
import { User } from "./user.server";

interface Note {
  id: string;
  userId: User["id"];
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

export async function getNote({
  id,
  userId,
}: Pick<Note, "id"> & {
  userId: User["id"];
}) {
  return db<Note>("Note").where({ id, userId }).first();
}

export async function getNoteListItems({
  userId,
}: {
  userId: User["id"];
}): Promise<Pick<Note, "id" | "title">[]> {
  return db<Note>("Note")
    .where({ userId })
    .select("id", "title")
    .orderBy("updatedAt", "desc");
}

type NoteInput = Pick<Note, "body" | "title"> & { userId: User["id"]; };

export async function createNote(noteInput: NoteInput): Promise<Note> {
  try {
    const { nanoid } = await import("nanoid");
    const { body, title, userId } = noteInput;
    const newNote: Partial<Note> = {
      id: nanoid() as string,
      body,
      title,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const [insertedNote] = await db<Note>("Note").insert(newNote).returning("*");
    if (!insertedNote) {
      throw new Error("Failed to insert note");
    }
    return insertedNote;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export function deleteNote({
  id,
  userId,
}: Pick<Note, "id"> & { userId: User["id"] }) {
  return db<Note>("Note").where({ id, userId }).del();
}
