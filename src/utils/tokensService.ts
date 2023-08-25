import jwt from "jsonwebtoken";
import moment from "moment";
import { ObjectId } from "mongoose";

const generateToken = (userId: ObjectId, expires: moment.Moment, type: string, secret = process.env.JWT_SECRET) => {
    const payload = {
      userId,
      iat: moment().unix(),
      exp: expires.unix(),
      type
    };
    return jwt.sign(payload, secret as string);
  };

/**
 * Generate auth tokens
 * @param {any} user
 * @returns {string}
 */
export const generateAuthToken = (user: any) => {
    const accessTokenExpires = moment().add(process.env.TOKEN_EXPIRY_DAY, "days");
    const accessToken = generateToken(user.id || user?._id, accessTokenExpires, "access");
    return accessToken
}