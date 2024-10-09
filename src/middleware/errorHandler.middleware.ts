import { Request, Response } from 'express';
import logger from '../utils/logger';
import { CustomError } from '../utils/CustomError';

export const errorHandler = (err: Error, _req: Request, res: Response) => {
  if (err instanceof CustomError) {
    const logDataObject = Object.create({
      message: err.message,
      data: err.data,
    });
    if (err.statusCode >= 500) {
      logger.error(logDataObject, err);
    } else if (err.statusCode >= 400) {
      logger.warn(logDataObject, err);
    } else {
      logger.info(logDataObject, err);
    }
    res.status(err.statusCode).json({ message: err.message });
  } else {
    logger.error('Unhandled error: %o', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
