import { Section } from "../models/section.model.js";
import { Class } from "../models/class.model.js";
import mongoose from "mongoose";
import { ApiError } from "./ApiError.js";

export function isValidClass(classNumber) {
  const allowedClass = [6, 7, 8, 9, 10];
  if (allowedClass.includes(classNumber)) {
    return true;
  }
  return false;
}

export async function isExistingClass(classNumber) {
  const existingClass = await Class.findOne({ classNumber });
  if (existingClass) {
    return true;
  }
  return false;
}

export function isValidSection(section) {
  const allowedSection = ["A", "B", "C"];
  if (allowedSection.includes(section)) {
    return true;
  }
  return false;
}

export async function isExistingSection(section) {
  const existingSection = await Class.findOne({ section });
  if (existingSection) {
    return true;
  }
  return false;
}

export function validateStudentData(studentData) {
  const mobileRegex = /^\d{10}$/;
  const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  const stringFields = [
    "firstname",
    "lastname",
    "mothername",
    "fathername",
    "address",
    "pincode",
    "city",
    "state",
    "country",
  ];

  for (let key of stringFields) {
    if (typeof studentData[key] !== "string") {
      return [false, `${key} is not a string`];
    }
  }


  for (let key of ["mobileNumber", "whatsappNumber"]) {
    if (!mobileRegex.test(studentData[key].toString())) {
      return [false, `${key} is not in correct format`];
    }
  }

  if (!emailRegex.test(studentData["email"])) {
    return [false, `Email is not in correct format`];
  }

  if (isNaN(new Date(studentData["dob"]).getDate())) {
    return [false, `date is not in correct format`];
  }

  
  return [true, "data is correct"];
}
