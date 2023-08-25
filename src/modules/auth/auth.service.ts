import httpStatus from "http-status"
import ApiError from "../../utils/ApiError"
import AuthModel from "./auth.model"
import { ObjectId } from "mongoose"

/**
 * Register Service using email and password
 * @param {string} email
 * @param {string} password 
 */
export const registerService = async (email: string, password: string) => {
    const isAlreadyRegistered = await AuthModel.findOne({email})
    if(isAlreadyRegistered) throw new ApiError(httpStatus.BAD_REQUEST, "Email already registered")
    return await AuthModel.create({email, password})
}

/**
 * Get user by email
 * @param {string} email
 */
export const getUserByEmailService = async (email: string) => {
    return await AuthModel.findOne({email})
}

/**
 * Get user by id
 * @param {ObjectId} id
 */
export const getUserByIdService = async (id: ObjectId) => {
    return await AuthModel.findById(id)
}