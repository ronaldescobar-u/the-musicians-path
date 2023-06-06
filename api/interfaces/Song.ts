import SongFile from "./SongFile";

interface Song {
  name: string;
  artistId: number;
  genreId: number;
  difficulty: number;
  addedBy: number;
  songFiles: SongFile[];
}

export default Song;
