import type { NextApiRequest, NextApiResponse } from "next";
import { getNotes, createNote, updateNote } from "../../../lib/notes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method === "GET") {
    const notes = await getNotes();
    return res.status(200).json({
      notes,
    });
  } else if (method === "POST") {
    const body = req.body;

    try {
      const newEntry = await createNote(body);
      return res.status(200).json({ success: true, data: newEntry });
    } catch (error) {
      console.error("Request error", error);
      return res
        .status(500)
        .json({ error: "Error creating note", success: false });
    }
  } else if (method === "PUT") {
    const body = req.body;
    try {
      const updateEntry = await updateNote(body);
      return res.status(200).json({ success: true, data: updateEntry });
    } catch (error) {
      console.error("Request error", error);
      return res
        .status(500)
        .json({ error: "Error update note", success: false });
    }
  }

  return res.status(404).json({ message: "Route not found." });
}
