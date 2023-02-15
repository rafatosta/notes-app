import type { NextApiRequest, NextApiResponse } from "next";
import { getNotes, createNote, deleteNote } from "../../../lib/notes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { pid } = req.query;

  const { method } = req;

  if (method === "DELETE") {
    try {
      const delEntry = await deleteNote(Number(pid));
      return res.status(200).json({ success: true, data: delEntry });
    } catch (error) {
      console.error("Request error", error);
      res.status(500).json({ error: "Error deleting note", success: false });
    }
  }

  return res.status(404).json({ message: "Route not found." });
}
