import { Note } from "@/lib/notes";
import Head from "next/head";
import { useEffect, useState } from "react";
import { NoteCard } from "../components/NoteCard";
import NavBar from "../components/NavBar";

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([
    { id: 1, title: "Title 1", content: "content 1" },
    { id: 2, title: "Title 2", content: "content 1" },
    { id: 3, title: "Title 3", content: "content 1" },
    { id: 4, title: "Title 4", content: "content 1" },
    { id: 5, title: "Title 5", content: "content 1" },
    { id: 6, title: "Title 6", content: "content 1" },
    { id: 7, title: "Title 7", content: "content 1" },
    { id: 8, title: "Title 8", content: "content 1" },
    { id: 9, title: "Title 9", content: "content 1" },
    { id: 10, title: "Title 10", content: "content 1" },
  ]);

  /* useEffect(() => {
    fetch("/api/notes")
      .then((response) => response.json())
      .then((res) => setNotes(res.data));
  }, []); */

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main className="w-full h-screen flex flex-col gap-8 justify-start items-center text-gray-900 mt-20">
        <div className="flex flex-col gap-6 w-5/6 lg:w-1/2">
          {notes.map((note) => (
            <NoteCard key={note.id} title={note.title} content={note.content} />
          ))}
        </div>
      </main>
      <footer className="fixed bottom-0 w-full h-6 flex flex-row justify-center items-center bg-black/5 p-4 ">
        footer
      </footer>
    </>
  );
}
