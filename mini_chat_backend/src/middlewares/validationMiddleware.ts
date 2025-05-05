import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

export const validateRequest = (schema: ObjectSchema, property: 'body' | 'params' | 'query') => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req[property], { abortEarly: false });

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      res.status(400).json({ errors: errorMessages });
      return;
    }
    next();
  };
};
