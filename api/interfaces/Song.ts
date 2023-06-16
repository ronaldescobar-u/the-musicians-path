import SongFile from "./SongFile";

interface Song {
  name: string;
  artistId: number;
  genreId: number;
  difficulty: number;
  files: SongFile[];
}

export default Song;
