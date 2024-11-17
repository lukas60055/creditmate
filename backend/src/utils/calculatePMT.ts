export const calculatePMT = (
  principal: number,
  annualRate: number,
  numberOfInstallments: number
) => {
  const monthlyRate = annualRate / 12 / 100;

  if (monthlyRate === 0) {
    return principal / numberOfInstallments;
  }

  return (
    (principal *
      monthlyRate *
      Math.pow(1 + monthlyRate, numberOfInstallments)) /
    (Math.pow(1 + monthlyRate, numberOfInstallments) - 1)
  );
};
