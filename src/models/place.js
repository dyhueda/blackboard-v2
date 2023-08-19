import mongoose from "mongoose";

const placeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tasks",
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Places = mongoose.models.Places || mongoose.model("Places", placeSchema);

export default Places;
