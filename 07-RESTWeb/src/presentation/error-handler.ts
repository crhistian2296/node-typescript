import { type ErrorRequestHandler } from "express";
import { NotFoundError } from "../domain/errors/not-found.error.js";

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  if (error instanceof NotFoundError) {
    return res.status(404).json({ error: error.message });
  }

  console.error(error);
  return res.status(500).json({ error: "Internal server error" });
};
