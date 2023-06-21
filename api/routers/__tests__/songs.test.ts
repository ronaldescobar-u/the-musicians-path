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

  describe("POST /songs", () => {
    it("respond with 400 response when missing data", async () => {
      const verifyUsersValidation = (res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            error: expect.arrayContaining([
              expect.objectContaining({
                type: "field",
                msg: "Genre ID is required.",
                path: "genreId",
                location: "body"
              }),
              expect.objectContaining({
                type: "field",
                msg: "Genre ID should be int.",
                path: "genreId",
                location: "body"
              }),
              expect.objectContaining({
                type: "field",
                value: 25,
                msg: "Difficulty should be int and it should be between 1 to 10.",
                path: "difficulty",
                location: "body"
              }),
              expect.objectContaining({
                type: "field",
                value: [],
                msg: "Files should be array with at least one element.",
                path: "files",
                location: "body"
              })
            ])
          })
        );
      };
      await request(app)
        .post("/songs")
        .send({
          name: "test",
          artistId: 1,
          difficulty: 25,
          files: []
        })
        .expect(400)
        .expect(verifyUsersValidation);
    });

    it("respond with 201 when a song is created", async () => {
      await request(app)
        .post("/songs")
        .set("Accept", "application/json")
        .send({
          name: "Song name",
          artistId: 1,
          genreId: 1,
          difficulty: 5,
          files: [
            {
              fileTypeId: 1,
              content: 'C D B G',
            }
          ]
        })
        .expect(201);
    });
  });

  describe("PUT /songs/{id}", () => {
    it("respond with 400 response when missing data", async () => {
      const verifyUsersValidation = (res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            error: expect.arrayContaining([
              expect.objectContaining({
                type: "alternative_grouped",
                msg: "Please update at least one of the fields (name, description).",
              }),
            ])
          })
        );
      };
      await request(app)
        .put("/songs/1")
        .send({})
        .expect(400)
        .expect(verifyUsersValidation);
    });

    it("should respond with 404 for song not found", async () => {
      await request(app)
        .put("/songs/100")
        .set("Accept", "application/json")
        .send({
          name: "song name",
        })
        .expect(404);
    });

    it("respond with 204 when a song is updated", async () => {
      await request(app)
        .put("/songs/1")
        .set("Accept", "application/json")
        .send({
          name: "Song name",
        })
        .expect(204);
    });
  });

  describe("DELETE /songs/{id}", () => {
    it("should respond with 404 for song not found", async () => {
      await request(app)
        .delete("/songs/100")
        .expect(404);
    });

    it("respond with 204 when a song is deleted", async () => {
      await request(app)
        .delete("/songs/2")
        .expect(204);
    });
  });

  describe("GET /song/{id}/comments", () => {
    it("should respond with json containing a single song found by id", async () => {
      await request(app)
        .get("/songs/1/comments")
        .set("Accept", "application/json")
        .expect("Content-type", /json/)
        .expect(200);
    });

    // it("should respond with 404 for song not found", async () => {
    //   await request(app)
    //     .get("/songs/100")
    //     .set("Accept", "application/json")
    //     .expect(404);
    // });
  });

  describe("POST /song/{id}/comments", () => {
    it("respond with 400 response when missing data", async () => {
      const verifyCommentValidation = (res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            error: expect.arrayContaining([
              expect.objectContaining({
                type: "field",
                msg: "Text is required.",
                path: "text",
                location: "body"
              }),
            ])
          })
        );
      };
      await request(app)
        .post("/song/1/comments")
        .send({})
        .expect(400)
        .expect(verifyCommentValidation);
    });

    it("respond with 404 for non existant course", async () => {
      await request(app)
        .post("/song/100/comments")
        .set("Accept", "application/json")
        .send({ text: 'Test comment' })
        .expect(404);
    });

    it("respond with 201 when a comment is created", async () => {
      await request(app)
        .post("/song/1/comments")
        .set("Accept", "application/json")
        .send({ text: 'Test comment' })
        .expect(201);
    });
  });
});
