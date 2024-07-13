const Course = require("../models/courseModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const { default: slugify } = require("slugify");
const User = require("../models/userModel");

// create a course
// POST API

exports.createCourse = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    if (_id) {
      req.body.instructor = _id;
    }
    const course = await Course.create(req.body);
    res.status(200).json({
      success: true,
      message: "Course created successfully..",
      course,
    });
  } catch (error) {}
});

// get all course
// GET API

exports.gelAllCourse = asyncHandler(async (req, res) => {
  try {
    const courses = await Course.find();
    if (!courses) {
      res.status(404).json({
        success: false,
        message: "Course not found",
      });

      res.status(200).json({
        success: true,
        courses,
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

// get single course
// GET API

exports.getSingleCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const course = await Course.findById(id);
    if (!course) {
      res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }
    res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// get particular instractor courses course
// GET API

exports.getParticularUserCourse = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  console.log(req.user);
  validateMongoDbId(_id);

  try {
    const courses = await Course.find({ instructor: _id });
    res.status(200).json({
      status: true,
      message: "Courses Found!",
      courses,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// get checkout entrollemnt course
// GET API

exports.checkoutEntrollment = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { id } = req.user;

  try {
    const user = await User.findById(id);
    let ids = [];
    for (let index = 0; index > user.courses.lenght; index++) {
      if (user.courses.lenght > 0) {
        ids.push(user.courses[index].toString());
      }
    }

    res.status(200).json({
      status: ids.includes(courseId),
      course: await Course.findById(courseId).exec(),
    });
  } catch (error) {
    throw new Error(error);
  }
});

// get free entrollemnt course
// GET API

exports.freeEntrollment = asyncHandler(async (req, res) => {
  const { courseId } = req.courseId;
  try {
    const course = await Course.findById(courseId);

    if (course.paid) {
      return;
    }

    const addCourseToUser = await User.findByIdAndUpdate(
      req.user.id,
      { $push: { course: course?.id } },
      {
        new: true,
      }
    );
    res.status(200).json({
      status: true,
      addCourseToUser,
      message: "Course Added",
    });
  } catch (error) {
    throw new Error(error)
  }
});

// delete single course
// DELEET API

exports.deleteCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteCourse = await Course.findByIdAndDelete(id);

    if (!deleteCourse) {
      res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Course deleted successfully...",
    });
  } catch (error) {
    throw new Error(error);
  }
});

// update single course
// UPDATE API

exports.updateCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const updateCourse = await Course.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updateCourse) {
      res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      updateCourse,
    });
  } catch (error) {
    throw new Error(error);
  }
});
