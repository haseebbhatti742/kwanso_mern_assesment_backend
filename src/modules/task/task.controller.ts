import httpStatus from "http-status";
import ApiError from "../../utils/ApiError";
import catchAsync from "../../utils/catchAsync";
import { createTaskService, getAllTasksService } from "./task.service";
import { ITaskModel } from "../../utils/interface";

export const createTaskController = catchAsync(async (req: any, res: any) => {
    try {
        const {name} = req?.body
        const task = await createTaskService(name)
        res.status(200).send({ task: { id: task?._id || task?.id, name: task?.name } })
    } catch(e: any) { throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `${e?.message}`) }
})

export const getAllTasksController = catchAsync(async (req: any, res: any) => {
    try {
        const {userId} = req?.user
        const results = await getAllTasksService(userId)
        if(!results || !results.length) throw new ApiError(httpStatus.NOT_FOUND, "No Task Yet")
        const tasks = results.map((task: ITaskModel) => {
            return {
                id: task?._id || task?.id,
                name: task?.name
            }
        })
        res.status(200).send({ tasks })
    } catch(e: any) { throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `${e?.message}`) }
})