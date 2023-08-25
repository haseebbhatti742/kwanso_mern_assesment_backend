import express from "express"
import { getUserController, loginController, registerController } from "./auth.contrroller"
import validate from "../../middlewares/validate"
import { loginValidation, registerValidation } from "./auth.validation"
import { authenticateUser } from "../../middlewares/auth"

const router = express.Router()

router.post("/register", validate(registerValidation), registerController)
router.post("/login", validate(loginValidation), loginController)
router.get("/user", authenticateUser, getUserController)

export default router