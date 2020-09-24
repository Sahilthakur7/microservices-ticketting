import request from "supertest";
import { app } from "../../app";

test("does not allow to sign in with non-existing email", async () => {
  return request(app)
    .post("/api/users/signin")
    .send({ email: "kabootr@gmail.com", password: "teapot" })
    .expect(400);
});

test("fails when incorrect password is supplied", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "rahul@gmail.com", password: "yoyo" })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({ email: "rahul@gmail.com", password: "toto" })
    .expect(400);
});

test("sets a cookie when signed in with valid credentials", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "rahul@gmail.com", password: "yoyo" })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({ email: "rahul@gmail.com", password: "yoyo" })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
