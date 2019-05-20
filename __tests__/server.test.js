const server = require("../api/server");

describe("server", () => {
  it("should use the testing environment", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });
});
