import httpStatus from "http-status";
import ApiError from "../utils/ApiError";
import jwt from "jsonwebtoken";

export const authenticateUser = (req: any, res: any, next: any) => {
    // Get the JWT token from the request header
    // const token = req.header('Authorization');
    const token = req?.headers['authorization']?.replace("Bearer ", "");
  
    // Check if the token exists
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate")
      // return res.status(401).json({ message: 'Please authenticate.' });
    }
  
    try {
      // Verify the token and extract the payload
      const payload = jwt.verify(token, process.env.JWT_SECRET as string);
  
      // Attach the user's payload to the request object
      req.user = payload;
  
      // Continue to the next middleware
      next();
    } catch (error) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid Token.")
      // return res.status(401).json({ message: 'Invalid token.' });
    }
  };