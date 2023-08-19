import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);
const Tasks = mongoose.models.Tasks || mongoose.model("Tasks", taskSchema);

export default Tasks;
