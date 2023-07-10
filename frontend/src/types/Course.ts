import Song from "./Song";

export default interface Course {
  id: number;
  name: string;
  description: string;
  genre: string;
  difficulty: number;
  songs: Song[];
}
