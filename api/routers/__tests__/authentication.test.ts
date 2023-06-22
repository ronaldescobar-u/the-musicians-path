import request from 'supertest';
import app from '../../app';

describe("/authentication", () => {
  describe("POST /authentication", () => {
    it("respond with 400 when missing data", async () => {
      const verifyUsersValidation = (res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            error: expect.arrayContaining([
              expect.objectContaining({
                type: "field",
                value: 'test',
                msg: "Invalid email.",
                path: "email",
                location: "body"
              }),
              expect.objectContaining({
                type: "field",
                msg: "Password is required.",
                path: "password",
                location: "body"
              }),
            ])
          })
        );
      };
      await request(app)
        .post("/authentication")
        .send({ email: 'test' })
        .expect(400)
        .expect(verifyUsersValidation);
    });

    it("respond with 401 when credentials are incorrect", async () => {
      await request(app)
        .post("/authentication")
        .send({
          email: "johndoe@email.com",
          password: "wrongPasssword",
        })
        .expect(401);
    });

    it("respond with 201 when authentication is successful", async () => {
      await request(app)
        .post("/authentication")
        .set("Accept", "application/json")
        .send({
          email: "johndoe@email.com",
          password: "password",
        })
        .expect(200);
    });
  });

  describe("GET /authentication/refresh", () => {
    it("should respond with 401", async () => {
      await request(app)
        .get("/authentication")
        .set("Accept", "application/json")
        .expect("Content-type", /json/)
        .expect(200)
        .expect(res => {
          expect(res.body).toEqual(
            expect.objectContaining({ accessToken: expect.any(String), refreshToken: expect.any(String) })
          );
        });
    });
  });
});
