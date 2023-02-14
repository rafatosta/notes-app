import { PrismaClient } from "@prisma/client";

export type Note = {
  id?: number;
  title: string;
  content: string;
};

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
