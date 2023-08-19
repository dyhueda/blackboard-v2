import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    groups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Groups",
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Users = mongoose.models.Users || mongoose.model("Users", userSchema);

export default Users;
