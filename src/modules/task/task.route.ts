import express from "express"
import validate from "../../middlewares/validate"
import { createTaskValidation } from "./task.validation"
import { createTaskController, getAllTasksController } from "./task.controller"
import { authenticateUser } from "../../middlewares/auth"

const router = express.Router()

router.post("/create-task", authenticateUser, validate(createTaskValidation), createTaskController)
router.get("/list-tasks", authenticateUser, getAllTasksController)

export default router