import { Note } from "@/lib/notes";
import Head from "next/head";
import { useState } from "react";
import { NoteCard } from "../components/NoteCard";
import NavBar from "../components/NavBar";
import { useQuery } from "react-query";
import { api } from "@/services/api";

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);

  const { isFetching } = useQuery(
    "notes",
    async () => {
      const response = await api.get("api/notes");
      setNotes(response.data.notes);
    },
    {
      refetchOnWindowFocus: true,
      staleTime: 0,
      cacheTime: 0,
      refetchInterval: 60 * 1000,
    }
  );

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main className="w-full  flex flex-col gap-8 justify-start items-center text-gray-900 mt-20 mb-10">
        {isFetching && <p>Carregando notas...</p>}

        {notes.length == 0 && <p>A lista de notas está vazia!</p>}

        <div className="flex flex-col gap-6 w-5/6 lg:w-1/2">
          {notes?.map((note) => (
            <NoteCard key={note.id} data={note} />
          ))}
        </div>
      </main>
      <footer className="bg-[#24292f] text-white text-sm fixed font-semibold bottom-0 w-full h-4 flex flex-row justify-center items-center p-4 ">
        {notes.length} {notes.length > 1 ? "notas" : "nota"} no total
      </footer>
    </>
  );
}
