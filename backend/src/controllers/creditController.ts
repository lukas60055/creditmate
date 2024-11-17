import { Request, Response, NextFunction } from 'express';
import { creditSchema } from '../schemas/creditSchema';
import { creditCalculationService } from '../services/creditService';

export const calculateCredit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error, value } = creditSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        message: 'Błąd walidacji',
        details: error.details.map((err) => err.message),
      });
    }
    const creditData = await creditCalculationService(value);

    res.status(200).json(creditData);
  } catch (error) {
    next(error);
  }
};
