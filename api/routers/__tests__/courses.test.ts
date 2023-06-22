import request from 'supertest';
import app from '../../app';

describe("/courses", () => {
  describe("GET /courses", () => {
    const courses = [
      { id: 1, name: "The Beatles: Begginers Course", description: "Only easy songs to play by The Beatles", added_by: 1 },
      { id: 2, name: "80s Classics", description: "80s songs from beginner to advanced", added_by: 1 }
    ];
    it("should respond with json containing a list of courses without searchQuery", async () => {
      await request(app)
        .get("/courses")
        .set("Accept", "application/json")
        .expect("Content-type", /json/)
        .expect(200)
        .expect(JSON.stringify(courses));
    });

    it("should respond with json containing a list of courses with searchQuery", async () => {
      await request(app)
        .get("/courses?searchQuery=beatles")
        .set("Accept", "application/json")
        .expect("Content-type", /json/)
        .expect(200)
        .expect(JSON.stringify([courses[0]]));
    });
  });

  describe("GET /course/{id}", () => {
    it("should respond with json containing a single course found by id", async () => {
      await request(app)
        .get("/courses/1")
        .set("Accept", "application/json")
        .expect("Content-type", /json/)
        .expect(200);
    });

    it("should respond with 404 for course not found", async () => {
      await request(app)
        .get("/courses/100")
        .set("Accept", "application/json")
        .expect(404);
    });
  });

  describe("POST /courses", () => {
    it("respond with 400 response when missing data", async () => {
      const verifyUsersValidation = (res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            error: expect.arrayContaining([
              expect.objectContaining({
                type: "field",
                msg: "Name is required.",
                path: "name",
                location: "body"
              }),
            ])
          })
        );
      };
      await request(app)
        .post("/courses")
        .send({ description: 'test' })
        .expect(400)
        .expect(verifyUsersValidation);
    });

    it("respond with 201 when a course is created", async () => {
      await request(app)
        .post("/courses")
        .set("Accept", "application/json")
        .send({
          name: "Course name",
          description: "Description",
        })
        .expect(201);
    });
  });

  describe("PUT /courses/{id}", () => {
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
        .put("/courses/1")
        .send({})
        .expect(400)
        .expect(verifyUsersValidation);
    });

    it("should respond with 404 for course not found", async () => {
      await request(app)
        .put("/courses/100")
        .set("Accept", "application/json")
        .send({
          description: "Description",
        })
        .expect(404);
    });

    it("respond with 204 when a course is updated", async () => {
      await request(app)
        .put("/courses/1")
        .set("Accept", "application/json")
        .send({
          description: "Description",
        })
        .expect(204);
    });
  });

  describe("DELETE /courses/{id}", () => {
    it("should respond with 404 for course not found", async () => {
      await request(app)
        .delete("/courses/100")
        .expect(404);
    });

    it("respond with 204 when a course is deleted", async () => {
      await request(app)
        .delete("/courses/2")
        .expect(204);
    });
  });

  describe("GET /courses/{id}/ratings", () => {
    it("should respond with json containing ratings of the course with the given id", async () => {
      await request(app)
        .get("/courses/1/ratings")
        .set("Accept", "application/json")
        .expect("Content-type", /json/)
        .expect(200);
    });

    // it("should respond with 404 for course not found", async () => {
    //   await request(app)
    //     .get("/course/100/ratings")
    //     .set("Accept", "application/json")
    //     .expect(404);
    // });
  });

  describe("POST /courses/{id}/ratings", () => {
    it("respond with 400 response when missing data", async () => {
      const verifyCommentValidation = (res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            error: expect.arrayContaining([
              expect.objectContaining({
                type: "field",
                msg: "Stars should be a number between 0 and 5.",
                path: "stars",
                location: "body"
              }),
            ])
          })
        );
      };
      await request(app)
        .post("/courses/1/ratings")
        .send({ text: 'good course' })
        .expect(400)
        .expect(verifyCommentValidation);
    });

    it("respond with 404 for non existant course", async () => {
      await request(app)
        .post("/courses/100/ratings")
        .set("Accept", "application/json")
        .send({ text: 'Test rating', stars: 4 })
        .expect(404);
    });

    it("respond with 201 when a rating is created", async () => {
      await request(app)
        .post("/courses/1/ratings")
        .set("Accept", "application/json")
        .send({ text: 'Test rating', stars: 4 })
        .expect(201);
    });
  });

  describe("POST /courses/{id}/users", () => {
    it("respond with 404 for non existant course", async () => {
      await request(app)
        .post("/courses/100/users")
        .set("Accept", "application/json")
        .send({})
        .expect(404);
    });

    it("respond with 201 when a user is added to the course", async () => {
      await request(app)
        .post("/courses/1/users")
        .set("Accept", "application/json")
        .send({})
        .expect(201);
    });
  });

  describe("POST /courses/{id}/songs", () => {
    it("respond with 400 response when missing data", async () => {
      const verifyCommentValidation = (res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            error: expect.arrayContaining([
              expect.objectContaining({
                location: "body",
                type: "field",
                msg: "Song ID should be int.",
                path: "songId",
              }),
              expect.objectContaining({
                location: "body",
                msg: "Order should be int.",
                path: "order",
                type: "field",
              }),
            ])
          })
        );
      };
      await request(app)
        .post("/courses/1/songs")
        .send({})
        .expect(400)
        .expect(verifyCommentValidation);
    });

    it("respond with 404 for non existant course", async () => {
      await request(app)
        .post("/courses/100/songs")
        .set("Accept", "application/json")
        .send({ songId: 1, order: 2 })
        .expect(404);
    });

    it("respond with 201 when a song is added to the course", async () => {
      await request(app)
        .post("/courses/1/songs")
        .set("Accept", "application/json")
        .send({ songId: 5, order: 2 })
        .expect(201);
    });
  });

  describe("PUT /courses/{id}/songs", () => {
    it("respond with 400 response when missing data", async () => {
      const verifyValidation = (res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            error: expect.arrayContaining([
              expect.objectContaining({
                type: "field",
                msg: "Song ID should be int.",
                path: "songId",
                location: "body"
              }),
            ])
          })
        );
      };
      await request(app)
        .put("/courses/1/songs")
        .send({})
        .expect(400)
        .expect(verifyValidation);
    });

    it("respond with 404 for non existant course", async () => {
      await request(app)
        .put("/courses/100/songs")
        .set("Accept", "application/json")
        .send({ songId: 1 })
        .expect(404);
    });

    it("respond with 201 when a song is completed in the course", async () => {
      await request(app)
        .put("/courses/1/songs")
        .set("Accept", "application/json")
        .send({ songId: 1 })
        .expect(201);
    });
  });
});
