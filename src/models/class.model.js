import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  class: {
    type: Number,
    enum: [6, 7, 8, 9, 10],
    required: true,
  },
});

export const Class = mongoose.model("Class", classSchema);
