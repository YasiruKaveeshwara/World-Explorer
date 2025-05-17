const request = require("supertest");
const app = require("../server");

describe("Auth Routes", () => {
  const timestamp = Date.now();
  const testUser = {
    username: `testuser_${timestamp}`, // make this unique too
    email: `testuser_${timestamp}@example.com`,
    password: "Test1234",
  };

  it("should register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send(testUser);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message");
  });

  it("should login the registered user", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: testUser.email,
      password: testUser.password,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});

afterAll(async () => {
  const mongoose = require("mongoose");
  await mongoose.connection.close();
});
