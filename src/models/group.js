import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    places: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Places",
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Groups = mongoose.models.Groups || mongoose.model("Groups", groupSchema);

export default Groups;
