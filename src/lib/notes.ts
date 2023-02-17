import { PrismaClient } from "@prisma/client";

export interface Note {
  id?: number;
  title: string;
  content: string;
}

const prisma = new PrismaClient();

export async function getNotes() {
  const notes = await prisma.note.findMany({
    orderBy: [
      {
        id: "desc",
      },
    ],
  });

  return notes;
}

export async function createNote(data: Note) {
  const newEntry = await prisma.note.create({
    data: {
      title: data.title,
      content: data.content,
    },
  });

  return newEntry;
}

export async function updateNote(data: Note) {
  const updateNote = await prisma.note.update({
    where: {
      id: data.id,
    },
    data: {
      title: data.title,
      content: data.content,
    },
  });

  return updateNote;
}

export async function deleteNote(id: number) {
  const delNote = await prisma.note.delete({
    where: {
      id: id,
    },
  });
  return delNote;
}
