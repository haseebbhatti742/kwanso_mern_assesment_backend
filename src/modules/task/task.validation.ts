import Joi from "joi"

export const createTaskValidation = {
    body: Joi.object().keys({
        name: Joi.string().required(),
    })
}