import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import { Student } from "../models/student.model.js";
import { validateStudentData } from "../utils/helper.js";

const createStudent = asyncHandler(async (req, res) => {
  const studentData = req.body;

  const [isValid, message] = validateStudentData(studentData);

  if (!isValid) {
    throw new ApiError(400, `Error : ${message}`);
  }

  const student = await Student.create(studentData);

  if (!student) {
    throw new ApiError(402, "Something went wrong while crreating student");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, student, "Student created successfully"));
});

const getStudent = asyncHandler(async (req, res) => {
  const studentId = req.params.studentId;

  if (!studentId) {
    throw new ApiError(405, "studentId is required");
  }

  if (!mongoose.isValidObjectId(studentId)) {
    throw new ApiError(405, "Student Id is in incorrect format");
  }
  const student = await Student.findById(studentId);

  if (!student) {
    throw new ApiError(403, "Student does not exist");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, student, "Student fetched successfully"));
});

const updateStudent = asyncHandler(async (req, res) => {
  const studentData = req.body;
  const { studentId } = req.params;

  if (!studentId) {
    throw new ApiError(405, "studentId is required");
  }

  if (!mongoose.isValidObjectId(studentId)) {
    throw new ApiError(405, "Student Id is in incorrect format");
  }

  const [isValid, message] = validateStudentData(studentData);

  if (!isValid) {
    throw new ApiError(400, `Error : ${message}`);
  }

  const student = await Student.findByIdAndUpdate(studentId, studentData, {
    new: true,
  });

  if (!student) {
    throw new ApiError(403, "Student does not exist");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, student, "Student updated successfully"));
});

const deleteStudent = asyncHandler(async (req, res) => {
  const { studentId } = req.params;

  if (!studentId) {
    throw new ApiError(405, "studentId is required");
  }

  if (!mongoose.isValidObjectId(studentId)) {
    throw new ApiError(405, "Student Id is in incorrect format");
  }

  let student = await Student.findOneAndDelete({
    _id: studentId,
  });

  if (!student) {
    throw new ApiError(404, "student not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "student delete successfully"));
});

const getStudentsList = asyncHandler(async (req, res) => {
  const sectionId = req.body.sectionId
  const classId = req.body.classId

  if (!(sectionId && classId)) {
    throw new ApiError(405, "both sectionId and classId is required");
  }

  if (!mongoose.isValidObjectId(sectionId)) {
    throw new ApiError(405, "sectionId is in incorrect format");
  }

  if (!mongoose.isValidObjectId(classId)) {
    throw new ApiError(405, "classId is in incorrect format");
  }

  let students = await Student.aggregate(
    [
      {
        $match : {
          class : new mongoose.Types.ObjectId(classId),
          section : new mongoose.Types.ObjectId(sectionId)
        }
      }
    ]
  )

  console.log(students);

  if (!students) {
    throw new ApiError(404, "students not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, students, "students list fetched successfully"));
});

export {
  createStudent,
  getStudent,
  updateStudent,
  deleteStudent,
  getStudentsList,
};
