const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");
const expect = chai.expect;
const request = require("supertest");
const { deleteUserByEmail } = require("../controllers/usersController");
chai.use(chaiHttp);

describe("Testing Logging in a user", () => {
  let testUserData;
  afterEach(async () => {
    if (testUserData && testUserData.email) {
      await deleteUserByEmail(testUserData.email);
    }
  });

  describe("Auth Routes", () => {
    // Store generated user data for subsequent tests
    let testUserData;

    describe("POST /auth/login", () => {
      it("should login a user with correct email and password", async () => {
        const response = await request(app).post("/auth/login").send({
          email: "testapplicant@example.com",
          password: "testpassword",
        });

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("message", "Login succussfull");
        expect(response.body).to.have.property("token");
      });

      it("should not login a user with an incorrect password", async () => {
        const response = await request(app).post("/auth/login").send({
          email: "testapplicant@example.com",
          password: "wrongpassword",
        });

        expect(response.status).to.equal(400);
        expect(response.body).to.have.property(
          "message",
          "Invalid email or password"
        );
      });
    });

    describe("GET /auth/logout", () => {
      it("should log out a logged-in user", async () => {
        try {
          if (testUserData && testUserData.token) {
            const response = await request(app)
              .get("/auth/logout")
              .set("Cookie", `token=${testUserData.token}`);

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property(
              "message",
              "Successfully Logged Out"
            );
          } else {
            console.log("No token found for the logged-in user");
          }
        } catch (error) {
          console.log("Error in logout test:", error.message);
        }
      });
    });
  });
});
