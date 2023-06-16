import request from 'supertest';
import app from '../../app';

describe("/artists", () => {
  describe("GET /artists", () => {
    it("should respond with json containing a list of artists", async () => {
      await request(app)
        .get("/artists")
        .set("Accept", "application/json")
        .expect("Content-type", /json/)
        .expect(200);
    });
  });
});
