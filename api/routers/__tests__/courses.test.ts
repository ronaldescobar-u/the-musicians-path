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
});
