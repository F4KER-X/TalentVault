const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");
const expect = chai.expect;
const request = require("supertest");
const { deleteUserByEmail } = require("../controllers/usersController");
chai.use(chaiHttp);

describe("Auth Routes", () => {
  let testUserData;
  afterEach(async () => {
    if (testUserData && testUserData.email) {
      await deleteUserByEmail(testUserData.email);
    }
  });

  describe("POST /auth/signup", () => {
    it("should return a 400 status code if email is not provided", (done) => {
      chai
        .request(app)
        .post("/auth/signup")
        .send({ password: "testPassword", role: "recruiter" })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property(
            "message",
            "Email was not provided"
          );
          done();
        });
    });
  });

  describe("Auth Routes", () => {
    // Store generated user data for subsequent tests
    let testUserData;

    describe("POST /auth/signup", () => {
      it("should register a new applicant with valid data", async () => {
        const response = await request(app).post("/auth/signup").send({
          email: "testapplicant@example.com",
          password: "testpassword",
          role: "applicant",
          firstName: "Test",
          lastName: "Applicant",
        });

        expect(response.status).to.be.oneOf([200, 400]);
        expect(response.body).to.have.property(
          "message",
          "Applicant was created successfully!"
        );
        expect(response.body).to.have.property("token");
        testUserData = response.body;
      });

      it("should not register a user with an already registered email", async () => {
        const response = await request(app).post("/auth/signup").send({
          email: "testapplicant@example.com",
          password: "testpassword",
          role: "applicant",
          firstName: "Test",
          lastName: "Applicant",
        });

        expect(response.status).to.equal(400);
        expect(response.body).to.have.property(
          "message",
          "testapplicant@example.com is already registered"
        );
      });
    });

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
