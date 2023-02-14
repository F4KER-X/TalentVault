const Posting = require("../models/Posting");

// @desc Get all postings
// @route GET /postings
// @access Private
const getAllPostings = async (req, res) => {
  const postings = await Posting.find().lean();
  if (!postings) {
    return res.status(400).json({ message: "No job postings found" });
  }
  res.json(postings);
};

// @desc POST new posting
// @route POST /postings
// @access Private
const createNewPosting = async (req, res) => {
  try {
    const {
      employerId,
      jobTitle,
      companyName,
      salary,
      jobDescription,
      jobType,
      jobRequirements,
    } = req.body;

    const postingObject = {
      employerId,
      jobTitle,
      companyName,
      salary,
      jobDescription,
      jobType,
      jobRequirements,
    };

    const posting = await Posting.create(postingObject);

    res.status(201).json({
      message: `${posting.jobTitle} for ${posting.companyName} has been added`,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      let errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      return res.status(400).send(errors);
    }
    res.status(500).send("Something went wrong");
  }
};

// @desc GET one posting
// @route GET /postings/:id
// @access Private
const getOnePosting = async (req, res) => {
  const posting = await Posting.findById(req.params["id"]);
  if (!posting) {
    return res.status(400).json({ message: "Job Posting does not exist" });
  }
  res.json(posting);
};

// @desc PATCH posting
// @route PTACH /postings/:id
// @access Private
const updatePosting = async (req, res) => {
  const posting = await Posting.findById(req.params["id"]);
  if (!posting) {
    return res.status(400).json({ message: "Job posting does not exist" });
  }

  const {
    employerId,
    jobTitle,
    companyName,
    salary,
    jobDescription,
    jobType,
    jobRequirements,
  } = req.body;

  posting.employerId = employerId;
  posting.jobTitle = jobTitle;
  posting.companyName = companyName;
  posting.salary = salary;
  posting.jobDescription = jobDescription;
  posting.jobType = jobType;
  posting.jobRequirements = jobRequirements;

  posting.save(
    { validateBeforeSave: false, skipValidation: { email: true } },
    function (error) {
      if (error) {
        console.error(error);
      } else {
        console.log("Posting saved successfully");
        res.json({ message: "updated" });
      }
    }
  );
};

// @desc DELETE posting
// @route DELETE /postings/:id
// @access Private
const deletePosting = async (req, res) => {
  //have to check if the posting has any jobs application or created any open jobs once we implement the jobs model

  const posting = await Posting.findById(req.params["id"]).exec();
  if (!posting) {
    return res.status(400).json({ message: "Job posting does not exist" });
  }

  const result = await posting.deleteOne();

  res.status(201).json({
    message: `${result._id} with job company ${result.companyName} for ${result.jobTitle} has been deleted`,
  });
};

module.exports = {
  getAllPostings,
  createNewPosting,
  getOnePosting,
  updatePosting,
  deletePosting,
};
