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
                msg: "First name is required.",
                path: "firstName",
                location: "body"
              }),
              expect.objectContaining({
                type: "field",
                msg: "Last name is required.",
                path: "lastName",
                location: "body"
              }),
              expect.objectContaining({
                location: "body",
                msg: "Email is invalid.",
                path: "email",
                type: "field",
              }),
              expect.objectContaining({
                location: "body",
                msg: "Password should have at least 8 characters and at least one: uppercase, lowercase, number and symbol.",
                path: "password",
                type: "field",
              }),
            ])
          })
        );
      };
      await request(app)
        .post("/users")
        .send({ email: 'test', password: 'test' })
        .expect(400)
        .expect(verifyUsersValidation);
    });

    it("respond with 201 when a user is created", async () => {
      await request(app)
        .post("/users")
        .set("Accept", "application/json")
        .send({
          firstName: "John",
          lastName: "Doe",
          email: 'test@email.com',
          password: 'Password123!'
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
