import Joi from 'joi';
import { CreditParams } from '../types/CreditParams';

export const creditSchema = Joi.object<CreditParams>({
  totalInstallments: Joi.number()
    .integer()
    .positive()
    .min(1)
    .required()
    .messages({
      'number.base': 'Liczba rat wszystkich musi być liczbą całkowitą.',
      'number.positive': 'Liczba rat wszystkich musi być dodatnia.',
      'number.min': 'Liczba rat wszystkich musi wynosić przynajmniej 1.',
      'any.required': 'Liczba rat wszystkich jest wymagana.',
    }),
  remainingInstallments: Joi.number()
    .integer()
    .positive()
    .max(Joi.ref('totalInstallments'))
    .required()
    .messages({
      'number.base':
        'Liczba rat pozostałych do spłaty musi być liczbą całkowitą.',
      'number.positive': 'Liczba rat pozostałych do spłaty musi być dodatnia.',
      'number.max':
        'Liczba rat pozostałych do spłaty nie może przekraczać liczby wszystkich rat.',
      'any.required': 'Liczba rat pozostałych do spłaty jest wymagana.',
    }),
  installmentAmount: Joi.number().positive().precision(2).required().messages({
    'number.base': 'Wysokość raty musi być liczbą.',
    'number.positive': 'Wysokość raty musi być większa niż zero.',
    'any.required': 'Wysokość raty jest wymagana.',
  }),
  financingAmount: Joi.number().positive().precision(2).required().messages({
    'number.base': 'Wartość finansowania musi być liczbą.',
    'number.positive': 'Wartość finansowania musi być większa niż zero.',
    'any.required': 'Wartość finansowania jest wymagana.',
  }),
  interestRate: Joi.number().min(0).precision(2).required().messages({
    'number.base': 'Oprocentowanie musi być liczbą.',
    'number.min': 'Oprocentowanie nie może być mniejsze niż 0.',
    'any.required': 'Oprocentowanie jest wymagane.',
  }),
});
