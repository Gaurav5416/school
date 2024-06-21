import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
  section: {
    type: String,
    enum: ["A", "B", "C"],
    required: true,
  },
});

export const Section = mongoose.model("Section", sectionSchema);

