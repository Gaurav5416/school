import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Class } from "../models/class.model.js";
import mongoose from "mongoose";
import { isValidClass, isExistingClass } from "../utils/helper.js";

const createClass = asyncHandler(async (req, res) => {
  const { classNumber } = req.body;

  if (!classNumber) {
    throw new ApiError(400, "Value could not be recieved");
  }

  if (!isValidClass(classNumber)) {
    throw new ApiError(400, "Value is not a valid class");
  }

  if (await isExistingClass(classNumber)) {
    throw new ApiError(400, "Class already exists");
  }

  const classObject = await Class.create({
    class: classNumber,
  });

  if (!classObject) {
    throw new ApiError(500, "Something went wrong while registering the class");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, classObject, "Class created successfully"));
});

const getClass = asyncHandler(async (req, res) => {
  const classId = req.params.classId;

  const classData = await Class.findById(classId);

  if (!classData) {
    throw new ApiError(400, "Class does not exist");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, classData, "Class fetched successfully"));
});

const updateClass = asyncHandler(async (req, res) => {
  const { classNumber } = req.body;
  const { classId } = req.params;

  if (!classNumber) {
    throw new ApiError(400, "Value could not be recieved");
  }

  if (!isValidClass(classNumber)) {
    throw new ApiError(400, "Value is not a valid class");
  }

  if (await isExistingClass(classNumber)) {
    throw new ApiError(400, "Class already exists");
  }

  const classData = await Class.findByIdAndUpdate(
    classId,
    { class: classNumber },
    { new: true }
  );

  if (!classData) {
    throw new ApiError(406, "Failed to update class");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, classData, "Class updated successfully"));
});

const deleteClass = asyncHandler(async (req, res) => {
  const { classId } = req.params;

  if (!classId) {
    throw new ApiError(405, "classId is required");
  }

  let classData = await Class.findOneAndDelete({
    _id: classId,
  });

  if (!classData) {
    throw new ApiError(404, "class not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "class delete successfully"));
});

export { createClass, getClass, updateClass, deleteClass };
