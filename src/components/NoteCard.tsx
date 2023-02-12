import { Note } from "../lib/notes";

export function NoteCard(props: Note) {
  return (
    <div>
      <p>{props.title}</p>
      <p>{props.content}</p>
    </div>
  );
}
