import mongoose, { Schema } from "mongoose";
import { ITaskModel } from "../../utils/interface";

const TaskSchema: Schema<ITaskModel> = new Schema(
    {
        name: { type: String, required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    },
    { timestamps: true }
)

const TaskModel = mongoose.model<ITaskModel>("Task", TaskSchema)
export default TaskModel