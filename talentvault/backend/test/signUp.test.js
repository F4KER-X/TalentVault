const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");
const expect = chai.expect;
const request = require("supertest");
const { deleteUserByEmail } = require("../controllers/usersController");
chai.use(chaiHttp);

describe("Testing Registering a User", () => {
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
  describe("POST /auth/signup", () => {
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
});
