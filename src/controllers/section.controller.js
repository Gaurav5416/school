import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Section } from "../models/section.model.js";
import mongoose from "mongoose";
import { isValidSection, isExistingSection } from "../utils/helper.js";

const createSection = asyncHandler(async (req, res) => {
  const { section } = req.body;

  if (!section) {
    throw new ApiError(400, "Value could not be recieved");
  }

  if (!isValidSection(section)) {
    throw new ApiError(400, "Value is not a valid section");
  }

  if (await isExistingSection(section)) {
    throw new ApiError(400, "section already exists");
  }

  const sectionObject = await Section.create({ section: section });

  if (!sectionObject) {
    throw new ApiError(
      500,
      "Something went wrong while registering the section"
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, sectionObject, "Section created successfully"));
});

const getSection = asyncHandler(async (req, res) => {
  const sectionId = req.params.sectionId;
  console.log(sectionId);
  const section = await Section.findById(sectionId);

  if (!section) {
    throw new ApiError(400, "section does not exist");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, section, "Section fetched successfully"));
});

const updateSection = asyncHandler(async (req, res) => {
  const { section } = req.body;
  const { sectionId } = req.params;

  if (!section) {
    throw new ApiError(400, "Value could not be recieved");
  }

  if (!isValidSection(section)) {
    throw new ApiError(400, "Value is not a valid section");
  }

  if (await isExistingSection(section)) {
    throw new ApiError(400, "section already exists");
  }

  const sectionObject = await Section.findByIdAndUpdate(
    sectionId,
    { section: section },
    { new: true }
  );

  if (!sectionObject) {
    throw new ApiError(406, "Invalid class id");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, sectionObject, "section updated successfully"));
});

const deleteSection = asyncHandler(async (req, res) => {
  const { sectionId } = req.params;

  if (!sectionId) {
    throw new ApiError(405, "sectionId is required");
  }

  let section = await Section.findOneAndDelete({
    _id: sectionId,
  });

  if (!section) {
    throw new ApiError(404, "section not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "seection delete successfully"));
});

export { createSection, getSection, updateSection, deleteSection };
