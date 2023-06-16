import request from 'supertest';
import app from '../../app';

describe("/courses", () => {
  describe("GET /courses", () => {
    it("should respond with json containing a list of courses without searchQuery", async () => {
      await request(app)
        .get("/courses")
        .set("Accept", "application/json")
        .expect("Content-type", /json/)
        .expect(200)
        .expect("Body", []);
    });

    it("should respond with json containing a list of courses with searchQuery", async () => {
      await request(app)
        .get("/courses?searchQuery=strawberry")
        .set("Accept", "application/json")
        .expect("Content-type", /json/)
        .expect(200)
        .expect("Body", []);
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
        .expect("Content-type", /json/)
        .expect(404);
    });
  });
});
