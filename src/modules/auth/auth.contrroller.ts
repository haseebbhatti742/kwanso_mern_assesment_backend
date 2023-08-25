import httpStatus from "http-status";
import ApiError from "../../utils/ApiError";
import catchAsync from "../../utils/catchAsync";
import { getUserByEmailService, getUserByIdService, registerService } from "./auth.service";
import { verifyPassword } from "../../utils/helpers";
import { generateAuthToken } from "../../utils/tokensService";

export const registerController = catchAsync(async (req: any, res: any) => {
    try {
        const {email, password} = req?.body
        const user = await registerService(email, password)
        res.status(200).send({ user: {id: user?._id || user?.id, email: user?.email} })
    } catch(e: any) { throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `${e?.message}`) }
})

export const loginController = catchAsync(async (req: any, res: any) => {
    try {
        const {email, password} = req?.body

        //check if user exists
        const user = await getUserByEmailService(email)
        if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found")

        //check if password is correct
        const isPasswordMatch = verifyPassword(password, user.password);
        if (!isPasswordMatch) throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect Password")

        //generate token
        const jwt = generateAuthToken(user)
        res.status(200).send({ jwt })
    } catch(e: any) { throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `${e?.message}`) }
})

export const getUserController = catchAsync(async (req: any, res: any) => {
    try {
        const {userId} = req?.user
        const user = await getUserByIdService(userId)
        res.status(200).send({ user: {id: user?._id || user?.id, email: user?.email} })
    } catch(e: any) { throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `${e?.message}`) }
})