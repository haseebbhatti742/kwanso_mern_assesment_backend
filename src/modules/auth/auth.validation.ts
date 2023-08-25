import Joi from "joi"

export const registerValidation = {
    body: Joi.object().keys({
        email: Joi.string().trim().lowercase().email().required(),
        password: Joi.string().required(),
    })
}

export const loginValidation = {
    body: Joi.object().keys({
        email: Joi.string().trim().lowercase().email().required(),
        password: Joi.string().required(),
    })
}