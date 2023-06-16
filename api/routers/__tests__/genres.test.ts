import request from 'supertest';
import app from '../../app';

describe("/genres", () => {
  describe("GET /genres", () => {
    it("should respond with json containing a list of genres", async () => {
      await request(app)
        .get("/genres")
        .set("Accept", "application/json")
        .expect("Content-type", /json/)
        .expect(200);
    });
  });
});
