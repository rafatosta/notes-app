import { PrismaClient } from "@prisma/client";

type Note = {
  id: number;
  title: string;
  content: string;
};

const prisma = new PrismaClient();

export async function getNotes() {
  const notes = await prisma.note.findMany();

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
