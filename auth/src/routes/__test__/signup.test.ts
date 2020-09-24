import request from "supertest";

import { app } from "../../app";

test("returns 201 on successfull signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password" })
    .expect(201);
});

test("returns a 400 on invalid email ", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({ email: "test.com", password: "pass" })
    .expect(400);
});

test("returns a 400 on invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({ email: "test@jk.com", password: "pss" })
    .expect(400);
});

test("returns a 400 on no email or password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({ email: "", password: "" })
    .expect(400);
});

test("disallows duplicate email", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "rahul@gmail.com", password: "yoyo" })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({ email: "rahul@gmail.com", password: "yoyo" })
    .expect(400);
});

test("sets a cookie after successful signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({ email: "rahul@gmail.com", password: "yoyo" })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
