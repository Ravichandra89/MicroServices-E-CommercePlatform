import { Response } from "express";

type ApiResponseData = Record<string, unknown> | null; // For the `data` parameter

export const apiResponse = (
  res: Response,
  status: number,
  success: boolean,
  message: string,
  data?: ApiResponseData
): void => {
  res.status(status).json({
    success,
    message,
    ...(data ? { data } : {}),
  });
};
