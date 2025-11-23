import axios from 'axios';
import type { Note } from '../types/note.ts';

interface NotesProps {
  notes: Note[];
  totalPages: number;
}

axios.defaults.baseURL = 'https://notehub-public.goit.study/api/notes';
const NOTEHUB_TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

async function getNotes(): Promise<NotesProps> {
  const { data } = await axios.get<NotesProps>('', {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${NOTEHUB_TOKEN}`,
    },
  });
  console.log('notes', data);

  return data;
}
export default getNotes;
