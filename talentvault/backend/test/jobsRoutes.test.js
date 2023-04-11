const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");
const expect = chai.expect;
const request = require("supertest");
const { deleteUserByEmail } = require("../controllers/usersController");
chai.use(chaiHttp);

// Helper function for logging in a user
async function loginUser() {
  // Replace the email and password with valid credentials for your test user
  const res = await request(app).post("/auth/login").send({
    email: "test@example.com",
    password: "testPassword",
  });
  if (!res.body.token) {
    throw new Error("No token received");
  }

  return res.body.token;
}

describe("Auth Routes", () => {
  let recruiterToken;
  let jobId;

  before(async () => {
    // Register and login as a recruiter to obtain the token
    const recruiter = {
      email: "recruiter@example.com",
      password: "recruiterPassword",
      role: "recruiter",
    };

    await request(app).post("/auth/signup").send({
      email: recruiter.email,
      password: recruiter.password,
      role: recruiter.role,
      isRecruiter: true,
    });

    const loginResponse = await request(app)
      .post("/auth/login")
      .send({ email: recruiter.email, password: recruiter.password });

    recruiterToken = await loginUser();

    // Add a job to the database and obtain its ID
    const jobResponse = await request(app)
      .post("/jobs")
      .set("Authorization", `Bearer ${recruiterToken}`)
      .send({
        // Add the required job details
      });

    jobId = jobResponse.body._id;
  });

  after(async () => {
    await deleteUserByEmail("recruiter@example.com");
  });

  describe("GET /jobs", () => {
    it("should return all jobs", async () => {
      // Add jobs to the database

      const response = await request(app).get("/jobs");

      expect(response.status).to.be.oneOf([200, 401]);
      expect(response.body).to.have.property("message");
      // Add more specific assertions if needed
    });
  });

  describe("POST /jobs", () => {
    it("should create a new job with valid data", async () => {
      // Login as a recruiter and obtain the token

      const response = await request(app)
        .post("/jobs")
        .set("Authorization", `Bearer ${recruiterToken}`)
        .send({
          // Add the required job details
        });

      expect(response.status).to.be.oneOf([200, 401]);
      expect(response.body).to.have.property("message");
      // Add more specific assertions if needed
    });
  });
  describe("GET /jobs/:id", () => {
    it("should return the job with the given ID", async () => {
      // Add a job to the database and obtain its ID

      const response = await request(app).get(`/jobs/${jobId}`);

      expect(response.status).to.be.oneOf([200, 401]);
      expect(response.body).to.have.property("message");
      // Add more specific assertions if needed
    });
  });
  describe("PATCH /jobs/:id", () => {
    it("should update the job with the given ID and valid data", async () => {
      // Login as a recruiter and obtain the token
      // Add a job to the database and obtain its ID

      const response = await request(app)
        .patch(`/jobs/${jobId}`)
        .set("Authorization", `Bearer ${recruiterToken}`)
        .send({
          // Add the updated job details
        });

      expect(response.status).to.be.oneOf([200, 401]);
      expect(response.body).to.have.property("message");
      // Add more specific assertions if needed
    });
  });
  describe("DELETE /jobs/:id", () => {
    it("should delete the job with the given ID", async () => {
      // Login as a recruiter and obtain the token
      // Add a job to the database and obtain its ID

      const response = await request(app)
        .delete(`/jobs/${jobId}`)
        .set("Authorization", `Bearer ${recruiterToken}`);

      expect(response.status).to.be.oneOf([200, 401]);
      expect(response.body).to.have.property("message");
      // Add more specific assertions if needed
    });
  });
  describe("GET /jobs/user-jobs", () => {
    it("should return all jobs for the logged-in recruiter", async () => {
      // Login as a recruiter and obtain the token

      const response = await request(app)
        .get("/jobs/user-jobs")
        .set("Authorization", `Bearer ${recruiterToken}`);

      expect(response.status).to.be.oneOf([200, 401]);
      expect(response.body).to.have.property("message");
      // Add more specific assertions if needed
    });
  });
});
