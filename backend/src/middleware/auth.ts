import { NextFunction, Request, Response } from "express";
import { AuthPayload } from "../types/model.js"; 
import jwt from "jsonwebtoken";
import { UnauthorizedResponse, InteralServerErrorResponse } from "../types/response.js";

export interface AuthRequest extends Request {
  user?: AuthPayload;
}

export const auth = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return new UnauthorizedResponse(res, "No authorization header provided");
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return new UnauthorizedResponse(res, "No token provided");
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("JWT_SECRET is not defined in environment variables");
    return new InteralServerErrorResponse(res, "JWT secret is not configured");
  }

  try {
    const payload = jwt.verify(token, secret) as AuthPayload;
    req.user = payload;
    next();
  } catch (error) {
    return new UnauthorizedResponse(res, "Invalid token");
  }
}