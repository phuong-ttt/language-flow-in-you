import { Response } from "express";

export class UnauthorizedResponse {
  constructor(public res: Response, public message: string) {
    res.status(401).json({ error: "Unauthorized", message });
  }
}

export class InteralServerErrorResponse {
  constructor(public res: Response, public message: string) {
    res.status(500).json({ error: "Internal Server Error", message });
  }
}