import request from 'supertest';
import app from '../../app';

describe("/songs", () => {
  describe("GET /songs", () => {
    const songs = [
      { id: 2, name: "Penny Lane", artist: "The Beatles", genre: "Rock", difficulty: 5 },
      { id: 3, name: "Strawberry Fields Forever", artist: "The Beatles", genre: "Rock", difficulty: 7 },
      { id: 4, name: "I Knew You Were Trouble", artist: "Taylor Swift", genre: "Pop", difficulty: 4 },
      { id: 5, name: "Pink + White", artist: "Frank Ocean", genre: "R&B", "difficulty": 5 },
      { id: 1, name: "When I'm Sixty Four", artist: "The Beatles", genre: "Rock", difficulty: 3 }
    ];
    it("should respond with json containing a list of songs without filters", async () => {
      await request(app)
        .get("/songs")
        .set("Accept", "application/json")
        .expect("Content-type", /json/)
        .expect(200)
        .expect(JSON.stringify(songs));
    });

    it("should respond with json containing a list of songs with artist, genre and searchQuery filters", async () => {
      await request(app)
        .get("/songs?artistId=1&genreId=1&searchQuery=penny")
        .set("Accept", "application/json")
        .expect("Content-type", /json/)
        .expect(200)
      .expect(JSON.stringify([songs[0]]));
    });
  });

  describe("GET /song/{id}", () => {
    it("should respond with json containing a single song found by id", async () => {
      await request(app)
        .get("/songs/1")
        .set("Accept", "application/json")
        .expect("Content-type", /json/)
        .expect(200);
    });

    it("should respond with 404 for song not found", async () => {
      await request(app)
        .get("/songs/100")
        .set("Accept", "application/json")
        .expect(404);
    });
  });
});
