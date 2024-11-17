import { sendEmail } from './emailService';
import { fetchReferenceRate } from './nbpService';
import CreditCalculation from '../models/CreditCalculation';
import { roundToTwo } from '../utils/roundToTwo';
import { CreditParams } from '../types/CreditParams';

export const creditCalculationService = async (params: CreditParams) => {
  const {
    totalInstallments,
    remainingInstallments,
    installmentAmount,
    financingAmount,
    interestRate,
  } = params;

  const { referenceRate, referenceRateId } = await fetchReferenceRate();

  if (interestRate > referenceRate) {
    return {
      message: 'Oprocentowanie jest większe od wartości stopy referencyjnej.',
    };
  }

  const remainingContractValue = remainingInstallments * installmentAmount;

  const newInstallmentAmount = roundToTwo(
    (remainingContractValue * (1 + referenceRate / 100)) / remainingInstallments
  );

  await CreditCalculation.create({
    totalInstallments,
    remainingInstallments,
    installmentAmount,
    financingAmount,
    interestRate,
    remainingContractValue,
    newInstallmentAmount,
    referenceRateId,
  });

  if (newInstallmentAmount <= 0) {
    await sendEmail(
      'Wartość nowej raty',
      'Wartość nowej raty jest mniejsza lub równa zero.'
    );
  }

  return {
    remainingContractValue,
    newInstallmentAmount,
  };
};
