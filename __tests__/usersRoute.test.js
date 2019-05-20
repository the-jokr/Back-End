const request = require("supertest");

const server = require("../api/server");
describe("usersRoutes", () => {
  describe("/GET", () => {
    it("should return 200 ok", async () => {
      const res = await request(server).get("/api/auth");
      expect(res.status).toBe(200);
    });
  });
});
