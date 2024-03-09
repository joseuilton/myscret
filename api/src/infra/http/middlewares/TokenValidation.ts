import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default class TokenValidation {
  static async handle(
    request: Request, response: Response, next: NextFunction
  ): Promise<Response | void> {
    const [, token] = request.headers.authorization?.split(" ") || [" ", " "];
    if (!token) return response.status(401).json({ messageError: "Acess denied. No token provided." });

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET!);
      const userIdFromToken = typeof payload !== "string" && payload.userId;

      if (!userIdFromToken) {
        return response.status(401).json({ messageError: "Invalid token." })
      }

      request.headers["user"] = JSON.stringify(payload);
      return next();

    } catch (error) {
      return response.status(401).json({ messageError: "Invalid token." });
    }
  }
}