import mongoose from "mongoose"
import TaskModel from "./task.model"

/**
 * @param {string} name
 */
export const createTaskService = async (name: string) => {
    return await TaskModel.create({name})
}

/**
 * @param {mongoose.Schema.Types.ObjectId} user
 */
export const getAllTasksService = async (user: mongoose.Schema.Types.ObjectId) => {
    return await TaskModel.find({user})
}