const User = require("../models/User");
const Recruiter = require("../models/Recruiter");
const Applicant = require("../models/Applicant");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { validPassword } = require("./userValidation");
const Job = require("../models/Job");
const cloudinary = require("../Utils/cloudinary");
const Application = require("../models/Application");

// @desc Get info of the user
// @route GET /user
// @access Private
const getUserInfo = asyncHandler(async (req, res) => {
  const id = req.user._id;
  const role = req.user.role;
  const email = req.user.email;

  if (role === "recruiter") {
    const recruiter = await Recruiter.findOne({ userId: id }).lean().exec();
    if (!recruiter) {
      return res.status(404).json({ message: "User not found" });
    }
    recruiter.role = role;
    recruiter.email = email;
    res.status(200).json(recruiter);
  } else {
    const applicant = await Applicant.findOne({ userId: id }).lean().exec();
    if (!applicant) {
      return res.status(404).json({ message: "User not found" });
    } else {
      applicant.role = role;
      applicant.email = email;
      res.status(200).json(applicant);
    }
  }
});

// @desc update user personal info
// @route PATCH /user
// @access Private
const updateUserInfo = asyncHandler(async (req, res) => {
  const { _id, role } = req.user;
  const { companyName, firstName, lastName, phoneNumber, bio } = req.body;

  if (role === "recruiter") {
    const recruiter = await Recruiter.findOne({ userId: _id }).exec();
    if (recruiter) {
      if (companyName) {
        recruiter.companyName = companyName;

        //update company name for all jobs that the user created.
        await Job.updateMany({ recruiterId: _id }, { companyName });
      }
      if (phoneNumber) {
        recruiter.phoneNumber = phoneNumber;
      }
      if (firstName) {
        recruiter.firstName = firstName;
      }
      if (lastName) {
        recruiter.lastName = lastName;
      }
      if (bio) {
        recruiter.bio = bio;
      }

      const updatedRecruiuter = await recruiter.save();

      //may not be necessary - check later
      if (updatedRecruiuter) {
        res.status(200).json({ message: "User info updated!" });
      } else {
        res.status(400).json({ message: "update request faild" });
      }
    } else {
      return res.status(404).json({ message: "User does not exist" });
    }
  } else {
    const applicant = await Applicant.findOne({ userId: _id }).exec();
    if (applicant) {
      if (firstName) {
        applicant.firstName = firstName;
      }
      if (lastName) {
        applicant.lastName = lastName;
      }

      applicant.phoneNumber = phoneNumber;

      if (bio) {
        applicant.bio = bio;
      }

      const updatedApplicant = await applicant.save();

      //may not be necessary - check later
      if (updatedApplicant) {
        res.status(200).json({ message: "User info updated!", _id, role });
      } else {
        res.status(400).json({ message: "update request faild" });
      }
    } else {
      return res.status(404).json({ message: "User does not exist" });
    }
  }
});

// @desc delete user
// @route DELETE /user
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
  const user = req.user;

  const deletedUser = await User.findByIdAndDelete(user._id).lean().exec();
  if (deletedUser) {
    if (deletedUser.role === "recruiter") {
      const deletedRecruiter = await Recruiter.findOneAndDelete({
        userId: user._id,
      }).exec();
      await cloudinary.uploader.destroy(
        deletedRecruiter.profilePicUrl.public_id
      );
      const deleteJobs = await Job.deleteMany({ recruiterId: user._id });
      const deletedApplications = await Application.deleteMany({
        recruiterId: user._id,
      });

      if (deletedRecruiter && deleteJobs && deletedApplications) {
        res.cookie("token", "", {
          path: "/",
          httpOnly: true,
          expires: new Date(0),
          sameSite: "none",
          secure: true,
        });
        res.status(200).json({ meesage: "User deleted" });
      } else {
        res.status(500).json({ message: "Could not delete user" });
      }
    } else {
      const deletedApplicant = await Applicant.findOneAndDelete({
        userId: user._id,
      });
      await cloudinary.uploader.destroy(
        deletedApplicant.profilePicUrl.public_id
      );
      await cloudinary.uploader.destroy(deletedApplicant.resume.public_id);
      const deleteApplications = await Application.deleteMany({
        applicantId: user._id,
      });
      if (deletedApplicant && deleteApplications) {
        res.cookie("token", "", {
          path: "/",
          httpOnly: true,
          expires: new Date(0),
          sameSite: "none",
          secure: true,
        });
        res.status(200).json({ meesage: "User deleted" });
      } else {
        res.status(500).json({ message: "Could not delete user" });
      }
    }
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

const updatePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json("User not found");
  }

  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res
      .status(400)
      .json("Please make sure you enter the old and new password");
  }
  if (validPassword(newPassword)) {
    return res.status(400).json({
      message: "Make sure the password is not less than 8 characters",
    });
  }

  const correctPwd = await bcrypt.compare(currentPassword, user.password);

  const salt = await bcrypt.genSalt(10);
  const hashedPwd = await bcrypt.hash(newPassword, salt);

  if (user && correctPwd) {
    user.password = hashedPwd;
    await user.save();
    res.status(200).json({ message: "Password updated successfully" });
  } else {
    res.status(400).json({ message: "Current password is incorrect" });
  }
});

const getUserRole = asyncHandler(async (req, res) => {
  const id = req.user._id;
  const user = await User.findById(id).lean().exec();

  let recruiter;
  if (user.role === "recruiter") {
    recruiter = await Recruiter.findOne({ userId: id }).lean().exec();
  }

  if (user) {
    return res.status(200).json({
      role: user.role,
      id: user._id,
      companyName: recruiter?.companyName,
    });
  } else {
    return res.status(400).json({ message: "User not found" });
  }
});

const uploadPhoto = asyncHandler(async (req, res) => {
  try {
    const file = req.file;

    if (
      file.mimetype !== "image/png" &&
      file.mimetype !== "image/jpeg" &&
      file.mimetype !== "image/jpg"
    ) {
      return res
        .status(400)
        .json({ message: "Only PNG and JPG format are allowed" });
    }

    maxSize = 2097152;
    if (file.size > maxSize) {
      return res
        .status(400)
        .json({ message: "File size must be less than 2 MB" });
    }

    let user;
    if (req.user.role === "recruiter") {
      user = await Recruiter.findOne({ userId: req.user._id });
    } else {
      user = await Applicant.findOne({ userId: req.user._id });
    }
    if (!user) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    await cloudinary.uploader.destroy(user.profilePicUrl.public_id);

    const result = await cloudinary.uploader.upload(file.path, {
      width: 500,
      height: 500,
      crop: "fill",
    });
    user.profilePicUrl.public_id = result.public_id;
    user.profilePicUrl.URL = result.url;

    await user.save();

    res.status(200).json({ message: "Image uploaded" });
  } catch (error) {
    res.status(400).json({ error, message: "error" });
  }
});

const uploadFile = asyncHandler(async (req, res) => {
  try {
    const file = req.file;

    if (file.mimetype !== "application/pdf") {
      return res.status(400).json({ message: "Only PDF format is allowed" });
    }

    maxSize = 2097152;
    if (file.size > maxSize) {
      return res
        .status(400)
        .json({ message: "File size must be less than 2 MB" });
    }

    if (req.user.role !== "applicant") {
      return res
        .status(401)
        .json({ message: "Not authorized to upload a file" });
    }

    const user = await Applicant.findOne({ userId: req.user._id });

    if (!user) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    await cloudinary.uploader.destroy(user.resume.public_id);

    const result = await cloudinary.uploader.upload(file.path);
    user.resume.public_id = result.public_id;
    user.resume.URL = result.url;

    await user.save();

    res.status(200).json({ message: "File uploaded" });
  } catch (error) {
    res.status(400).json({ error, message: "error" });
  }
});

// @desc    Delete user
// to be used for testing
const deleteUserByEmail = asyncHandler(async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    return;
  }

  if (user.role === "recruiter") {
    await Recruiter.findOneAndDelete({ userId: user._id });
  } else {
    await Applicant.findOneAndDelete({ userId: user._id });
  }

  await User.deleteOne({ email });
});

//   module.exports.deleteUserByEmail = deleteUserByEmail;

module.exports = {
  getUserInfo,
  deleteUserByEmail,
  updateUserInfo,
  deleteUser,
  updatePassword,
  getUserRole,
  uploadPhoto,
  uploadFile,
};
