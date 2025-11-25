import axios from 'axios';
import type { Note } from '../types/note.ts';

export interface NotesProps {
  notes: Note[];
  totalPages: number;
}

axios.defaults.baseURL = 'https://notehub-public.goit.study/api/notes';
const NOTEHUB_TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

async function fetchNotes(page: number): Promise<NotesProps> {
  const { data } = await axios.get<NotesProps>('', {
    params: {
      page: `${page}`,
      perPage: 12,
    },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${NOTEHUB_TOKEN}`,
    },
  });

  return data;
}
export default fetchNotes;
