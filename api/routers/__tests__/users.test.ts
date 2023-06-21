import request from 'supertest';
import app from '../../app';

describe("/users", () => {
  describe("POST /users", () => {
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
        .post("/users")
        .send({ description: 'test' })
        .expect(400)
        .expect(verifyUsersValidation);
    });

    it("respond with 201 when a user is created", async () => {
      await request(app)
        .post("/courses")
        .set("Accept", "application/json")
        .send({
          firstName: "John",
          lastName: "Doe",
          email: 'johndoe@email.com',
          password: 'password'
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
});
