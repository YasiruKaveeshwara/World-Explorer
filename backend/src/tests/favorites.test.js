const request = require("supertest");
const app = require("../server");

let token = "";
let favoriteId = "";

beforeAll(async () => {
  await request(app).post("/api/auth/register").send({
    username: "testuser",
    email: "testuser@example.com",
    password: "Test1234",
  });

  const loginRes = await request(app).post("/api/auth/login").send({
    email: "testuser@example.com",
    password: "Test1234",
  });

  token = loginRes.body.token;
});

describe("Favorites Routes", () => {
  it("should add a favorite country", async () => {
    const res = await request(app)
      .post("/api/countries/favorites")
      .set("Authorization", `Bearer ${token}`)
      .send({
        countryCode: "LKA",
        countryName: "Sri Lanka",
        flag: "https://flagcdn.com/lk.svg",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message");
  });

  it("should get favorite countries", async () => {
    const res = await request(app)
      .get("/api/countries/favorites")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);

    favoriteId = res.body[0]._id;
  });

  it("should delete a favorite", async () => {
    const res = await request(app)
      .delete(`/api/countries/favorites/${favoriteId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Favorite removed successfully");
  });
});


afterAll(async () => {
  const mongoose = require('mongoose');
  await mongoose.connection.close();
});
